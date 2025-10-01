'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import SocialLinks from './SocialLinks'
import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Информация о компании */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EF</span>
              </div>
              <span className="text-xl font-bold text-accent-300">Expensive Finance</span>
            </div>
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contacts.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-accent-300" />
                <a 
                  href="tel:+77771234567" 
                  className="text-gray-300 hover:text-accent-300 transition-colors duration-200"
                >
                  +7 (777) 123-45-67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-accent-300" />
                <a 
                  href="mailto:info@expensive-finance.com" 
                  className="text-gray-300 hover:text-accent-300 transition-colors duration-200"
                >
                  info@expensive-finance.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-accent-300" />
                <span className="text-gray-300">{t('footer.contacts.address')}</span>
              </div>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.navigation.title')}</h3>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-accent-300 transition-colors duration-200">
                {t('navigation.home')}
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-accent-300 transition-colors duration-200">
                {t('navigation.about')}
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-accent-300 transition-colors duration-200">
                {t('navigation.services')}
              </Link>
            </nav>

            {/* Кнопка для перехода к клиентскому боту */}
            <div className="mt-6">
              <a
                href="https://t.me/ExpensiveFinanceClientbot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <MessageCircle size={18} />
                <span>{t('footer.botButton.text')}</span>
              </a>
              <p className="text-gray-400 text-xs mt-2">
                {t('footer.botButton.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Expensive Finance. {t('footer.copyright')}
            </div>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer