import Link from 'next/link'
import { Mail, Rss } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { SITE } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer>
      <span>
        © {new Date().getFullYear()} {SITE.name}
      </span>
      <div>
        <a href={SITE.github} aria-label="GitHub" target="_blank" rel="noreferrer">
          <GithubIcon />
        </a>
        <a href={SITE.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <LinkedinIcon />
        </a>
        {SITE.email ? (
          <a href={`mailto:${SITE.email}`} aria-label="Email">
            <Mail />
          </a>
        ) : (
          <Link href="/contact" aria-label="Contact">
            <Mail />
          </Link>
        )}
        <a href="/rss.xml" aria-label="RSS feed">
          <Rss />
        </a>
      </div>
      <span>Built with curiosity and intention.</span>
    </footer>
  )
}
