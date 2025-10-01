'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, Phone, Mail, Calendar, DollarSign } from 'lucide-react'
import { Application, ApplicationStatus } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import StatusSelector from '@/components/StatusSelector'

export default function ApplicationsPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications')
      if (response.ok) {
        const data = await response.json()
        setApplications(data.applications)
      } else {
        setError('Ошибка загрузки заявок')
      }
    } catch (err) {
      setError('Ошибка загрузки заявок')
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const data = await response.json()
        // Обновляем заявку в списке
        setApplications(applications.map(app => 
          app.id === applicationId 
            ? { ...app, status: newStatus as ApplicationStatus }
            : app
        ))
      } else {
        throw new Error('Ошибка обновления статуса')
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error)
      throw error
    }
  }

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800'
      case ApplicationStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800'
      case ApplicationStatus.SENT_TO_BANK:
        return 'bg-purple-100 text-purple-800'
      case ApplicationStatus.APPROVED:
        return 'bg-green-100 text-green-800'
      case ApplicationStatus.REJECTED:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return t('admin.status.pending')
      case ApplicationStatus.IN_PROGRESS:
        return t('admin.status.inProgress')
      case ApplicationStatus.SENT_TO_BANK:
        return t('admin.status.sentToBank')
      case ApplicationStatus.APPROVED:
        return t('admin.status.approved')
      case ApplicationStatus.REJECTED:
        return t('admin.status.rejected')
      default:
        return 'Неизвестно'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container-max py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container-max py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('admin.applications')}</h1>
          </div>
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            ← {t('admin.backToSite')}
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center transition-colors duration-300">
            <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{t('admin.noApplications')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('admin.noApplicationsDesc')}</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-300">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {t('admin.totalApplications')} {applications.length}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('admin.table.client')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('admin.table.contacts')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('admin.table.amount')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('admin.table.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('admin.table.date')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('admin.table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {application.name}
                        </div>
                        {application.comment && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {application.comment}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                            <Phone size={14} className="mr-1 text-gray-400" />
                            <a href={`tel:${application.phone}`} className="hover:text-gold-600">
                              {application.phone}
                            </a>
                          </div>
                          <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                            <Mail size={14} className="mr-1 text-gray-400" />
                            <a href={`mailto:${application.email}`} className="hover:text-gold-600">
                              {application.email}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                          <DollarSign size={14} className="mr-1 text-gray-400" />
                          {application.loanAmount ? `${application.loanAmount.toLocaleString('ru-RU')} ₸` : 'Не указано'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user?.role === 'ADMIN' ? (
                          <StatusSelector
                            currentStatus={application.status}
                            onStatusChange={(newStatus) => updateApplicationStatus(application.id, newStatus)}
                          />
                        ) : (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                            {getStatusText(application.status)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          {new Date(application.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/admin/applications/${application.id}`}
                          className="text-gold-600 hover:text-gold-900"
                        >
                          {t('admin.table.viewDetails')}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}