import { ViewTransition } from 'react'

const directional = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' } as const

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  )
}
