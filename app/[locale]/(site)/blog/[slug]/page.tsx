import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PostCard } from '@/components/blog/post-card'
import { Mdx } from '@/components/mdx'
import { toCard } from '@/lib/blog-view'
import { formatDate, getAllPosts, getHeadings, getPost, getRelatedPosts, tagSlug } from '@/lib/content'
import { isLocale, localizeHref, messages, pageAlternates, tagLabel } from '@/lib/i18n'
import { localizePost } from '@/lib/localize'
import { SITE } from '@/lib/site'

export const revalidate = 3600

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = getPost(slug)
  if (!post) return {}
  const localized = localizePost(post, locale)
  const path = `/blog/${slug}`
  return {
    title: localized.title,
    description: localized.description,
    authors: [{ name: post.author }],
    keywords: post.tags.map((tag) => tagLabel(locale, tag)),
    alternates: pageAlternates(locale, path),
    openGraph: {
      type: 'article',
      title: localized.title,
      description: localized.description,
      url: localizeHref(locale, path),
      publishedTime: post.pubDate.toISOString(),
      modifiedTime: (post.updatedDate ?? post.pubDate).toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: localized.title, description: localized.description },
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const source = getPost(slug)
  if (!source) notFound()
  const post = localizePost(source, locale)
  const t = messages[locale].blog

  const headings = getHeadings(post.content)
  const related = getRelatedPosts(source)
  const path = localizeHref(locale, `/blog/${slug}`)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    inLanguage: locale,
    datePublished: post.pubDate.toISOString(),
    dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
    author: { '@type': 'Person', name: post.author, url: SITE.url },
    mainEntityOfPage: `${SITE.url}${path}`,
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="page-head">
        <Link href={localizeHref(locale, '/blog')} className="back-link">
          <ArrowLeft size={14} /> {t.allPosts}
        </Link>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>{post.title}</h1>
        <p className="lead">{post.description}</p>
        <div className="meta-row">
          <span>{post.author}</span>
          <time dateTime={post.pubDate.toISOString()}>{formatDate(post.pubDate, locale)}</time>
          {post.updatedDate && (
            <span>
              {t.updated} {formatDate(post.updatedDate, locale)}
            </span>
          )}
          <span>
            {post.readingMinutes} {t.minRead}
          </span>
          {(post.draft || post.pubDate.getTime() > Date.now()) && <span className="draft-badge">{t.draftPreview}</span>}
        </div>
        {source.tags.length > 0 && (
          <div className="chip-row" style={{ marginTop: '1.2rem' }}>
            {source.tags.map((tag) => (
              <Link key={tag} href={localizeHref(locale, `/blog/tags/${tagSlug(tag)}`)} className="chip">
                {tagLabel(locale, tag)}
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
          <aside className="toc" aria-label={t.toc}>
            <p className="eyebrow">{t.onThisPage}</p>
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
          <h2>{t.related}</h2>
          <div className="post-grid">
            {related.map((p) => (
              <PostCard key={p.slug} post={toCard(p, locale)} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
