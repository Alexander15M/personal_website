'use client'

import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ContactForm() {
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
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? 'Something went wrong.')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label className="field">
        <span>Name</span>
        <input name="name" required maxLength={100} autoComplete="name" />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} required maxLength={5000} />
      </label>
      {/* Honeypot: real users never see or fill this. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
      <button type="submit" disabled={status === 'sending'} className={cn(buttonVariants({ size: 'lg' }), 'cursor-pointer')}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p className="form-status" role="status">
        {status === 'sent' && 'Thanks, your message was sent.'}
        {status === 'error' && error}
      </p>
    </form>
  )
}
