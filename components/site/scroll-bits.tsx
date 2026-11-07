'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ease, fadeUp } from '@/components/motion/tokens'

export function AboutMark({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20])
  return (
    <motion.div ref={ref} className="about-mark" style={{ y }}>
      {children}
    </motion.div>
  )
}

export function NoteItem({ children }: { children: ReactNode }) {
  return (
    <motion.div className="note-item" variants={fadeUp}>
      {children}
      <motion.i
        className="row-line"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease } } }}
      />
    </motion.div>
  )
}
