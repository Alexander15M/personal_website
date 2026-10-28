'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { localizeHref, messages, stripLocale, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

export function SiteNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState('')
  const pathname = usePathname()
  const t = messages[locale]

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const sync = () => setHash(window.location.hash)
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const bare = stripLocale(pathname)
  const hrefFor = (target: Locale) => localizeHref(target, `${bare}${hash}`)

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label={t.navLabel}>
        <Link href={localizeHref(locale, '/')} className="brand" aria-label={`${SITE.name} ${t.home}`}>
          {SITE.shortName}
          <span>.</span>
        </Link>
        <div className="nav-links">
          {t.nav.map((l) => (
            <Link key={l.href} href={localizeHref(locale, l.href)}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <LangSwitch locale={locale} hrefFor={hrefFor} label={t.language} />
          <ThemeToggle lightLabel={t.themeLight} darkLabel={t.themeDark} />
          <Link href={localizeHref(locale, '/contact')} className={cn(buttonVariants({ size: 'sm' }), 'nav-cta hidden sm:inline-flex')}>
            {t.talk} <ArrowUpRight data-icon="inline-end" />
          </Link>
          <button
            type="button"
            className="menu-button sm:hidden"
            aria-label={open ? t.closeNav : t.openNav}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="mobile-menu sm:hidden">
          {t.nav.map((l) => (
            <Link key={l.href} href={localizeHref(locale, l.href)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

function LangSwitch({
  locale,
  hrefFor,
  label,
}: {
  locale: Locale
  hrefFor: (target: Locale) => string
  label: string
}) {
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {(['en', 'es'] as const).map((target) => (
        <Link
          key={target}
          href={hrefFor(target)}
          hrefLang={target}
          lang={target}
          aria-current={locale === target ? 'true' : undefined}
        >
          {target.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
