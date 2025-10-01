'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, CreditCard, FileText, TrendingUp, Shield, Clock, Users } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'
import { useLanguage } from '@/contexts/LanguageContext'

const ServicesSlider = () => {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const services = [
    {
      id: 1,
      title: t('servicesSlider.services.expressCredit.title'),
      subtitle: t('servicesSlider.services.expressCredit.subtitle'),
      description: t('servicesSlider.services.expressCredit.description'),
      rate: '13,10-16,50%',
      features: [
        t('servicesSlider.services.expressCredit.features.noIncomeDocuments'),
        t('servicesSlider.services.expressCredit.features.onlineApplication'),
        t('servicesSlider.services.expressCredit.features.fastDecision')
      ],
      icon: Clock,
      color: 'from-primary-500 to-primary-600',
      bgImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: t('servicesSlider.services.rahmetDeposit.title'),
      subtitle: t('servicesSlider.services.rahmetDeposit.subtitle'),
      description: t('servicesSlider.services.rahmetDeposit.description'),
      rate: 'до 17,80% годовых',
      features: [
        t('servicesSlider.services.rahmetDeposit.features.highPercentage'),
        t('servicesSlider.services.rahmetDeposit.features.flexibleConditions'),
        t('servicesSlider.services.rahmetDeposit.features.reliableProtection')
      ],
      icon: TrendingUp,
      color: 'from-accent-500 to-accent-600',
      bgImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: t('servicesSlider.services.businessCredit.title'),
      subtitle: t('servicesSlider.services.businessCredit.subtitle'),
      description: t('servicesSlider.services.businessCredit.description'),
      rate: '12,50-18,90%',
      features: [
        t('servicesSlider.services.businessCredit.features.gracePeriod'),
        t('servicesSlider.services.businessCredit.features.noCollateral'),
        t('servicesSlider.services.businessCredit.features.individualApproach')
      ],
      icon: FileText,
      color: 'from-primary-600 to-accent-500',
      bgImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: t('servicesSlider.services.mortgageCredit.title'),
      subtitle: t('servicesSlider.services.mortgageCredit.subtitle'),
      description: t('servicesSlider.services.mortgageCredit.description'),
      rate: '8,50-12,30%',
      features: [
        t('servicesSlider.services.mortgageCredit.features.lowRate'),
        t('servicesSlider.services.mortgageCredit.features.longTerm'),
        t('servicesSlider.services.mortgageCredit.features.governmentSupport')
      ],
      icon: Shield,
      color: 'from-accent-600 to-primary-700',
      bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 5,
      title: t('servicesSlider.services.autoCredit.title'),
      subtitle: t('servicesSlider.services.autoCredit.subtitle'),
      description: t('servicesSlider.services.autoCredit.description'),
      rate: '9,90-15,70%',
      features: [
        t('servicesSlider.services.autoCredit.features.noDownPayment'),
        t('servicesSlider.services.autoCredit.features.fastProcessing'),
        t('servicesSlider.services.autoCredit.features.freeInsurance')
      ],
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
    <section className="section-padding bg-gradient-to-br from-onyx-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* Декоративный фон */}
      <div className="absolute inset-0 decorative-dots opacity-30"></div>
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('servicesSlider.title')} <span className="text-gradient">{t('servicesSlider.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('servicesSlider.subtitle')}
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
                              children={t('servicesSlider.learnMore')}
                            />
                          </div>
                        </div>

                        {/* Правая часть - изображение */}
                        <div className="hidden lg:flex justify-center items-center">
                          {/* Здесь можно добавить изображение или иллюстрацию */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки навигации */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/50 transition-colors duration-300 z-20 ml-4"
            aria-label={t('servicesSlider.previousSlide')}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/50 transition-colors duration-300 z-20 mr-4"
            aria-label={t('servicesSlider.nextSlide')}
          >
            <ChevronRight size={24} />
          </button>

          {/* Индикаторы слайдов */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`${t('servicesSlider.goToSlide')} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSlider