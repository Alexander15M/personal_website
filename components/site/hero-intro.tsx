'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { SplitLines } from '@/components/motion/primitives'
import { ease, fadeUp, stagger } from '@/components/motion/tokens'

type Props = {
  kicker: string
  line1: string
  line2: string
  copy: string
  work: string
  about: string
  workHref: string
  aboutHref: string
}

export function HeroIntro({ kicker, line1, line2, copy, work, about, workHref, aboutHref }: Props) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 60, damping: 20 })
  const y = useSpring(py, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 24)
      py.set((e.clientY / window.innerHeight - 0.5) * 24)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, px, py])

  return (
    <motion.section
      className="hero-section"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: stagger } } }}
    >
      <motion.div className="hero-kicker" variants={fadeUp}>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.8, 1] }}
          transition={{ duration: 1.1, delay: 0.1, times: [0, 0.3, 0.65, 1] }}
        />{' '}
        {kicker}
      </motion.div>
      <SplitLines as="h1" immediate>
        {line1}
        <em>{line2}</em>
      </SplitLines>
      <motion.p className="hero-copy" variants={fadeUp}>
        {copy}
      </motion.p>
      <motion.div className="hero-actions" variants={fadeUp}>
        <Link href={workHref} className={buttonVariants({ size: 'lg' })}>
          {work} <ArrowUpRight data-icon="inline-end" />
        </Link>
        <Link href={aboutHref} className="text-link">
          {about} <span>↓</span>
        </Link>
      </motion.div>
      <motion.div
        className="hero-orbit-wrap"
        aria-hidden="true"
        style={{ x, y, transformOrigin: '80% 45%' }}
        variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease, delay: 0.3 } } }}
      >
        <div className="hero-orbit">
          <span className="orbit-track">
            <i />
          </span>
          <span className="orbit-track">
            <i className="accent" />
          </span>
          <span className="orbit-track mid">
            <i />
          </span>
        </div>
      </motion.div>
    </motion.section>
  )
}
