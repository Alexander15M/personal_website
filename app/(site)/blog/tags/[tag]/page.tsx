import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PostCard } from '@/components/blog/post-card'
import { toCard } from '@/lib/blog-view'
import { getAllTags, getPostsByTag } from '@/lib/content'

export const revalidate = 3600

type Props = { params: Promise<{ tag: string }> }

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const name = getAllTags().find((t) => t.slug === tag)?.name
  if (!name) return {}
  return { title: `Posts tagged ${name}`, alternates: { canonical: `/blog/tags/${tag}` } }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const info = getAllTags().find((t) => t.slug === tag)
  if (!info) notFound()
  const posts = getPostsByTag(tag)

  return (
    <>
      <div className="page-head">
        <Link href="/blog" className="back-link">
          <ArrowLeft size={14} /> All posts
        </Link>
        <h1>
          <span>#</span>
          {info.name}
        </h1>
        <p className="lead">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>
      <div className="page-body">
        <div className="post-grid">
          {posts.map((p) => (
            <PostCard key={p.slug} post={toCard(p)} />
          ))}
        </div>
      </div>
    </>
  )
}
