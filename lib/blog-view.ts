import type { PostCardData } from '@/components/blog/post-card'
import { formatDate, tagSlug, type Post } from '@/lib/content'

export function toCard(p: Post): PostCardData {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: formatDate(p.pubDate),
    tags: p.tags,
    tagSlugs: p.tags.map(tagSlug),
    readingMinutes: p.readingMinutes,
    draft: p.draft || p.pubDate.getTime() > Date.now(),
  }
}
