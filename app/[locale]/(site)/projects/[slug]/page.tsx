import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Mdx } from '@/components/mdx'
import { getAllProjects, getProject } from '@/lib/content'
import { isLocale, localizeHref, messages, pageAlternates } from '@/lib/i18n'
import { localizeProject } from '@/lib/localize'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const project = getProject(slug)
  if (!project) return {}
  const copy = localizeProject(project, locale)
  const path = `/projects/${slug}`
  return {
    title: project.title,
    description: copy.description,
    alternates: pageAlternates(locale, path),
    openGraph: { type: 'website', title: project.title, description: copy.description, url: localizeHref(locale, path) },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const project = getProject(slug)
  if (!project) notFound()
  const copy = localizeProject(project, locale)
  const t = messages[locale].project

  return (
    <>
      <div className="page-head">
        <Link href={localizeHref(locale, '/#work')} className="back-link">
          <ArrowLeft size={14} /> {t.all}
        </Link>
        <h1>{project.title}</h1>
        <p className="lead">{copy.description}</p>
        <div className={`project-hero ${project.accent}`}>
          <div className="meta-row" style={{ marginTop: 0, color: 'rgba(255,255,255,.8)' }}>
            <span>{copy.type}</span>
            <span>
              {t.status}: {copy.status}
            </span>
          </div>
          {project.technologies.length > 0 && (
            <div className="chip-row" style={{ marginTop: '1.2rem' }}>
              {project.technologies.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          )}
          {(project.demo || project.github) && (
            <div className="project-links">
              {project.demo && (
                <a href={project.demo} className="text-link" style={{ color: 'white' }} target="_blank" rel="noreferrer">
                  {t.visit} <ArrowUpRight size={14} />
                </a>
              )}
              {project.github && (
                <a href={project.github} className="text-link" style={{ color: 'white' }} target="_blank" rel="noreferrer">
                  {t.source} <ArrowUpRight size={14} />
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
