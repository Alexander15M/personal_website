import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ProjectIcon } from '@/components/site/project-icon'
import { shortDate, type PostMeta, type Project } from '@/lib/content'
import { localizeHref, messages, type Locale } from '@/lib/i18n'
import { localizeProject } from '@/lib/localize'
import { SITE } from '@/lib/site'

export function Hero({ locale }: { locale: Locale }) {
  const t = messages[locale]
  return (
    <section className="hero-section">
      <div className="hero-kicker">
        <span /> {t.hero.kicker}
      </div>
      <h1>
        {t.hero.line1}
        <br />
        <em>{t.hero.line2}</em>
      </h1>
      <p className="hero-copy">{t.hero.copy}</p>
      <div className="hero-actions">
        <Link href={localizeHref(locale, '/#work')} className={buttonVariants({ size: 'lg' })}>
          {t.hero.work} <ArrowUpRight data-icon="inline-end" />
        </Link>
        <Link href={localizeHref(locale, '/#about')} className="text-link">
          {t.hero.about} <span>↓</span>
        </Link>
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <div />
        <div />
        <div />
      </div>
    </section>
  )
}

export function WorkSection({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = messages[locale]
  return (
    <section id="work" className="section-block work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2>
            {t.work.line1}
            <br />
            <span>{t.work.line2}</span>
          </h2>
        </div>
      </div>
      <div className="project-grid">
        {projects.map((project) => {
          const copy = localizeProject(project, locale)
          return (
            <Link href={localizeHref(locale, `/projects/${project.slug}`)} className={`project-card ${project.accent}`} key={project.slug}>
              <div className="project-top">
                <span>{project.number}</span>
                <ArrowUpRight className="project-arrow" />
              </div>
              <div className="project-icon">
                <ProjectIcon name={project.icon} />
              </div>
              <div className="project-info">
                <p>{copy.type}</p>
                <h3>{project.title}</h3>
                <span>{copy.description}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function AboutSection({ locale }: { locale: Locale }) {
  const t = messages[locale]
  return (
    <section id="about" className="about-section">
      <div className="about-mark">
        {SITE.shortName}
        <span>.</span>
      </div>
      <div>
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2>
          {t.about.line1}
          <br />
          <span>{t.about.line2}</span>
        </h2>
      </div>
      <div className="about-copy">
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <Link href={localizeHref(locale, '/contact')} className="text-link">
          {t.about.cta} <ArrowUpRight data-icon="inline-end" />
        </Link>
      </div>
    </section>
  )
}

export function NotesSection({ posts, locale }: { posts: PostMeta[]; locale: Locale }) {
  const t = messages[locale]
  return (
    <section id="notes" className="section-block notes-section">
      <div className="section-heading notes-heading">
        <div>
          <p className="eyebrow">{t.notes.eyebrow}</p>
          <h2>{t.notes.title}</h2>
        </div>
        <Link href={localizeHref(locale, '/blog')} className="text-link">
          {t.notes.viewAll} <ArrowUpRight data-icon="inline-end" />
        </Link>
      </div>
      <div className="notes-list">
        {posts.length === 0 && <p className="empty-note">{t.notes.empty}</p>}
        {posts.map((post) => (
          <Link href={localizeHref(locale, `/blog/${post.slug}`)} className="note-row" key={post.slug}>
            <span className="note-date">{shortDate(post.pubDate)}</span>
            <h3>{post.title}</h3>
            <span className="note-tag">{post.tags[0] ?? ''}</span>
            <ArrowUpRight className="note-arrow" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ContactSection({ locale }: { locale: Locale }) {
  const t = messages[locale]
  return (
    <section id="contact" className="contact-section">
      <p className="eyebrow">{t.contactBand.eyebrow}</p>
      <h2>
        {t.contactBand.line1}
        <br />
        <em>{t.contactBand.line2}</em>
      </h2>
      <a className="contact-email" href={`mailto:${SITE.email}`}>
        {SITE.email} <ArrowUpRight data-icon="inline-end" />
      </a>
      <Link className="contact-secondary" href={localizeHref(locale, '/contact')}>
        {t.contactBand.orForm} <ArrowUpRight size={14} />
      </Link>
    </section>
  )
}
