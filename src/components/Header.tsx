'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'
import { ThemeToggleCompact } from './ThemeToggle'
import { LanguageSwitcherCompact } from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import AuthButton from './AuthButton'
import UserMenu from './UserMenu'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { user } = useAuth()

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.services'), href: '/services' },
  ]

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">EF</span>
            </div>
            <span className="text-2xl font-bold text-gradient">Expensive Finance</span>
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA кнопка и переключатели */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcherCompact />
            <ThemeToggleCompact />
            <ApplicationFormButton />
            {user ? <UserMenu /> : <AuthButton />}
          </div>

          {/* Мобильное меню */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LanguageSwitcherCompact />
                  <ThemeToggleCompact />
                </div>
                <div className="flex items-center space-x-2">
                  <ApplicationFormButton onClick={() => setIsMenuOpen(false)} />
                  {user ? <UserMenu /> : <AuthButton />}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header