'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, ApplicationFormData } from '@/lib/validations'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

interface ApplicationFormProps {
  onSuccess?: () => void
}

const ApplicationForm = ({ onSuccess }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        // Закрыть модальное окно если оно есть
        if (onSuccess) {
          setTimeout(() => {
            onSuccess()
          }, 2000) // Даем время показать сообщение об успехе
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const content = (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Оставить заявку
        </h2>
        <p className="text-xl text-gray-600">
          Заполните форму, и мы свяжемся с вами в течение 24 часов
        </p>
      </div>

          <div className={onSuccess ? "card" : "card-medium glow-medium"}>
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle size={20} className="text-green-600" />
                <p className="text-green-800">
                  Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle size={20} className="text-red-600" />
                <p className="text-red-800">
                  Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО *
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  id="fullName"
                  className="input-field"
                  placeholder="Иванов Иван Иванович"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className="input-field"
                  placeholder="+7 (777) 123-45-67"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="ivan@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Сумма кредита (тенге) *
                </label>
                <input
                  {...register('loanAmount', { valueAsNumber: true })}
                  type="number"
                  id="loanAmount"
                  className="input-field"
                  placeholder="1500000"
                  min="50000"
                  max="50000000"
                />
                {errors.loanAmount && (
                  <p className="mt-1 text-sm text-red-600">{errors.loanAmount.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Комментарий
                </label>
                <textarea
                  {...register('comment')}
                  id="comment"
                  rows={4}
                  className="textarea-field"
                  placeholder="Расскажите о вашей ситуации, целях кредита или особых обстоятельствах..."
                />
                {errors.comment && (
                  <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary ${onSuccess ? "" : "glow-intense"} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Отправляем...
                  </>
                ) : (
                  <>
                    Отправить заявку
                    <Send size={20} className="ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Нажимая кнопку "Отправить заявку", вы соглашаетесь с{' '}
              <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                политикой конфиденциальности
              </a>
            </div>
          </div>
    </>
  )

  // Если onSuccess передан, значит это модальное окно - возвращаем только контент
  if (onSuccess) {
    return content
  }

  // Иначе возвращаем полную секцию
  return (
    <section id="application" className="section-padding luxury-gradient decorative-dots">
      <div className="container-max">
        <div className="max-w-2xl mx-auto">
          {content}
        </div>
      </div>
    </section>
  )
}

export default ApplicationForm
