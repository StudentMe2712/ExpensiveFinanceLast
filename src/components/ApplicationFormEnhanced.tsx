'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, ApplicationFormData } from '@/lib/validations'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ApplicationFormEnhancedProps {
  onSuccess?: () => void
  className?: string
}

const ApplicationFormEnhanced = ({ onSuccess, className }: ApplicationFormEnhancedProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange'
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
        if (onSuccess) {
          setTimeout(() => {
            onSuccess()
          }, 2000)
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

  const isFormValid = isDirty && isValid && !isSubmitting

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Оставить заявку
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Заполните форму, и мы свяжемся с вами в течение 24 часов
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300">
        {/* Статус сообщения */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3 animate-fade-in">
            <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-200">
              Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3 animate-fade-in">
            <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
            <p className="text-red-800 dark:text-red-200">
              Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Имя */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Полное имя *
            </label>
            <input
              {...register('fullName')}
              type="text"
              id="fullName"
              className={cn(
                "w-full px-4 py-3 border rounded-lg transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
                errors.fullName 
                  ? "border-red-500 focus:ring-red-500" 
                  : "hover:border-gray-400 dark:hover:border-gray-500"
              )}
              placeholder="Введите ваше полное имя"
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Телефон */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Телефон *
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className={cn(
                "w-full px-4 py-3 border rounded-lg transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
                errors.phone 
                  ? "border-red-500 focus:ring-red-500" 
                  : "hover:border-gray-400 dark:hover:border-gray-500"
              )}
              placeholder="+7 (777) 123-45-67"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={cn(
                "w-full px-4 py-3 border rounded-lg transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
                errors.email 
                  ? "border-red-500 focus:ring-red-500" 
                  : "hover:border-gray-400 dark:hover:border-gray-500"
              )}
              placeholder="example@email.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Сумма кредита */}
          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Сумма кредита (₸)
            </label>
            <input
              {...register('loanAmount', { valueAsNumber: true })}
              type="number"
              id="loanAmount"
              className={cn(
                "w-full px-4 py-3 border rounded-lg transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
                errors.loanAmount 
                  ? "border-red-500 focus:ring-red-500" 
                  : "hover:border-gray-400 dark:hover:border-gray-500"
              )}
              placeholder="1000000"
              min="0"
              disabled={isSubmitting}
            />
            {errors.loanAmount && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                {errors.loanAmount.message}
              </p>
            )}
          </div>

          {/* Комментарий */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Комментарий
            </label>
            <textarea
              {...register('comment')}
              id="comment"
              rows={4}
              className={cn(
                "w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
                errors.comment 
                  ? "border-red-500 focus:ring-red-500" 
                  : "hover:border-gray-400 dark:hover:border-gray-500"
              )}
              placeholder="Расскажите о ваших потребностях..."
              disabled={isSubmitting}
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={cn(
              "w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
              "dark:focus:ring-offset-gray-800",
              isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 size={20} className="animate-spin" />
                <span>Отправляем заявку...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Send size={20} />
                <span>Отправить заявку</span>
              </div>
            )}
          </button>

          {/* Информация о конфиденциальности */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Нажимая "Отправить заявку", вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </div>
    </div>
  )
}

export default ApplicationFormEnhanced
