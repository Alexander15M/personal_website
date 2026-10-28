import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ProjectIcon } from '@/components/site/project-icon'
import { SITE } from '@/lib/site'
import { shortDate, type PostMeta, type Project } from '@/lib/content'

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-kicker">
        <span /> Open to full-time roles
      </div>
      <h1>
        Making digital things
        <br />
        <em>feel simple.</em>
      </h1>
      <p className="hero-copy">
        I&apos;m Alexander — a software developer and physicist building useful tools, exploring complex systems, and
        staying curious about how things work.
      </p>
      <div className="hero-actions">
        <Link href="/#work" className={buttonVariants({ size: 'lg' })}>
          Explore my work <ArrowUpRight data-icon="inline-end" />
        </Link>
        <Link href="/#about" className="text-link">
          More about me <span>↓</span>
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

export function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="section-block work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>
            A few things I&apos;ve
            <br />
            <span>helped bring to life.</span>
          </h2>
        </div>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} className={`project-card ${project.accent}`} key={project.slug}>
            <div className="project-top">
              <span>{project.number}</span>
              <ArrowUpRight className="project-arrow" />
            </div>
            <div className="project-icon">
              <ProjectIcon name={project.icon} />
            </div>
            <div className="project-info">
              <p>{project.type}</p>
              <h3>{project.title}</h3>
              <span>{project.description}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-mark">
        {SITE.shortName}
        <span>.</span>
      </div>
      <div>
        <p className="eyebrow">A little context</p>
        <h2>
          Curious by default.
          <br />
          <span>Precise by choice.</span>
        </h2>
      </div>
      <div className="about-copy">
        <p>
          A physicist turned software engineer with 4+ years building scalable web products with US startups, and a
          growing focus on AI and data science.
        </p>
        <p>Outside of work you&apos;ll find me reading, chasing new ideas, or dancing salsa.</p>
        <Link href="/contact" className="text-link">
          Get to know me <ArrowUpRight data-icon="inline-end" />
        </Link>
      </div>
    </section>
  )
}

export function NotesSection({ posts }: { posts: PostMeta[] }) {
  return (
    <section id="notes" className="section-block notes-section">
      <div className="section-heading notes-heading">
        <div>
          <p className="eyebrow">From the blog</p>
          <h2>Thoughts, occasionally.</h2>
        </div>
        <Link href="/blog" className="text-link">
          View all <ArrowUpRight data-icon="inline-end" />
        </Link>
      </div>
      <div className="notes-list">
        {posts.length === 0 && <p className="empty-note">Nothing published yet.</p>}
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} className="note-row" key={post.slug}>
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

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <p className="eyebrow">Have a good one in mind?</p>
      <h2>
        Let&apos;s make
        <br />
        <em>something good.</em>
      </h2>
      <Link className="contact-email" href="/contact">
        Get in touch <ArrowUpRight data-icon="inline-end" />
      </Link>
    </section>
  )
}
