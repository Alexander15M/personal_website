'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { PostCard, type PostCardData } from '@/components/blog/post-card'
import { localizeHref, messages, type Locale } from '@/lib/i18n'

type IndexEntry = { slug: string; title: string; description: string; tags: string[]; text: string }
type Tag = { name: string; slug: string; count: number }

export function BlogExplorer({ posts, tags, locale }: { posts: PostCardData[]; tags: Tag[]; locale: Locale }) {
  const t = messages[locale].blog
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
    const q = query.trim().toLowerCase()
    if (q) {
      const localHits = new Set(
        posts
          .filter((p) => `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(q))
          .map((p) => p.slug),
      )
      if (fuse) {
        const order = new Map(fuse.search(query.trim()).map((r, i) => [r.item.slug, i]))
        list = list
          .filter((p) => order.has(p.slug) || localHits.has(p.slug))
          .sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999))
      } else {
        list = list.filter((p) => localHits.has(p.slug))
      }
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
          placeholder={t.searchPlaceholder}
          aria-label={t.search}
          value={query}
          onFocus={loadIndex}
          onChange={(e) => {
            loadIndex()
            setQuery(e.target.value)
          }}
        />
        {tags.length > 0 && (
          <div className="chip-row" role="group" aria-label={t.filter}>
            <button type="button" className="chip" aria-pressed={activeTag === null} onClick={() => setActiveTag(null)}>
              {t.all}
            </button>
            {tags.map((tag) => (
              <button
                key={tag.slug}
                type="button"
                className="chip"
                aria-pressed={activeTag === tag.slug}
                onClick={() => setActiveTag(activeTag === tag.slug ? null : tag.slug)}
              >
                {tag.name} <span aria-hidden="true">{tag.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="empty-note" role="status">
          {query && !fuse ? t.searching : t.none}
        </p>
      ) : (
        <div className="post-grid">
          {visible.map((p) => (
            <PostCard key={p.slug} post={p} locale={locale} />
          ))}
        </div>
      )}
      {activeTag && (
        <p className="form-status">
          <Link href={localizeHref(locale, `/blog/tags/${activeTag}`)} className="text-link">
            {t.tagPage}
          </Link>
        </p>
      )}
    </div>
  )
}
