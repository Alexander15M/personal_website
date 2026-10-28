import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional(), // honeypot
})

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Sends the message through Resend. Configure these environment variables:
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, and optionally CONTACT_FROM_EMAIL
 */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'Please fill in every field with valid values.' }, { status: 400 })
  const { name, email, message, website } = parsed.data
  if (website) return Response.json({ ok: true }) // bot: pretend success

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!key || !to) {
    return Response.json({ error: 'The contact form is not configured yet. Please book a call instead.' }, { status: 503 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      html: `<p><strong>${esc(name)}</strong> (${esc(email)})</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    }),
  })
  if (!res.ok) return Response.json({ error: 'Could not send your message. Please try again later.' }, { status: 502 })
  return Response.json({ ok: true })
}
