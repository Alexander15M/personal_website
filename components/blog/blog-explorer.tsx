'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { PostCard, type PostCardData } from '@/components/blog/post-card'

type IndexEntry = { slug: string; title: string; description: string; tags: string[]; text: string }
type Tag = { name: string; slug: string; count: number }

export function BlogExplorer({ posts, tags }: { posts: PostCardData[]; tags: Tag[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [fuse, setFuse] = useState<Fuse<IndexEntry> | null>(null)
  const loading = useRef(false)

  // The search index is a static JSON file generated at build time; load it on first use.
  function loadIndex() {
    if (fuse || loading.current) return
    loading.current = true
    fetch('/search.json')
      .then((r) => r.json())
      .then((entries: IndexEntry[]) =>
        setFuse(
          new Fuse(entries, {
            keys: [
              { name: 'title', weight: 3 },
              { name: 'tags', weight: 2 },
              { name: 'description', weight: 2 },
              { name: 'text', weight: 1 },
            ],
            threshold: 0.35,
            ignoreLocation: true,
          }),
        ),
      )
      .catch(() => {
        loading.current = false
      })
  }

  const visible = useMemo(() => {
    let list = posts
    const q = query.trim()
    if (q && fuse) {
      const order = new Map(fuse.search(q).map((r, i) => [r.item.slug, i]))
      list = list.filter((p) => order.has(p.slug)).sort((a, b) => order.get(a.slug)! - order.get(b.slug)!)
    }
    if (activeTag) list = list.filter((p) => p.tagSlugs.includes(activeTag))
    return list
  }, [posts, query, fuse, activeTag])

  return (
    <div>
      <div className="blog-tools">
        <input
          type="search"
          className="search-input"
          placeholder="Search posts…"
          aria-label="Search posts"
          value={query}
          onFocus={loadIndex}
          onChange={(e) => {
            loadIndex()
            setQuery(e.target.value)
          }}
        />
        {tags.length > 0 && (
          <div className="chip-row" role="group" aria-label="Filter by tag">
            <button type="button" className="chip" aria-pressed={activeTag === null} onClick={() => setActiveTag(null)}>
              All
            </button>
            {tags.map((t) => (
              <button
                key={t.slug}
                type="button"
                className="chip"
                aria-pressed={activeTag === t.slug}
                onClick={() => setActiveTag(activeTag === t.slug ? null : t.slug)}
              >
                {t.name} <span aria-hidden="true">{t.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="empty-note" role="status">
          {query && !fuse ? 'Searching…' : 'No posts match.'}
        </p>
      ) : (
        <div className="post-grid">
          {visible.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
      {activeTag && (
        <p className="form-status">
          <Link href={`/blog/tags/${activeTag}`} className="text-link">
            Open tag page
          </Link>
        </p>
      )}
    </div>
  )
}
