import { getAllPosts, getPost } from '@/lib/content'
import { OG_SIZE, renderOg } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Blog post'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  return renderOg(post?.title ?? 'Blog', post?.tags[0] ?? 'Blog')
}
