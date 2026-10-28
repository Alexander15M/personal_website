'use client'

import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { messages, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function ContactForm({ locale }: { locale: Locale }) {
  const t = messages[locale].form
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), locale }),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? t.fallback)
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : t.fallback)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label className="field">
        <span>{t.name}</span>
        <input name="name" required maxLength={100} autoComplete="name" />
      </label>
      <label className="field">
        <span>{t.email}</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" />
      </label>
      <label className="field">
        <span>{t.message}</span>
        <textarea name="message" rows={5} required maxLength={5000} />
      </label>
      {/* Honeypot: real users never see or fill this. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
      <button type="submit" disabled={status === 'sending'} className={cn(buttonVariants({ size: 'lg' }), 'cursor-pointer')}>
        {status === 'sending' ? t.sending : t.send}
      </button>
      <p className="form-status" role="status">
        {status === 'sent' && t.sent}
        {status === 'error' && error}
      </p>
    </form>
  )
}
