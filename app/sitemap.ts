import type { MetadataRoute } from 'next'
import { getAllPosts, getAllProjects, getAllTags } from '@/lib/content'
import { localizeHref, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (locale: Locale, path: string) => `${SITE.url}${localizeHref(locale, path)}`
  const entry = (path: string, extra: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>): MetadataRoute.Sitemap =>
    (['en', 'es'] as const).map((locale) => ({
      url: abs(locale, path),
      ...extra,
      alternates: { languages: { en: abs('en', path), es: abs('es', path) } },
    }))

  return [
    ...entry('/', { changeFrequency: 'monthly', priority: 1 }),
    ...entry('/blog', { changeFrequency: 'weekly', priority: 0.8 }),
    ...entry('/contact', { changeFrequency: 'yearly', priority: 0.5 }),
    ...getAllProjects().flatMap((p) => entry(`/projects/${p.slug}`, { changeFrequency: 'monthly', priority: 0.7 })),
    ...getAllPosts().flatMap((p) =>
      entry(`/blog/${p.slug}`, { lastModified: p.updatedDate ?? p.pubDate, changeFrequency: 'monthly', priority: 0.7 }),
    ),
    ...getAllTags().flatMap((t) => entry(`/blog/tags/${t.slug}`, { changeFrequency: 'weekly', priority: 0.4 })),
  ]
}
