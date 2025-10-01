'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, ApplicationFormData } from '@/lib/validations'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ApplicationFormProps {
  onSuccess?: () => void
}

const ApplicationForm = ({ onSuccess }: ApplicationFormProps) => {
  const { t } = useLanguage()
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

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t('applicationForm.title')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t('applicationForm.subtitle')}
        </p>
      </div>

      <div className="card-medium glow-medium">
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg flex items-center space-x-3 animate-fade-in">
            <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-200">
              {t('applicationForm.successMessage')}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg flex items-center space-x-3 animate-fade-in">
            <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
            <p className="text-red-800 dark:text-red-200">
              {t('applicationForm.errorMessage')}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="form-label">
                {t('applicationForm.fields.fullName.label')} <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className={`form-input ${errors.fullName ? 'border-red-500' : ''}`}
                placeholder={t('applicationForm.fields.fullName.placeholder')}
                disabled={isSubmitting}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="form-label">
                {t('applicationForm.fields.phone.label')} <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                placeholder={t('applicationForm.fields.phone.placeholder')}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                {t('applicationForm.fields.email.label')}
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder={t('applicationForm.fields.email.placeholder')}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="loanAmount" className="form-label">
                {t('applicationForm.fields.loanAmount.label')}
              </label>
              <input
                id="loanAmount"
                type="number"
                {...register('loanAmount', { valueAsNumber: true })}
                className={`form-input ${errors.loanAmount ? 'border-red-500' : ''}`}
                placeholder={t('applicationForm.fields.loanAmount.placeholder')}
                disabled={isSubmitting}
              />
              {errors.loanAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.loanAmount.message}</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="comment" className="form-label">
              {t('applicationForm.fields.comment.label')}
            </label>
            <textarea
              id="comment"
              rows={4}
              {...register('comment')}
              className={`form-input ${errors.comment ? 'border-red-500' : ''}`}
              placeholder={t('applicationForm.fields.comment.placeholder')}
              disabled={isSubmitting}
            ></textarea>
            {errors.comment && (
              <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {t('applicationForm.submitting')}
              </>
            ) : (
              <>
                <Send size={20} />
                {t('applicationForm.submitButton')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ApplicationForm