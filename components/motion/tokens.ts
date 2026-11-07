import type { Variants } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1] as const
export const durations = { fast: 0.4, base: 0.7, slow: 0.9 }
export const stagger = 0.07

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: durations.base, ease } },
}

export const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: durations.slow, ease } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
}
