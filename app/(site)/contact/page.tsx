import type { Metadata } from 'next'
import Script from 'next/script'
import { ContactForm } from '@/components/site/contact-form'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send me a message or book a free 30 minute call.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Have a good one in mind?</p>
        <h1>
          Let&apos;s make <span>something good.</span>
        </h1>
        <p className="lead">
          Book a call to talk it through, or just drop a message.
          {SITE.email && (
            <>
              {' '}
              You can also email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </>
          )}
        </p>
      </div>
      <div className="page-body">
        <div className="contact-grid">
          <div className="panel">
            <h2>Send a message</h2>
            <ContactForm />
          </div>
          <div className="panel">
            <h2>Book a free meeting</h2>
            <div className="calendly-inline-widget" data-url={SITE.calendly} style={{ minWidth: 320, height: 700 }} />
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
          </div>
        </div>
      </div>
    </>
  )
}
