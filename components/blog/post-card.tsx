import Link from 'next/link'
import { localizeHref, messages, type Locale } from '@/lib/i18n'

export type PostCardData = {
  slug: string
  title: string
  description: string
  date: string // preformatted
  tags: string[]
  tagSlugs: string[]
  readingMinutes: number
  draft: boolean
}

export function PostCard({ post, locale }: { post: PostCardData; locale: Locale }) {
  const t = messages[locale].blog
  return (
    <Link href={localizeHref(locale, `/blog/${post.slug}`)} className="post-card">
      <span className="meta">
        {post.draft && <span className="draft-badge">{t.draft} · </span>}
        {post.date} · {post.readingMinutes} {t.minRead}
      </span>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {post.tags.length > 0 && <span className="meta">{post.tags.join(' · ')}</span>}
    </Link>
  )
}
