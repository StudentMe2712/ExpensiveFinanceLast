'use client'

import { Target, Award, Heart } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'
import { useLanguage } from '@/contexts/LanguageContext'

const AboutSection = () => {
  const { t } = useLanguage()
  
  const advantages = [
    {
      icon: Target,
      title: t('about.advantages.individualApproach.title'),
      description: t('about.advantages.individualApproach.description')
    },
    {
      icon: Award,
      title: t('about.advantages.experiencedSpecialists.title'),
      description: t('about.advantages.experiencedSpecialists.description')
    },
    {
      icon: Heart,
      title: t('about.advantages.highApprovalRate.title'),
      description: t('about.advantages.highApprovalRate.description')
    }
  ]

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900 geometric-bg floating-elements transition-colors duration-300">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                  <advantage.icon size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {advantage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 geometric-bg rounded-2xl p-8 lg:p-12 luxury-border transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {t('about.whyChooseUs.title')}
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('about.whyChooseUs.point1')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('about.whyChooseUs.point2')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('about.whyChooseUs.point3')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('about.whyChooseUs.point4')}</span>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">5+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('about.yearsOfExperience')}</div>
              </div>
            </div>
          </div>
          
          {/* Призыв к действию */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('about.cta.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <ApplicationFormButton />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection