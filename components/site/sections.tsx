import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { HeroIntro } from '@/components/site/hero-intro'
import { ProjectCard } from '@/components/site/project-card'
import { AboutMark, NoteItem } from '@/components/site/scroll-bits'
import { Reveal, SplitLines, Stagger } from '@/components/motion/primitives'
import { shortDate, type PostMeta, type Project } from '@/lib/content'
import { localizeHref, messages, type Locale } from '@/lib/i18n'
import { localizeProject } from '@/lib/localize'
import { SITE } from '@/lib/site'

export function Hero({ locale }: { locale: Locale }) {
  const t = messages[locale]
  return (
    <HeroIntro
      kicker={t.hero.kicker}
      line1={t.hero.line1}
      line2={t.hero.line2}
      copy={t.hero.copy}
      work={t.hero.work}
      about={t.hero.about}
      workHref={localizeHref(locale, '/#work')}
      aboutHref={localizeHref(locale, '/#about')}
    />
  )
}

export function WorkSection({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = messages[locale]
  return (
    <section id="work" className="section-block work-section">
      <div className="section-heading">
        <div>
          <Reveal as="p" className="eyebrow">
            {t.work.eyebrow}
          </Reveal>
          <SplitLines>
            {t.work.line1}
            <span>{t.work.line2}</span>
          </SplitLines>
        </div>
      </div>
      <Stagger className="project-grid">
        {projects.map((project) => {
          const copy = localizeProject(project, locale)
          return (
            <ProjectCard
              key={project.slug}
              href={localizeHref(locale, `/projects/${project.slug}`)}
              slug={project.slug}
              accent={project.accent}
              number={project.number}
              icon={project.icon}
              title={project.title}
              type={copy.type}
              description={copy.description}
            />
          )
        })}
      </Stagger>
    </section>
  )
}

export function AboutSection({ locale }: { locale: Locale }) {
  const t = messages[locale]
  return (
    <section id="about" className="about-section">
      <AboutMark>
        {SITE.shortName}
        <span>.</span>
      </AboutMark>
      <div>
        <Reveal as="p" className="eyebrow">
          {t.about.eyebrow}
        </Reveal>
        <SplitLines>
          {t.about.line1}
          <span>{t.about.line2}</span>
        </SplitLines>
      </div>
      <div className="about-copy">
        <Reveal as="p" delay={0.1}>
          {t.about.p1}
        </Reveal>
        <Reveal as="p" delay={0.2}>
          {t.about.p2}
        </Reveal>
        <Reveal delay={0.3}>
          <Link href={localizeHref(locale, '/contact')} className="text-link">
            {t.about.cta} <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Reveal>
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
          <Reveal as="p" className="eyebrow">
            {t.notes.eyebrow}
          </Reveal>
          <SplitLines>{t.notes.title}</SplitLines>
        </div>
        <Reveal>
          <Link href={localizeHref(locale, '/blog')} className="text-link">
            {t.notes.viewAll} <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Reveal>
      </div>
      <Stagger className="notes-list">
        {posts.length === 0 && <p className="empty-note">{t.notes.empty}</p>}
        {posts.map((post) => (
          <NoteItem key={post.slug}>
            <Link href={localizeHref(locale, `/blog/${post.slug}`)} transitionTypes={['nav-forward']} className="note-row">
              <span className="note-date">{shortDate(post.pubDate)}</span>
              <h3>{post.title}</h3>
              <span className="note-tag">{post.tags[0] ?? ''}</span>
              <ArrowUpRight className="note-arrow" />
            </Link>
          </NoteItem>
        ))}
      </Stagger>
    </section>
  )
}

export function ContactSection({ locale }: { locale: Locale }) {
  const t = messages[locale]
  return (
    <section id="contact" className="contact-section">
      <Reveal as="p" className="eyebrow">
        {t.contactBand.eyebrow}
      </Reveal>
      <SplitLines>
        {t.contactBand.line1}
        <em>{t.contactBand.line2}</em>
      </SplitLines>
      <Reveal delay={0.2}>
        <a className="contact-email" href={`mailto:${SITE.email}`}>
          {SITE.email} <ArrowUpRight data-icon="inline-end" />
        </a>
      </Reveal>
      <Reveal delay={0.3}>
        <Link className="contact-secondary" href={localizeHref(locale, '/contact')}>
          {t.contactBand.orForm} <ArrowUpRight size={14} />
        </Link>
      </Reveal>
    </section>
  )
}
