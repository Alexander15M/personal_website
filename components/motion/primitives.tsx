'use client'

import { Children, type ElementType, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { fadeUp, maskUp, staggerContainer } from './tokens'

const viewport = { once: true, margin: '-10% 0px' } as const

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'p' | 'span' | 'section'
}) {
  const Tag = motion[as] as ElementType
  return (
    <Tag className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay }}>
      {children}
    </Tag>
  )
}

export function Stagger({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
}) {
  const Tag = motion[as] as ElementType
  return (
    <Tag className={className} variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </Tag>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

/** Each direct child becomes a masked line that slides up. Lines are separate nodes (no <br/> needed). */
export function SplitLines({
  children,
  className,
  as = 'h2',
  immediate = false,
}: {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2'
  immediate?: boolean
}) {
  const Tag = motion[as] as ElementType
  const lines = Children.toArray(children)
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport }
  return (
    <Tag className={className} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span className="line-inner" variants={maskUp}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
