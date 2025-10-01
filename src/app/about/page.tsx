'use client'

import AboutSection from '@/components/AboutSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ApplicationFormButton from '@/components/ApplicationFormButton'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <Header />
      <AboutSection />
      
      {/* Дополнительная информация о компании */}
      <section className="section-padding luxury-gradient">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t('about.history.title')}
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  {t('about.history.text1')}
                </p>
                <p>
                  {t('about.history.text2')}
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t('about.achievements.title')}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">1000+</div>
                  <div className="text-gray-600 dark:text-gray-300">{t('about.achievements.satisfiedClients')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">95%</div>
                  <div className="text-gray-600 dark:text-gray-300">{t('about.achievements.successfulApplications')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">24ч</div>
                  <div className="text-gray-600 dark:text-gray-300">{t('about.achievements.averageTime')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">7 лет</div>
                  <div className="text-gray-600 dark:text-gray-300">{t('about.achievements.marketPresence')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}