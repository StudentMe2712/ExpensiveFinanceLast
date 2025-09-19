import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
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
              Надёжный партнёр в решении финансовых вопросов. 
              Помогаем получить кредит, даже если банки отказывают.
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
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
                <span className="text-gray-300">Алматы, пр. Аль-Фараби, 123</span>
              </div>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-accent-300 transition-colors duration-200">
                Главная
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-accent-300 transition-colors duration-200">
                О компании
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-accent-300 transition-colors duration-200">
                Услуги
              </Link>
              <Link href="/#contacts" className="block text-gray-300 hover:text-accent-300 transition-colors duration-200">
                Контакты
              </Link>
            </nav>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* Социальные сети */}
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="https://instagram.com/expensive_finance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://t.me/expensive_finance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30"
            >
              <MessageCircle size={20} />
            </a>
            <a 
              href="https://wa.me/77771234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
            >
              <MessageCircle size={20} />
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Expensive Finance. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-accent-300 text-sm transition-colors duration-200">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-accent-300 text-sm transition-colors duration-200">
                Публичная оферта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
