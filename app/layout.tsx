import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { themeInitScript } from '@/lib/theme'
import { SITE } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s, ${SITE.name}` },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  alternates: SITE.blog ? { types: { 'application/rss+xml': '/rss.xml' } } : undefined,
  openGraph: { type: 'website', siteName: SITE.name, title: SITE.title, description: SITE.description },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get('x-locale') === 'es' ? 'es' : 'en'
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
