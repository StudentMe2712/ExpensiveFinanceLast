'use client'

import { MessageCircle, Bot } from 'lucide-react'
import { useState, useEffect } from 'react'

interface TelegramBotButtonProps {
  botUsername?: string
  className?: string
}

const TelegramBotButton = ({ 
  botUsername = 'ExpensiveFinanceBot',
  className = ''
}: TelegramBotButtonProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // Показываем через 5 секунд

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    const telegramUrl = `https://t.me/${botUsername}`
    window.open(telegramUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Наш умный бот ответит на ваши вопросы!"
      >
        <div className="relative">
          <Bot size={24} className="group-hover:animate-pulse" />
          <MessageCircle size={16} className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 animate-bounce" />
        </div>
        
        {/* Пульсирующее кольцо */}
        <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></div>
        
        {/* Tooltip */}
        <div className={`absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg transition-opacity duration-200 whitespace-nowrap ${showTooltip ? 'opacity-100' : 'opacity-0'}`}>
          <div className="font-semibold">🤖 Наш Telegram бот</div>
          <div className="text-xs text-gray-300">Задайте вопрос и получите ответ!</div>
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  )
}

export default TelegramBotButton
