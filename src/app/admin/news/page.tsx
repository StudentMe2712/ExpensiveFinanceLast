'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar } from 'lucide-react'
import Link from 'next/link'

interface News {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function NewsManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [news, setNews] = useState<News[]>([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      fetchNews()
    }
  }, [user])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      
      if (data.success) {
        setNews(data.news)
      }
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error)
    } finally {
      setNewsLoading(false)
    }
  }

  const togglePublish = async (newsId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !currentStatus }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setNews(news.map(item => 
          item.id === newsId 
            ? { ...item, published: !currentStatus }
            : item
        ))
      }
    } catch (error) {
      console.error('Ошибка изменения статуса:', error)
    }
  }

  const deleteNews = async (newsId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту новость?')) {
      return
    }

    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setNews(news.filter(item => item.id !== newsId))
      }
    } catch (error) {
      console.error('Ошибка удаления новости:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading || newsLoading) {
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Управление новостями
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Создавайте и редактируйте новости для сайта
              </p>
            </div>
            <Link
              href="/admin/news/create"
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              <span>Создать новость</span>
            </Link>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего новостей</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{news.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Опубликовано</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {news.filter(item => item.published).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <EyeOff className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Черновики</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {news.filter(item => !item.published).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Список новостей */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Список новостей
            </h2>
          </div>

          {news.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Новостей пока нет
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Создайте первую новость для сайта
              </p>
              <Link
                href="/admin/news/create"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Создать новость
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {news.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.published 
                            ? 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200'
                            : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {item.published ? (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Опубликовано
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Черновик
                            </>
                          )}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {item.content}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Создано: {formatDate(item.createdAt)}
                        {item.updatedAt !== item.createdAt && (
                          <span> • Обновлено: {formatDate(item.updatedAt)}</span>
                        )}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => togglePublish(item.id, item.published)}
                        className={`p-2 rounded-lg transition-colors ${
                          item.published
                            ? 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900'
                            : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900'
                        }`}
                        title={item.published ? 'Снять с публикации' : 'Опубликовать'}
                      >
                        {item.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      
                      <Link
                        href={`/admin/news/${item.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      
                      <button
                        onClick={() => deleteNews(item.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

