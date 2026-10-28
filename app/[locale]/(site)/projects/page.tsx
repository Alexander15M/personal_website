import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WorkSection } from '@/components/site/sections'
import { getAllProjects } from '@/lib/content'
import { isLocale, messages, pageAlternates } from '@/lib/i18n'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = messages[locale].project
  return { title: t.title, description: t.description, alternates: pageAlternates(locale, '/projects') }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <WorkSection projects={getAllProjects()} locale={locale} />
}
