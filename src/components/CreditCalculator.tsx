'use client'

import { useState, useEffect } from 'react'
import { Calculator, Info } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'
import { useLanguage } from '@/contexts/LanguageContext'

const CreditCalculator = () => {
  const { t } = useLanguage()
  const [loanAmount, setLoanAmount] = useState(1500000)
  const [loanTerm, setLoanTerm] = useState(36) // в месяцах
  const [hasInsurance, setHasInsurance] = useState(true)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [interestRate, setInterestRate] = useState(25.6)

  // Расчет кредита
  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12
    const monthlyPaymentCalc = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
    
    setMonthlyPayment(monthlyPaymentCalc)
    setTotalPayment(monthlyPaymentCalc * loanTerm)
  }, [loanAmount, loanTerm, interestRate])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(num))
  }

  const formatCurrency = (num: number) => {
    return `${formatNumber(num)} ₸`
  }

  const loanAmountOptions = [
    { value: 500000, label: t('creditCalculator.amountOptions.500k') },
    { value: 1000000, label: t('creditCalculator.amountOptions.1m') },
    { value: 1500000, label: t('creditCalculator.amountOptions.1_5m') },
    { value: 2000000, label: t('creditCalculator.amountOptions.2m') },
    { value: 3000000, label: t('creditCalculator.amountOptions.3m') },
    { value: 8000000, label: t('creditCalculator.amountOptions.8m') },
  ]

  const loanTermOptions = [
    { value: 12, label: t('creditCalculator.termOptions.1year') },
    { value: 24, label: t('creditCalculator.termOptions.2years') },
    { value: 36, label: t('creditCalculator.termOptions.3years') },
    { value: 48, label: t('creditCalculator.termOptions.4years') },
    { value: 60, label: t('creditCalculator.termOptions.5years') },
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-white to-onyx-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Декоративный фон */}
      <div className="absolute inset-0 decorative-grid opacity-20"></div>
      
      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('creditCalculator.title')} <span className="text-gradient">{t('creditCalculator.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('creditCalculator.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Левая часть - настройки */}
          <div className="space-y-8">
            {/* Сумма кредита */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-primary-500/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('creditCalculator.loanAmount.title')}</h3>
              <div className="mb-4">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  {formatCurrency(loanAmount)}
                </div>
                <input
                  type="range"
                  min="150000"
                  max="8000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>150 000 ₸</span>
                  <span>8 000 000 ₸</span>
                </div>
              </div>
              
              {/* Быстрые кнопки выбора суммы */}
              <div className="grid grid-cols-3 gap-2">
                {loanAmountOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLoanAmount(option.value)}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                      loanAmount === option.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Срок кредита */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-primary-500/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('creditCalculator.loanTerm.title')}</h3>
              <div className="mb-4">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  {Math.round(loanTerm / 12 * 10) / 10} {t('creditCalculator.loanTerm.years')}
                </div>
                <input
                  type="range"
                  min="7"
                  max="60"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{t('creditCalculator.loanTerm.minTerm')}</span>
                  <span>{t('creditCalculator.loanTerm.maxTerm')}</span>
                </div>
              </div>
              
              {/* Быстрые кнопки выбора срока */}
              <div className="grid grid-cols-3 gap-2">
                {loanTermOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLoanTerm(option.value)}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                      loanTerm === option.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Метод погашения */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-primary-500/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('creditCalculator.paymentMethod.title')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium">
                  {t('creditCalculator.paymentMethod.equalPayments')}
                </button>
                <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  {t('creditCalculator.paymentMethod.decreasingPayments')}
                </button>
              </div>
              <button className="text-primary-600 text-sm mt-3 hover:text-primary-700 transition-colors">
                {t('creditCalculator.paymentMethod.differenceQuestion')}
              </button>
            </div>
          </div>

          {/* Правая часть - результаты */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-2xl glow-medium">
              {/* Переключатель страховки */}
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-1 flex">
                  <button
                    onClick={() => setHasInsurance(true)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      hasInsurance 
                        ? 'bg-white text-primary-600' 
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    {t('creditCalculator.insurance.withInsurance')}
                  </button>
                  <button
                    onClick={() => setHasInsurance(false)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      !hasInsurance 
                        ? 'bg-white text-primary-600' 
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    {t('creditCalculator.insurance.withoutInsurance')}
                  </button>
                </div>
              </div>

              {/* Ежемесячный платеж */}
              <div className="text-center mb-8">
                <div className="text-sm opacity-80 mb-2">{t('creditCalculator.monthlyPayment')}</div>
                <div className="text-4xl lg:text-5xl font-bold mb-4">
                  {formatCurrency(monthlyPayment)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{formatCurrency(totalPayment)}</div>
                    <div className="text-sm opacity-80">{t('creditCalculator.totalOverpayment')}</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{interestRate}%</div>
                    <div className="text-sm opacity-80">{t('creditCalculator.interestRate')}</div>
                  </div>
                </div>
              </div>

              {/* Кнопка действия */}
              <ApplicationFormButton 
                className="w-full bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                children={t('creditCalculator.submitApplication')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreditCalculator
