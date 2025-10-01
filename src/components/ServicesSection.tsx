'use client'

import { FileText, CreditCard, TrendingUp, CheckCircle } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'
import { useLanguage } from '@/contexts/LanguageContext'

const ServicesSection = () => {
  const { t } = useLanguage()
  
  const services = [
    {
      icon: FileText,
      title: t('services.mainServices.applicationPreparation.title'),
      description: t('services.mainServices.applicationPreparation.description'),
      features: [
        t('services.mainServices.applicationPreparation.features.creditHistoryAnalysis'),
        t('services.mainServices.applicationPreparation.features.incomeDocuments'),
        t('services.mainServices.applicationPreparation.features.bankApplication'),
        t('services.mainServices.applicationPreparation.features.processSupport')
      ]
    },
    {
      icon: CreditCard,
      title: t('services.mainServices.badCreditHelp.title'),
      description: t('services.mainServices.badCreditHelp.description'),
      features: [
        t('services.mainServices.badCreditHelp.features.creditHistoryRestoration'),
        t('services.mainServices.badCreditHelp.features.softConditionsBanks'),
        t('services.mainServices.badCreditHelp.features.debtRestructuring'),
        t('services.mainServices.badCreditHelp.features.creditImprovementConsultation')
      ]
    },
    {
      icon: TrendingUp,
      title: t('services.mainServices.approvalConsultation.title'),
      description: t('services.mainServices.approvalConsultation.description'),
      features: [
        t('services.mainServices.approvalConsultation.features.financialAnalysis'),
        t('services.mainServices.approvalConsultation.features.creditImprovementRecommendations'),
        t('services.mainServices.approvalConsultation.features.optimalConditions'),
        t('services.mainServices.approvalConsultation.features.applicationStrategy')
      ]
    }
  ]

  return (
    <section id="services" className="section-padding luxury-gradient decorative-grid transition-colors duration-300">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('services.mainServices.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.mainServices.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-primary-500/20 group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={32} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('services.howWeWork.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('services.howWeWork.step1.title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('services.howWeWork.step1.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('services.howWeWork.step2.title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('services.howWeWork.step2.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('services.howWeWork.step3.title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('services.howWeWork.step3.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  4
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('services.howWeWork.step4.title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('services.howWeWork.step4.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection