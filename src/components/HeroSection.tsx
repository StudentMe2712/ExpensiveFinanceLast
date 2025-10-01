'use client'

import Link from 'next/link'
import { Shield, Clock, Users } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'
import { FadeInUp, FadeInLeft, FadeInRight, AnimatedList } from './ui/AnimatedWrapper'
import { useLanguage } from '@/contexts/LanguageContext'

const HeroSection = () => {
  const { t } = useLanguage()

  const stats = [
    { icon: Shield, value: '95%', label: t('hero.stats.successfulApplications') },
    { icon: Clock, value: '24ч', label: t('hero.stats.averageTime') },
    { icon: Users, value: '1000+', label: t('hero.stats.satisfiedClients') },
  ]

  return (
    <section className="relative luxury-gradient decorative-dots floating-elements py-20 lg:py-32">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - текст */}
          <FadeInLeft className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                <span dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ApplicationFormButton />
              <Link href="/about" className="btn-outline glow-subtle inline-flex items-center justify-center">
                {t('hero.learnMore')}
              </Link>
            </div>

            {/* Статистика */}
            <AnimatedList className="grid grid-cols-3 gap-6 pt-8" staggerDelay={150}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon size={24} className="text-primary-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </AnimatedList>
          </FadeInLeft>

          {/* Правая колонка - изображение/иллюстрация */}
          <FadeInRight className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-900 geometric-bg rounded-2xl p-8 shadow-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Shield size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('hero.features.fastApproval')}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('hero.features.fastApprovalDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('hero.features.individualApproach')}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('hero.features.individualApproachDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Clock size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('hero.features.fastTerms')}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('hero.features.fastTermsDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInRight>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
