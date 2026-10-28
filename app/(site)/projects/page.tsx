import type { Metadata } from 'next'
import { WorkSection } from '@/components/site/sections'
import { getAllProjects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects: software, AI and automation I have helped bring to life.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return <WorkSection projects={getAllProjects()} />
}
