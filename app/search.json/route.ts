import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/content'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

function plainText(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Static search index, generated at build time and queried client-side with Fuse.js. */
export function GET() {
  if (!SITE.blog) return NextResponse.json([])
  const index = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags,
    text: plainText(p.content).slice(0, 6000),
  }))
  return NextResponse.json(index)
}
