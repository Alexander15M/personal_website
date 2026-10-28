import { Mail, Rss } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { messages, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = messages[locale]
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
        <a href={`mailto:${SITE.email}`} className="footer-email" aria-label={t.footer.email}>
          <Mail />
          <span>{SITE.email}</span>
        </a>
        <a href="/rss.xml" aria-label={t.footer.rss}>
          <Rss />
        </a>
      </div>
      <span>{t.footer.built}</span>
    </footer>
  )
}
