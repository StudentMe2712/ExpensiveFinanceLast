'use client'

import ServicesSection from '@/components/ServicesSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ApplicationFormButton from '@/components/ApplicationFormButton'
import { FileText, CreditCard, TrendingUp, CheckCircle, Phone, Clock, Shield, Award } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ServicesPage() {
  const { t } = useLanguage()

  const additionalServices = [
    {
      icon: Phone,
      title: t('services.additionalServices.phoneConsultation.title'),
      description: t('services.additionalServices.phoneConsultation.description'),
      price: t('services.additionalServices.phoneConsultation.price')
    },
    {
      icon: Clock,
      title: t('services.additionalServices.expressAnalysis.title'),
      description: t('services.additionalServices.expressAnalysis.description'),
      price: t('services.additionalServices.expressAnalysis.price')
    },
    {
      icon: Shield,
      title: t('services.additionalServices.insurance.title'),
      description: t('services.additionalServices.insurance.description'),
      price: t('services.additionalServices.insurance.price')
    },
    {
      icon: Award,
      title: t('services.additionalServices.vipSupport.title'),
      description: t('services.additionalServices.vipSupport.description'),
      price: t('services.additionalServices.vipSupport.price')
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: t('services.process.steps.initialConsultation.title'),
      description: t('services.process.steps.initialConsultation.description'),
      duration: t('services.process.steps.initialConsultation.duration')
    },
    {
      step: 2,
      title: t('services.process.steps.documentPreparation.title'),
      description: t('services.process.steps.documentPreparation.description'),
      duration: t('services.process.steps.documentPreparation.duration')
    },
    {
      step: 3,
      title: t('services.process.steps.applicationSubmission.title'),
      description: t('services.process.steps.applicationSubmission.description'),
      duration: t('services.process.steps.applicationSubmission.duration')
    },
    {
      step: 4,
      title: t('services.process.steps.processSupport.title'),
      description: t('services.process.steps.processSupport.description'),
      duration: t('services.process.steps.processSupport.duration')
    },
    {
      step: 5,
      title: t('services.process.steps.approval.title'),
      description: t('services.process.steps.approval.description'),
      duration: t('services.process.steps.approval.duration')
    }
  ]

  const faqData = [
    {
      question: t('services.faq.questions.pricing.question'),
      answer: t('services.faq.questions.pricing.answer')
    },
    {
      question: t('services.faq.questions.documents.question'),
      answer: t('services.faq.questions.documents.answer')
    },
    {
      question: t('services.faq.questions.badCredit.question'),
      answer: t('services.faq.questions.badCredit.answer')
    },
    {
      question: t('services.faq.questions.timing.question'),
      answer: t('services.faq.questions.timing.answer')
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <ServicesSection />

      {/* Дополнительные услуги */}
      <section className="section-padding bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('services.additionalServices.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('services.additionalServices.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <service.icon size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {service.description}
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-bold">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс работы */}
      <section className="section-padding luxury-gradient">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('services.process.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('services.process.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                    <div className="text-primary-600 dark:text-primary-400 font-medium ml-4">
                      {step.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Часто задаваемые вопросы */}
      <section className="section-padding bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('services.faq.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          {/* Призыв к действию */}
          <div className="text-center mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto transition-colors duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {t('services.faq.cta.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('services.faq.cta.subtitle')}
              </p>
              <ApplicationFormButton />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}