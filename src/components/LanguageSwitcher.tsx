'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'ru' as const, name: 'Рус', flag: '🇷🇺' },
    { code: 'kk' as const, name: 'Қаз', flag: '🇰🇿' }
  ]

  return (
    <div className={cn("flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1", className)}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            "flex items-center justify-center w-10 h-8 rounded-md transition-all duration-200",
            "hover:bg-gray-200 dark:hover:bg-gray-700",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "dark:focus:ring-offset-gray-900",
            language === lang.code 
              ? "bg-white dark:bg-gray-700 shadow-sm text-primary-600 dark:text-primary-400" 
              : "text-gray-600 dark:text-gray-400"
          )}
          title={`${lang.flag} ${lang.name}`}
          aria-label={`Переключить на ${lang.name}`}
        >
          <span className="text-sm font-medium">{lang.flag}</span>
        </button>
      ))}
    </div>
  )
}

// Компактная версия переключателя
export function LanguageSwitcherCompact({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const cycleLanguage = () => {
    const languages: Array<'ru' | 'kk'> = ['ru', 'kk']
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    setLanguage(languages[nextIndex])
  }

  const getCurrentLanguage = () => {
    switch (language) {
      case 'ru': return { flag: '🇷🇺', name: 'Рус' }
      case 'kk': return { flag: '🇰🇿', name: 'Қаз' }
      default: return { flag: '🇷🇺', name: 'Рус' }
    }
  }

  const currentLang = getCurrentLanguage()

  return (
    <button
      onClick={cycleLanguage}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "dark:focus:ring-offset-gray-900",
        "text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400",
        className
      )}
      title={`Текущий язык: ${currentLang.name}`}
      aria-label="Переключить язык"
    >
      <span className="text-lg">{currentLang.flag}</span>
    </button>
  )
}
