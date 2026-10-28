import { SiteFooter } from '@/components/site/footer'
import { SiteNav } from '@/components/site/nav'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portfolio-shell">
      <SiteNav />
      <main id="top">{children}</main>
      <SiteFooter />
    </div>
  )
}
