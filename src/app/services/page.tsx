import ServicesSection from '@/components/ServicesSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ApplicationFormButton from '@/components/ApplicationFormButton'
import { FileText, CreditCard, TrendingUp, CheckCircle, Phone, Clock, Shield, Award } from 'lucide-react'

export default function ServicesPage() {
  const additionalServices = [
    {
      icon: Phone,
      title: 'Консультации по телефону',
      description: 'Бесплатные консультации по всем вопросам кредитования',
      price: 'Бесплатно'
    },
    {
      icon: Clock,
      title: 'Экспресс-анализ кредитной истории',
      description: 'Быстрая оценка ваших шансов на получение кредита',
      price: 'От 5 000 ₸'
    },
    {
      icon: Shield,
      title: 'Страхование кредитов',
      description: 'Помощь в оформлении страховки для защиты ваших интересов',
      price: 'От 2% от суммы кредита'
    },
    {
      icon: Award,
      title: 'VIP-сопровождение',
      description: 'Персональный менеджер на всех этапах получения кредита',
      price: 'От 50 000 ₸'
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: 'Первичная консультация',
      description: 'Анализируем вашу ситуацию и определяем оптимальную стратегию',
      duration: '30 минут'
    },
    {
      step: 2,
      title: 'Подготовка документов',
      description: 'Помогаем собрать и правильно оформить все необходимые документы',
      duration: '1-2 дня'
    },
    {
      step: 3,
      title: 'Подача заявок',
      description: 'Подаем заявки в несколько подходящих банков одновременно',
      duration: '1 день'
    },
    {
      step: 4,
      title: 'Сопровождение процесса',
      description: 'Контролируем рассмотрение заявки и взаимодействуем с банком',
      duration: '3-7 дней'
    },
    {
      step: 5,
      title: 'Получение одобрения',
      description: 'Помогаем оформить кредитный договор на лучших условиях',
      duration: '1 день'
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <ServicesSection />
      
      {/* Дополнительные услуги */}
      <section className="section-padding bg-white geometric-bg">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Дополнительные услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр услуг для решения любых финансовых задач
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="card-subtle glow-subtle text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <service.icon size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {service.description}
                </p>
                <div className="text-primary-600 font-bold">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс работы */}
      <section className="section-padding luxury-gradient decorative-dots">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Как мы работаем
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Простой и прозрачный процесс получения кредита
            </p>
          </div>
          
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1 card-medium glow-medium">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                    <div className="text-primary-600 font-medium ml-4">
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
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Сколько стоят ваши услуги?',
                answer: 'Первичная консультация бесплатна. Оплата за услуги происходит только после успешного получения кредита. Размер комиссии зависит от сложности случая и составляет от 2% до 5% от суммы кредита.'
              },
              {
                question: 'Какие документы нужны для подачи заявки?',
                answer: 'Базовый пакет: паспорт, справка о доходах, трудовая книжка. Дополнительные документы зависят от типа кредита и требований банка. Мы поможем собрать полный пакет документов.'
              },
              {
                question: 'Можете ли вы помочь с плохой кредитной историей?',
                answer: 'Да, это наша специализация. У нас есть опыт работы с банками, которые лояльно относятся к заемщикам с проблемной кредитной историей. Мы поможем найти оптимальное решение.'
              },
              {
                question: 'Как быстро можно получить результат?',
                answer: 'Стандартный срок рассмотрения заявки в банке составляет 3-7 рабочих дней. В некоторых случаях возможно ускоренное рассмотрение за 1-2 дня.'
              }
            ].map((faq, index) => (
              <div key={index} className="card-subtle glow-subtle">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          {/* Призыв к действию */}
          <div className="text-center mt-16">
            <div className="card-medium glow-medium max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Нужна помощь с получением кредита?
              </h3>
              <p className="text-gray-600 mb-6">
                Наши эксперты готовы помочь вам получить кредит на выгодных условиях. 
                Первичная консультация бесплатно!
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
