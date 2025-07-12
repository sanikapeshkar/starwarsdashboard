'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react' 

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`m-4 flex items-center justify-between w-14 h-8 px-1 rounded-full transition-colors duration-300 ${
        isDark ? 'bg-gray-700' : 'bg-yellow-300'
      }`}
      aria-label="Toggle Theme"
    >
      <Sun className={`w-5 h-5 text-yellow-500 transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      <Moon className={`w-5 h-5 text-white transition-opacity duration-200 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  )
}
