import type { Metadata } from 'next'
import { BlogExplorer } from '@/components/blog/blog-explorer'
import { toCard } from '@/lib/blog-view'
import { getAllPosts, getAllTags } from '@/lib/content'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing about web development, the projects I build and what I learn along the way.',
  alternates: { canonical: '/blog' },
}

export default function BlogIndex() {
  const posts = getAllPosts()
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">The blog</p>
        <h1>
          Thoughts, <span>occasionally.</span>
        </h1>
        <p className="lead">Writing about web development, the projects I&apos;m building and what I learn along the way.</p>
      </div>
      <div className="page-body">
        <BlogExplorer posts={posts.map(toCard)} tags={getAllTags()} />
      </div>
    </>
  )
}
