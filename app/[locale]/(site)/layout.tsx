import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site/footer'
import { LocaleHtmlLang } from '@/components/site/locale-html-lang'
import { SiteNav } from '@/components/site/nav'
import { isLocale } from '@/lib/i18n'

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <div className="portfolio-shell">
      <LocaleHtmlLang locale={locale} />
      <SiteNav locale={locale} />
      <main id="top">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  )
}
