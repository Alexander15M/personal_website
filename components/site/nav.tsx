'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Logo } from '@/components/site/logo'
import { cn } from '@/lib/utils'
import { localizeHref, messages, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

export function SiteNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const t = messages[locale]
  const links = SITE.blog ? t.nav : t.nav.filter((l) => l.href !== '/blog')

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function chooseLocale(next: Locale) {
    if (next === locale) return
    document.cookie = `locale=${next}; Path=/; Max-Age=31536000; SameSite=Lax`
    router.refresh()
  }

  return (
    <header className="site-header" style={{ viewTransitionName: 'site-header' }}>
      <nav className="site-nav" aria-label={t.navLabel}>
        <Link href={localizeHref(locale, '/')} className="brand" aria-label={`${SITE.name} ${t.home}`}>
          <Logo className="brand-logo" />
        </Link>
        <div className="nav-links" onMouseLeave={() => setHovered(null)}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={localizeHref(locale, l.href)}
              className="nav-link"
              onMouseEnter={() => setHovered(l.href)}
              onFocus={() => setHovered(l.href)}
              onBlur={() => setHovered(null)}
            >
              {l.label}
              {hovered === l.href && <motion.span layoutId="nav-underline" className="nav-underline" />}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <LangSwitch locale={locale} onChoose={chooseLocale} label={t.language} />
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
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu sm:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { staggerChildren: 0.05, duration: 0.25 } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          >
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <Link href={localizeHref(locale, l.href)} style={{ display: 'block' }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  )
}

function LangSwitch({
  locale,
  onChoose,
  label,
}: {
  locale: Locale
  onChoose: (locale: Locale) => void
  label: string
}) {
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {(['en', 'es'] as const).map((target) => (
        <button key={target} type="button" lang={target} aria-pressed={locale === target} onClick={() => onChoose(target)}>
          {target.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
