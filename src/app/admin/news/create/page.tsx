'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'

const newsSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен'),
  content: z.string().min(1, 'Содержание обязательно'),
  published: z.boolean().default(false)
})

type NewsFormData = z.infer<typeof newsSchema>

export default function CreateNews() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      published: false
    }
  })

  const watchedPublished = watch('published')

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/')
    }
  }, [user, loading, router])

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        router.push('/admin/news')
      } else {
        setError(result.error || 'Ошибка создания новости')
      }
    } catch (error) {
      setError('Произошла ошибка при создании новости')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-max py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/admin/news"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Назад к списку</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Создание новости
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Создайте новую новость для сайта
          </p>
        </div>

        {/* Форма */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Информация о новости
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Заголовок */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Заголовок *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  id="title"
                  className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Введите заголовок новости"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                )}
              </div>

              {/* Содержание */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Содержание *
                </label>
                <textarea
                  {...register('content')}
                  id="content"
                  rows={10}
                  className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-vertical"
                  placeholder="Введите содержание новости"
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
                )}
              </div>

              {/* Статус публикации */}
              <div className="flex items-center">
                <input
                  {...register('published')}
                  type="checkbox"
                  id="published"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Опубликовать сразу
                </label>
              </div>
            </div>

            {/* Кнопки */}
            <div className="mt-8 flex items-center justify-between">
              <Link
                href="/admin/news"
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Отмена
              </Link>
              
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setValue('published', !watchedPublished)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    watchedPublished
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span>{watchedPublished ? 'Опубликовать' : 'Сохранить как черновик'}</span>
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSubmitting ? 'Сохранение...' : 'Сохранить'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

