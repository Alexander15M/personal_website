import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PostCard } from '@/components/blog/post-card'
import { Mdx } from '@/components/mdx'
import { toCard } from '@/lib/blog-view'
import { formatDate, getAllPosts, getHeadings, getPost, getRelatedPosts, tagSlug } from '@/lib/content'
import { SITE } from '@/lib/site'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      publishedTime: post.pubDate.toISOString(),
      modifiedTime: (post.updatedDate ?? post.pubDate).toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const headings = getHeadings(post.content)
  const related = getRelatedPosts(post)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate.toISOString(),
    dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
    author: { '@type': 'Person', name: post.author, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${slug}`,
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="page-head">
        <Link href="/blog" className="back-link">
          <ArrowLeft size={14} /> All posts
        </Link>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>{post.title}</h1>
        <p className="lead">{post.description}</p>
        <div className="meta-row">
          <span>{post.author}</span>
          <time dateTime={post.pubDate.toISOString()}>{formatDate(post.pubDate)}</time>
          {post.updatedDate && <span>Updated {formatDate(post.updatedDate)}</span>}
          <span>{post.readingMinutes} min read</span>
          {(post.draft || post.pubDate.getTime() > Date.now()) && <span className="draft-badge">Draft preview</span>}
        </div>
        {post.tags.length > 0 && (
          <div className="chip-row" style={{ marginTop: '1.2rem' }}>
            {post.tags.map((t) => (
              <Link key={t} href={`/blog/tags/${tagSlug(t)}`} className="chip">
                {t}
              </Link>
            ))}
          </div>
        )}
      </div>

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImage} alt="" className="cover-img" />
      )}

      <div className={`article-layout${headings.length < 3 ? ' no-toc' : ''}`}>
        <article>
          <Mdx source={post.content} />
        </article>
        {headings.length >= 3 && (
          <aside className="toc" aria-label="Table of contents">
            <p className="eyebrow">On this page</p>
            <ul>
              {headings.map((h) => (
                <li key={h.id} className={`depth-${h.depth}`}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="related">
          <h2>Related posts</h2>
          <div className="post-grid">
            {related.map((p) => (
              <PostCard key={p.slug} post={toCard(p)} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
