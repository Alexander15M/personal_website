import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AboutSection, ContactSection, Hero, NotesSection, WorkSection } from '@/components/site/sections'
import { getAllPosts, getAllProjects } from '@/lib/content'
import { isLocale, messages, pageAlternates } from '@/lib/i18n'
import { displayTag, localizePost } from '@/lib/localize'

export const revalidate = 3600

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = messages[locale]
  return {
    title: { absolute: t.seo.title },
    description: t.seo.description,
    alternates: pageAlternates(locale, '/'),
    openGraph: { title: t.seo.title, description: t.seo.description, url: pageAlternates(locale, '/').canonical },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const projects = getAllProjects()
  const posts = getAllPosts()
    .slice(0, 3)
    .map((post) => {
      const localized = localizePost(post, locale)
      return { ...localized, tags: post.tags.map((tag) => displayTag(locale, tag)) }
    })

  return (
    <>
      <Hero locale={locale} />
      <WorkSection projects={projects} locale={locale} />
      <AboutSection locale={locale} />
      <NotesSection posts={posts} locale={locale} />
      <ContactSection locale={locale} />
    </>
  )
}
