import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'
import readingTime from 'reading-time'
import { z } from 'zod'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export const ACCENTS = ['violet', 'orange', 'cyan', 'green', 'rose', 'blue'] as const

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Alexander Meneses'),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()).default([]),
  status: z.string().default('Active'),
  demo: z.string().optional(),
  github: z.string().optional(),
  number: z.string(),
  type: z.string(),
  accent: z.enum(ACCENTS).default('violet'),
  icon: z.string().default('sparkles'),
  order: z.coerce.number().default(99),
})

export type PostMeta = z.infer<typeof postSchema> & { slug: string; readingMinutes: number }
export type Post = PostMeta & { content: string }
export type Project = z.infer<typeof projectSchema> & { slug: string; content: string }
export type Heading = { id: string; text: string; depth: 2 | 3 }

function readDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => ({
      slug: f.replace(/\.mdx?$/, ''),
      raw: fs.readFileSync(path.join(full, f), 'utf8'),
    }))
}

export const tagSlug = (tag: string) => new GithubSlugger().slug(tag)

/** Drafts and future-dated posts are only visible in development. */
function isVisible(p: { draft: boolean; pubDate: Date }) {
  if (process.env.NODE_ENV !== 'production') return true
  return !p.draft && p.pubDate.getTime() <= Date.now()
}

export function getAllPosts(): Post[] {
  return readDir('posts')
    .map(({ slug, raw }) => {
      const { data, content } = matter(raw)
      const meta = postSchema.parse(data)
      return { ...meta, slug, content, readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)) }
    })
    .filter(isVisible)
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getAllTags() {
  const counts = new Map<string, { name: string; slug: string; count: number }>()
  for (const post of getAllPosts()) {
    for (const name of post.tags) {
      const slug = tagSlug(name)
      const entry = counts.get(slug) ?? { name, slug, count: 0 }
      entry.count++
      counts.set(slug, entry)
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function getPostsByTag(slug: string) {
  return getAllPosts().filter((p) => p.tags.some((t) => tagSlug(t) === slug))
}

export function getRelatedPosts(post: Post, limit = 3) {
  const mine = new Set(post.tags.map(tagSlug))
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => mine.has(tagSlug(t))).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.pubDate.getTime() - a.p.pubDate.getTime())
    .slice(0, limit)
    .map((x) => x.p)
}

/** Headings for the table of contents. Ids match rehype-slug (github-slugger). */
export function getHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger()
  const headings: Heading[] = []
  let inFence = false
  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    if (inFence) continue
    const m = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!m) continue
    const text = m[2].replace(/[`*_]|\[([^\]]+)\]\([^)]+\)/g, '$1')
    const id = slugger.slug(text)
    if (m[1].length > 1) headings.push({ id, text, depth: m[1].length as 2 | 3 })
  }
  return headings
}

export function getAllProjects(): Project[] {
  return readDir('projects')
    .map(({ slug, raw }) => {
      const { data, content } = matter(raw)
      return { ...projectSchema.parse(data), slug, content }
    })
    .sort((a, b) => a.order - b.order)
}

export function getProject(slug: string) {
  return getAllProjects().find((p) => p.slug === slug)
}

export const formatDate = (d: Date, locale: 'en' | 'es' = 'en') =>
  d.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })

export const shortDate = (d: Date) =>
  `${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCFullYear()).slice(2)}`
