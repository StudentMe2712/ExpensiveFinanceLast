'use client'

import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Здравствуйте! Я ваш виртуальный помощник. Как дела с получением кредита? Могу ответить на базовые вопросы или соединить с консультантом.',
      isBot: true,
      timestamp: new Date()
    }
  ])

  const quickReplies = [
    'Какие документы нужны?',
    'Сколько стоят услуги?',
    'Можно ли с плохой КИ?',
    'Связаться с консультантом'
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Симуляция ответа бота
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(message),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase()
    
    if (msg.includes('документ')) {
      return 'Для кредита обычно нужны: паспорт, справка о доходах, трудовая книжка. Точный список зависит от банка и типа кредита. Хотите подробную консультацию?'
    }
    
    if (msg.includes('стоим') || msg.includes('цена')) {
      return 'Первичная консультация бесплатна! Оплата только после успешного получения кредита - от 2% до 5% от суммы. Хотите рассчитать точную стоимость?'
    }
    
    if (msg.includes('плохой') || msg.includes('ки') || msg.includes('истори')) {
      return 'Да, мы специализируемся на сложных случаях! Работаем с банками, которые лояльно относятся к проблемной КИ. Успешность 95%. Расскажете о вашей ситуации?'
    }
    
    if (msg.includes('консультант') || msg.includes('человек')) {
      return 'Конечно! Наш консультант перезвонит вам в течение 15 минут. Оставьте номер телефона или нажмите кнопку "Оставить заявку" на сайте.'
    }
    
    return 'Спасибо за вопрос! Для подробной консультации рекомендую связаться с нашим специалистом. Нажмите "Оставить заявку" или позвоните +7 (777) 123-45-67'
  }

  const handleQuickReply = (reply: string) => {
    setMessage(reply)
    handleSendMessage()
  }

  return (
    <>
      {/* Кнопка чатбота */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-110 glow-medium ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Окно чата */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Заголовок чата */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Помощник Expensive Finance</h3>
              <p className="text-sm opacity-90">Онлайн</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-primary-500 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Быстрые ответы */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Быстрые вопросы:</p>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Поле ввода */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Введите сообщение..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatbotButton
