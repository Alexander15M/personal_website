import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALE_HEADER = 'x-locale'
const REWRITE_HEADER = 'x-locale-rewrite'

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

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    if (request.headers.get(REWRITE_HEADER) === '1') return withLocale(request, 'en')
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/en/, '') || '/'
    return NextResponse.redirect(url)
  }

  if (pathname === '/es' || pathname.startsWith('/es/')) return withLocale(request, 'es')

  const rewritePath = pathname === '/' ? '/en' : `/en${pathname}`
  return withLocale(request, 'en', rewritePath)
}

export const config = {
  matcher: ['/((?!_next|api|keystatic|.*\\..*).*)'],
}
