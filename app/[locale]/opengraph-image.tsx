import { OG_SIZE, renderOg } from '@/lib/og'
import { isLocale, messages } from '@/lib/i18n'

export const alt = 'Alexander Meneses'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const copy = isLocale(locale) ? messages[locale].seo : messages.en.seo
  return renderOg(copy.ogTitle, copy.ogEyebrow)
}
