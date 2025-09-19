import { FileText, CreditCard, TrendingUp, CheckCircle } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'

const ServicesSection = () => {
  const services = [
    {
      icon: FileText,
      title: 'Подготовка заявки для банков',
      description: 'Помогаем правильно оформить все необходимые документы и заявки для максимальных шансов на одобрение.',
      features: [
        'Анализ кредитной истории',
        'Подготовка справок о доходах',
        'Оформление заявки в банк',
        'Сопровождение процесса'
      ]
    },
    {
      icon: CreditCard,
      title: 'Помощь клиентам с плохой кредитной историей',
      description: 'Специализируемся на работе с клиентами, у которых есть проблемы с кредитной историей.',
      features: [
        'Восстановление кредитной истории',
        'Поиск банков с мягкими условиями',
        'Реструктуризация долгов',
        'Консультации по улучшению КИ'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Консультации по повышению шансов на одобрение',
      description: 'Даём профессиональные советы по улучшению финансового положения и увеличению вероятности одобрения.',
      features: [
        'Анализ финансового состояния',
        'Рекомендации по улучшению КИ',
        'Выбор оптимальных условий',
        'Стратегия подачи заявок'
      ]
    }
  ]

  return (
    <section id="services" className="section-padding luxury-gradient decorative-grid">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полный спектр услуг для решения ваших финансовых вопросов. 
            Мы работаем с любыми ситуациями и находим оптимальные решения.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card-medium glow-medium group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={32} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Как мы работаем?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Консультация</h4>
                <p className="text-sm text-gray-600">Анализируем вашу ситуацию</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Подготовка</h4>
                <p className="text-sm text-gray-600">Собираем необходимые документы</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Подача</h4>
                <p className="text-sm text-gray-600">Подаём заявку в банк</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  4
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Результат</h4>
                <p className="text-sm text-gray-600">Получаем одобрение</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Призыв к действию */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Нужна помощь с получением кредита?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Выберите подходящую услугу или оставьте заявку для бесплатной консультации. 
            Наши эксперты помогут найти лучшее решение для вашей ситуации.
          </p>
          <ApplicationFormButton />
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
