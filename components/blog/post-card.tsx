import Link from 'next/link'

export type PostCardData = {
  slug: string
  title: string
  description: string
  date: string // preformatted
  tags: string[]
  tagSlugs: string[]
  readingMinutes: number
  draft: boolean
}

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <span className="meta">
        {post.draft && <span className="draft-badge">Draft · </span>}
        {post.date} · {post.readingMinutes} min read
      </span>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {post.tags.length > 0 && <span className="meta">{post.tags.join(' · ')}</span>}
    </Link>
  )
}
