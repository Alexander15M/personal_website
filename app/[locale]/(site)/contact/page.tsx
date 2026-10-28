import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { ContactForm } from '@/components/site/contact-form'
import { isLocale, messages, pageAlternates } from '@/lib/i18n'
import { SITE } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = messages[locale].contact
  return {
    title: t.title,
    description: t.description,
    alternates: pageAlternates(locale, '/contact'),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = messages[locale].contact
  const calendly = new URL(SITE.calendly)
  if (locale === 'es') calendly.searchParams.set('locale', 'es')

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>
          {t.titleStart} <span>{t.titleEnd}</span>
        </h1>
        <p className="lead">
          {t.lead} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
      <div className="page-body">
        <div className="contact-grid">
          <div className="panel">
            <h2>{t.formTitle}</h2>
            <ContactForm locale={locale} />
          </div>
          <div className="panel">
            <h2>{t.bookTitle}</h2>
            <div className="calendly-inline-widget" data-url={calendly.toString()} style={{ minWidth: 320, height: 700 }} />
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
          </div>
        </div>
      </div>
    </>
  )
}
