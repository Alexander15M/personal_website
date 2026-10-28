'use client'

import { useEffect } from 'react'
import type { Locale } from '@/lib/i18n'

/** Keeps <html lang> in sync when the language switcher navigates on the client. */
export function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  return null
}
