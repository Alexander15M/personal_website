'use client'

import { ViewTransition } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { ProjectIcon } from '@/components/site/project-icon'
import { fadeUp } from '@/components/motion/tokens'

type Props = {
  href: string
  slug: string
  accent: string
  number: string
  icon: string
  title: string
  type: string
  description: string
}

export function ProjectCard({ href, slug, accent, number, icon, title, type, description }: Props) {
  return (
    <motion.div variants={fadeUp} className="project-cell">
      <motion.div whileHover="hover" whileTap={{ scale: 0.985 }} initial="rest" animate="rest" className="project-motion">
        <ViewTransition name={`project-${slug}`} share="morph" default="none">
          <Link href={href} transitionTypes={['nav-forward']} className={`project-card ${accent}`}>
            <div className="project-top">
              <span>{number}</span>
              <motion.span variants={{ rest: { x: 0, y: 0 }, hover: { x: 4, y: -4 } }} className="project-arrow-wrap">
                <ArrowUpRight className="project-arrow" />
              </motion.span>
            </div>
            <motion.div
              className="project-icon"
              variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 8, scale: 1.05 } }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <ProjectIcon name={icon} />
            </motion.div>
            <div className="project-info">
              <p>{type}</p>
              <h3>{title}</h3>
              <span>{description}</span>
            </div>
          </Link>
        </ViewTransition>
      </motion.div>
    </motion.div>
  )
}
