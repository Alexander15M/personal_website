'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { THEME_KEY } from '@/lib/theme'

export function ThemeToggle({ lightLabel, darkLabel }: { lightLabel: string; darkLabel: string }) {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleTheme() {
    const nextDark = !document.documentElement.classList.contains('dark')
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    window.localStorage.setItem(THEME_KEY, nextDark ? 'dark' : 'light')
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? lightLabel : darkLabel}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark === null ? null : (
          <motion.span
            key={dark ? 'sun' : 'moon'}
            style={{ display: 'grid' }}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {dark ? <Sun /> : <Moon />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
