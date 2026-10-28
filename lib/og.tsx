import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const OG_SIZE = { width: 1200, height: 630 }

export function renderOg(title: string, eyebrow: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#f5f3ee',
          color: '#181816',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 4, textTransform: 'uppercase', color: '#ff593d' }}>
          {eyebrow}
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 60 ? 64 : 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#77766f' }}>
          {SITE.name}
          <span style={{ color: '#ff593d' }}>.</span>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
