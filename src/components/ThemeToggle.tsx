'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Светлая тема' },
    { value: 'dark' as const, icon: Moon, label: 'Темная тема' }
  ]

  return (
    <div className={cn("flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1", className)}>
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200",
            "hover:bg-gray-200 dark:hover:bg-gray-700",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "dark:focus:ring-offset-gray-900",
            theme === value 
              ? "bg-white dark:bg-gray-700 shadow-sm text-primary-600 dark:text-primary-400" 
              : "text-gray-600 dark:text-gray-400"
          )}
          title={label}
          aria-label={label}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  )
}

// Компактная версия переключателя
export function ThemeToggleCompact({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark'> = ['light', 'dark']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getIcon = () => {
    switch (theme) {
      case 'light': return Sun
      case 'dark': return Moon
      default: return Sun
    }
  }

  const Icon = getIcon()

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "dark:focus:ring-offset-gray-900",
        "text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400",
        className
      )}
      title={`Текущая тема: ${theme === 'light' ? 'Светлая' : 'Темная'}`}
      aria-label="Переключить тему"
    >
      <Icon size={20} />
    </button>
  )
}
