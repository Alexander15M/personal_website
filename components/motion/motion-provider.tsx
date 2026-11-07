'use client'

import { MotionConfig } from 'motion/react'
import { durations, ease } from './tokens'

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: durations.base, ease }}>
      {children}
    </MotionConfig>
  )
}
