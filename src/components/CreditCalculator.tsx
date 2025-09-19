'use client'

import { useState, useEffect } from 'react'
import { Calculator, Info } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'

const CreditCalculator = () => {
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
    { value: 500000, label: '500 тыс ₸' },
    { value: 1000000, label: '1 млн ₸' },
    { value: 1500000, label: '1,5 млн ₸' },
    { value: 2000000, label: '2 млн ₸' },
    { value: 3000000, label: '3 млн ₸' },
    { value: 8000000, label: '8 млн ₸' },
  ]

  const loanTermOptions = [
    { value: 12, label: '1 год' },
    { value: 24, label: '2 года' },
    { value: 36, label: '3 года' },
    { value: 48, label: '4 года' },
    { value: 60, label: '5 лет' },
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-white to-onyx-50 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 decorative-grid opacity-20"></div>
      
      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Кредитный <span className="text-gradient">калькулятор</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Рассчитайте и получите решение по кредиту
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Левая часть - настройки */}
          <div className="space-y-8">
            {/* Сумма кредита */}
            <div className="card glow-subtle">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Сумма кредита</h3>
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
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Срок кредита */}
            <div className="card glow-subtle">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Срок</h3>
              <div className="mb-4">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  {Math.round(loanTerm / 12 * 10) / 10} года
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
                  <span>7 месяцев</span>
                  <span>5 лет</span>
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
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Метод погашения */}
            <div className="card glow-subtle">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Метод ежемесячного погашения</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium">
                  Равными платежами
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  С уменьшением
                </button>
              </div>
              <button className="text-primary-600 text-sm mt-3 hover:text-primary-700 transition-colors">
                В чем разница методов погашения?
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
                    Со страховкой
                  </button>
                  <button
                    onClick={() => setHasInsurance(false)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      !hasInsurance 
                        ? 'bg-white text-primary-600' 
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    Без страховки
                  </button>
                </div>
              </div>

              {/* Ежемесячный платеж */}
              <div className="text-center mb-8">
                <div className="text-sm opacity-80 mb-2">Ежемесячный платеж</div>
                <div className="text-4xl lg:text-5xl font-bold mb-4">
                  {formatCurrency(monthlyPayment)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{formatCurrency(totalPayment)}</div>
                    <div className="text-sm opacity-80">Общая переплата</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{interestRate}%</div>
                    <div className="text-sm opacity-80">Процентная ставка</div>
                  </div>
                </div>
              </div>

              {/* Подробнее о страховании */}
              <div className="border-t border-white border-opacity-20 pt-6 mb-6">
                <button className="text-white text-sm underline hover:no-underline transition-all duration-200">
                  Подробнее о страховании
                </button>
                <div className="flex items-center mt-2 text-sm opacity-80">
                  <Info size={16} className="mr-2" />
                  <span>Не является публичной офертой</span>
                </div>
              </div>

              {/* Кнопка заявки */}
              <ApplicationFormButton 
                className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                children="Подать заявку"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreditCalculator


