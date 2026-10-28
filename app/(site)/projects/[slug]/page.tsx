import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Mdx } from '@/components/mdx'
import { getAllProjects, getProject } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { type: 'website', title: project.title, description: project.description, url: `/projects/${slug}` },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      <div className="page-head">
        <Link href="/#work" className="back-link">
          <ArrowLeft size={14} /> All projects
        </Link>
        <h1>{project.title}</h1>
        <p className="lead">{project.description}</p>
        <div className={`project-hero ${project.accent}`}>
          <div className="meta-row" style={{ marginTop: 0, color: 'rgba(255,255,255,.8)' }}>
            <span>{project.type}</span>
            <span>Status: {project.status}</span>
          </div>
          {project.technologies.length > 0 && (
            <div className="chip-row" style={{ marginTop: '1.2rem' }}>
              {project.technologies.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          )}
          {(project.demo || project.github) && (
            <div className="project-links">
              {project.demo && (
                <a href={project.demo} className="text-link" style={{ color: 'white' }} target="_blank" rel="noreferrer">
                  Visit site <ArrowUpRight size={14} />
                </a>
              )}
              {project.github && (
                <a href={project.github} className="text-link" style={{ color: 'white' }} target="_blank" rel="noreferrer">
                  Source <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="page-body">
        <Mdx source={project.content} />
      </div>
    </>
  )
}
