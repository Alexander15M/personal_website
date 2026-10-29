import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALE_HEADER = 'x-locale'
const REWRITE_HEADER = 'x-locale-rewrite'
const LOCALE_COOKIE = 'locale'

function withLocale(request: NextRequest, locale: 'en' | 'es', rewritePath?: string) {
  const headers = new Headers(request.headers)
  headers.set(LOCALE_HEADER, locale)
  headers.set(REWRITE_HEADER, '1')
  if (!rewritePath) return NextResponse.next({ request: { headers } })
  const url = request.nextUrl.clone()
  url.pathname = rewritePath
  return NextResponse.rewrite(url, { request: { headers } })
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const prefixed = pathname.match(/^\/(en|es)(?=\/|$)/)
  const fromPrefix = prefixed?.[1] === 'es' ? 'es' : prefixed ? 'en' : null

  if (fromPrefix && request.headers.get(REWRITE_HEADER) === '1') return withLocale(request, fromPrefix)

  if (fromPrefix) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/(en|es)/, '') || '/'
    const response = NextResponse.redirect(url)
    response.cookies.set(LOCALE_COOKIE, fromPrefix, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
    return response
  }

  const locale = request.cookies.get(LOCALE_COOKIE)?.value === 'es' ? 'es' : 'en'
  const rewritePath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  return withLocale(request, locale, rewritePath)
}

export const config = {
  matcher: ['/((?!_next|api|keystatic|.*\\..*).*)'],
}
