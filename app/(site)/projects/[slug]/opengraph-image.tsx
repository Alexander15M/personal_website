import { getAllProjects, getProject } from '@/lib/content'
import { OG_SIZE, renderOg } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Project'

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  return renderOg(project?.title ?? 'Project', project?.type ?? 'Project')
}
