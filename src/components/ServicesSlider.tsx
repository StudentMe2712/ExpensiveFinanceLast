'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, CreditCard, FileText, TrendingUp, Shield, Clock, Users } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'

const ServicesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const services = [
    {
      id: 1,
      title: 'Экспресс кредит',
      subtitle: 'Быстрое одобрение за 24 часа',
      description: 'Получите кредит в кратчайшие сроки с минимальным пакетом документов',
      rate: '13,10-16,50%',
      features: ['Без справок о доходах', 'Онлайн заявка', 'Быстрое решение'],
      icon: Clock,
      color: 'from-primary-500 to-primary-600',
      bgImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: 'Рахмет депозит',
      subtitle: 'Арзан қызыққа алдандай, көбірек ақша жинаңыз',
      description: 'Выгодные условия размещения депозита с высокой процентной ставкой',
      rate: 'до 17,80% годовых',
      features: ['Высокий процент', 'Гибкие условия', 'Надежная защита'],
      icon: TrendingUp,
      color: 'from-accent-500 to-accent-600',
      bgImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'Кредит для бизнеса',
      subtitle: 'Развивайте свое дело с нами',
      description: 'Специальные условия кредитования для предпринимателей и малого бизнеса',
      rate: '12,50-18,90%',
      features: ['Льготный период', 'Без залога', 'Индивидуальный подход'],
      icon: FileText,
      color: 'from-primary-600 to-accent-500',
      bgImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: 'Ипотечный кредит',
      subtitle: 'Купите жилье мечты сегодня',
      description: 'Выгодные условия ипотечного кредитования на приобретение недвижимости',
      rate: '8,50-12,30%',
      features: ['Низкая ставка', 'Долгосрочный период', 'Гос. поддержка'],
      icon: Shield,
      color: 'from-accent-600 to-primary-700',
      bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 5,
      title: 'Автокредит',
      subtitle: 'Новый автомобиль уже завтра',
      description: 'Специальные условия кредитования на покупку автомобиля',
      rate: '9,90-15,70%',
      features: ['Без первоначального взноса', 'Быстрое оформление', 'Страховка в подарок'],
      icon: CreditCard,
      color: 'from-primary-700 to-accent-400',
      bgImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  // Автоматическое переключение слайдов
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-gradient-to-br from-onyx-50 to-white relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 decorative-dots opacity-30"></div>
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Популярные <span className="text-gradient">услуги</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите подходящий продукт для решения ваших финансовых задач
          </p>
        </div>

        {/* Слайдер */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service) => (
                <div key={service.id} className="min-w-full">
                  <div className="mx-4">
                    <div className={`bg-gradient-to-br ${service.color} rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm`}>
                      {/* Фоновое изображение */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${service.bgImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50" />
                      
                      {/* Декоративные элементы */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                        <service.icon size={128} />
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                        {/* Левая часть - контент */}
                        <div className="space-y-6">
                          <div>
                            <div className="text-sm opacity-80 mb-2">{service.rate}</div>
                            <h3 className="text-3xl lg:text-4xl font-bold mb-2">
                              {service.title}
                            </h3>
                            <p className="text-lg opacity-90 mb-4">
                              {service.subtitle}
                            </p>
                            <p className="text-base opacity-80">
                              {service.description}
                            </p>
                          </div>

                          {/* Особенности */}
                          <div className="space-y-2">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                                <span className="text-sm opacity-90">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Кнопка действия */}
                          <div className="pt-4">
                            <ApplicationFormButton 
                              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                              children="Подробнее"
                            />
                          </div>
                        </div>

                        {/* Правая часть - иконка и декор */}
                        <div className="flex justify-center lg:justify-end">
                          <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <service.icon size={64} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Навигационные кнопки */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Индикаторы */}
          <div className="flex justify-center space-x-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSlider
