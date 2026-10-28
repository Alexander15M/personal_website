'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

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
      {dark === null ? null : dark ? <Sun /> : <Moon />}
    </button>
  )
}
