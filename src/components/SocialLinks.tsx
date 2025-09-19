'use client'

import { Instagram, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'

const SocialLinks = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/expensive_finance',
      color: 'from-pink-500 to-purple-600',
      shadowColor: 'shadow-pink-500/30',
      description: 'Следите за новостями в Instagram',
      hoverText: 'Instagram'
    },
    {
      name: 'Telegram Bot',
      icon: MessageCircle,
      href: 'https://t.me/ExpensiveFinanceClientbot',
      color: 'from-primary-500 to-primary-600',
      shadowColor: 'shadow-primary-500/30',
      description: 'Наш клиентский бот ответит на ваши вопросы',
      hoverText: 'Telegram Bot'
    },
    {
      name: 'WhatsApp',
      icon: Phone,
      href: 'https://wa.me/77771234567?text=Здравствуйте! Меня интересуют ваши финансовые услуги.',
      color: 'from-green-500 to-green-600',
      shadowColor: 'shadow-green-500/30',
      description: 'Быстрое общение через WhatsApp',
      hoverText: 'WhatsApp'
    }
  ]

  return (
    <div className="flex justify-center space-x-6 mb-6">
      {socialLinks.map((link) => {
        const IconComponent = link.icon
        return (
          <div key={link.name} className="relative group">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-14 h-14 bg-gradient-to-r ${link.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:${link.shadowColor} group-hover:animate-pulse`}
              title={link.description}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <IconComponent size={22} />
            </a>
            
            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10`}>
              {link.description}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SocialLinks
