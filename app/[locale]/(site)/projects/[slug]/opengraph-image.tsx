import { getAllProjects, getProject } from '@/lib/content'
import { isLocale, messages } from '@/lib/i18n'
import { localizeProject } from '@/lib/localize'
import { OG_SIZE, renderOg } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Project'

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const safeLocale = isLocale(locale) ? locale : 'en'
  const project = getProject(slug)
  const copy = project ? localizeProject(project, safeLocale) : undefined
  return renderOg(project?.title ?? messages[safeLocale].project.og, copy?.type ?? messages[safeLocale].project.og)
}
