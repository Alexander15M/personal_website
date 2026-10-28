import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogExplorer } from '@/components/blog/blog-explorer'
import { toCard } from '@/lib/blog-view'
import { getAllPosts, getAllTags } from '@/lib/content'
import { isLocale, messages, pageAlternates, tagLabel } from '@/lib/i18n'

export const revalidate = 3600

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = messages[locale].blog
  return { title: t.title, description: t.description, alternates: pageAlternates(locale, '/blog') }
}

export default async function BlogIndex({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = messages[locale].blog
  const posts = getAllPosts()
  const tags = getAllTags().map((tag) => ({ ...tag, name: tagLabel(locale, tag.name) }))

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>
          {t.titleStart} <span>{t.titleEnd}</span>
        </h1>
        <p className="lead">{t.lead}</p>
      </div>
      <div className="page-body">
        <BlogExplorer posts={posts.map((post) => toCard(post, locale))} tags={tags} locale={locale} />
      </div>
    </>
  )
}
