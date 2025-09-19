'use client'

import Link from 'next/link'
import { Shield, Clock, Users } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'

const HeroSection = () => {
  const stats = [
    { icon: Shield, value: '95%', label: 'Успешных заявок' },
    { icon: Clock, value: '24ч', label: 'Средний срок рассмотрения' },
    { icon: Users, value: '1000+', label: 'Довольных клиентов' },
  ]

  return (
    <section className="relative luxury-gradient decorative-dots floating-elements py-20 lg:py-32">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - текст */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Помогаем получить{' '}
                <span className="text-gradient">кредит</span>,{' '}
                даже если банки отказывают
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Expensive Finance — надёжный партнёр в решении финансовых вопросов. 
                Индивидуальный подход и многолетний опыт работы с банками.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ApplicationFormButton />
              <Link href="/about" className="btn-outline glow-subtle inline-flex items-center justify-center">
                Узнать больше
              </Link>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon size={24} className="text-primary-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка - изображение/иллюстрация */}
          <div className="relative animate-slide-up">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 geometric-bg rounded-2xl p-8 shadow-2xl glow-intense">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Shield size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Быстрое одобрение</h3>
                      <p className="text-sm text-gray-600">Высокие шансы на получение кредита</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Индивидуальный подход</h3>
                      <p className="text-sm text-gray-600">Персональные решения для каждого клиента</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Clock size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Быстрые сроки</h3>
                      <p className="text-sm text-gray-600">Рассмотрение заявки в течение 24 часов</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
