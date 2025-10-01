'use client'

import Link from 'next/link'
import { FileText, Users, Settings, BarChart3, Newspaper } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AdminDashboard() {
  const { t } = useLanguage()

  const stats = [
    {
      title: t('admin.stats.pending'),
      value: '0',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('admin.stats.inProgress'),
      value: '0',
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: t('admin.stats.approved'),
      value: '0',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: t('admin.stats.rejected'),
      value: '0',
      icon: Settings,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ]

  const quickActions = [
    {
      title: t('admin.quickActions.viewApplications.title'),
      description: t('admin.quickActions.viewApplications.description'),
      href: '/admin/applications',
      icon: FileText,
    },
    {
      title: 'Управление новостями',
      description: 'Создание и редактирование новостей',
      href: '/admin/news',
      icon: Newspaper,
    },
    {
      title: 'Настройки контента',
      description: 'Редактирование текстов сайта',
      href: '/admin/content',
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container-max py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EF</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('admin.title')}</h1>
          </div>
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            ← {t('admin.backToSite')}
          </Link>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Быстрые действия */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 transition-colors duration-300">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('admin.quickActions.viewApplications.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <action.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Последние заявки */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('admin.applications')}</h2>
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>{t('admin.noApplications')}</p>
            <p className="text-sm">{t('admin.noApplicationsDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}