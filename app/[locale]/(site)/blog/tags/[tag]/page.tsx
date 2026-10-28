import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PostCard } from '@/components/blog/post-card'
import { toCard } from '@/lib/blog-view'
import { getAllTags, getPostsByTag } from '@/lib/content'
import { isLocale, localizeHref, messages, pageAlternates, tagLabel } from '@/lib/i18n'

export const revalidate = 3600

type Props = { params: Promise<{ locale: string; tag: string }> }

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params
  if (!isLocale(locale)) return {}
  const info = getAllTags().find((t) => t.slug === tag)
  if (!info) return {}
  const name = tagLabel(locale, info.name)
  return {
    title: messages[locale].blog.tagged.replace('{tag}', name),
    alternates: pageAlternates(locale, `/blog/tags/${tag}`),
  }
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params
  if (!isLocale(locale)) notFound()
  const info = getAllTags().find((t) => t.slug === tag)
  if (!info) notFound()
  const posts = getPostsByTag(tag)
  const t = messages[locale].blog
  const name = tagLabel(locale, info.name)

  return (
    <>
      <div className="page-head">
        <Link href={localizeHref(locale, '/blog')} className="back-link">
          <ArrowLeft size={14} /> {t.allPosts}
        </Link>
        <h1>
          <span>#</span>
          {name}
        </h1>
        <p className="lead">
          {posts.length} {posts.length === 1 ? t.post : t.posts}
        </p>
      </div>
      <div className="page-body">
        <div className="post-grid">
          {posts.map((p) => (
            <PostCard key={p.slug} post={toCard(p, locale)} locale={locale} />
          ))}
        </div>
      </div>
    </>
  )
}
