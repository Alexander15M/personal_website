import type { MetadataRoute } from 'next'
import { getAllPosts, getAllProjects, getAllTags } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`
  return [
    { url: url('/'), changeFrequency: 'monthly', priority: 1 },
    { url: url('/blog'), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/contact'), changeFrequency: 'yearly', priority: 0.5 },
    ...getAllProjects().map((p) => ({ url: url(`/projects/${p.slug}`), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...getAllPosts().map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: p.updatedDate ?? p.pubDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getAllTags().map((t) => ({ url: url(`/blog/tags/${t.slug}`), changeFrequency: 'weekly' as const, priority: 0.4 })),
  ]
}
