import type { PostCardData } from '@/components/blog/post-card'
import { formatDate, tagSlug, type Post } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { displayTag, localizePost } from '@/lib/localize'

export function toCard(p: Post, locale: Locale = 'en'): PostCardData {
  const post = localizePost(p, locale)
  return {
    slug: p.slug,
    title: post.title,
    description: post.description,
    date: formatDate(p.pubDate, locale),
    tags: p.tags.map((tag) => displayTag(locale, tag)),
    tagSlugs: p.tags.map(tagSlug),
    readingMinutes: p.readingMinutes,
    draft: p.draft || p.pubDate.getTime() > Date.now(),
  }
}
