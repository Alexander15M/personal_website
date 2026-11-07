import { getAllPosts, getPost } from '@/lib/content'
import { isLocale, messages, tagLabel } from '@/lib/i18n'
import { localizePost } from '@/lib/localize'
import { OG_SIZE, renderOg } from '@/lib/og'
import { SITE } from '@/lib/site'
import { notFound } from 'next/navigation'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Blog post'

export function generateStaticParams() {
  if (!SITE.blog) return []
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!SITE.blog) notFound()
  const safeLocale = isLocale(locale) ? locale : 'en'
  const post = getPost(slug)
  const localized = post ? localizePost(post, safeLocale) : undefined
  return renderOg(localized?.title ?? messages[safeLocale].blog.title, post ? tagLabel(safeLocale, post.tags[0] ?? 'Blog') : 'Blog')
}
