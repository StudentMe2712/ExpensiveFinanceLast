import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

const ContactsSection = () => {
  const contacts = [
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 (777) 123-45-67',
      href: 'tel:+77771234567',
      description: 'Звоните в любое время с 9:00 до 21:00'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@expensive-finance.com',
      href: 'mailto:info@expensive-finance.com',
      description: 'Пишите нам, ответим в течение часа'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+7 (777) 123-45-67',
      href: 'https://wa.me/77771234567',
      description: 'Быстрое общение через WhatsApp'
    },
    {
      icon: MessageCircle,
      title: 'Telegram',
      value: '@expensive_finance',
      href: 'https://t.me/expensive_finance',
      description: 'Связь через Telegram'
    }
  ]

  return (
    <section id="contacts" className="section-padding luxury-gradient decorative-waves">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Контакты
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Свяжитесь с нами любым удобным способом. 
            Мы всегда готовы помочь и ответить на ваши вопросы.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              className="card-subtle glow-subtle text-center group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <contact.icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {contact.title}
              </h3>
              <p className="text-primary-600 font-medium mb-2">
                {contact.value}
              </p>
              <p className="text-sm text-gray-600">
                {contact.description}
              </p>
            </a>
          ))}
        </div>

        {/* Карта и дополнительная информация */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Карта */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Наш офис
            </h3>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
              <div className="text-center text-gray-500">
                <MapPin size={48} className="mx-auto mb-2" />
                <p>Карта будет добавлена позже</p>
                <p className="text-sm">Алматы, пр. Аль-Фараби, 123</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Адрес:</strong> Алматы, пр. Аль-Фараби, 123</p>
              <p><strong>Время работы:</strong> Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-18:00</p>
              <p><strong>Транспорт:</strong> Остановка "Аль-Фараби" (2 мин. пешком)</p>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Почему стоит обратиться к нам?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Бесплатная консультация</h4>
                  <p className="text-sm text-gray-600">Первичная консультация и анализ ситуации абсолютно бесплатны</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Быстрый ответ</h4>
                  <p className="text-sm text-gray-600">Отвечаем на все обращения в течение часа</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Конфиденциальность</h4>
                  <p className="text-sm text-gray-600">Все ваши данные защищены и не передаются третьим лицам</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Опыт работы</h4>
                  <p className="text-sm text-gray-600">Более 5 лет успешной работы с банками</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactsSection
