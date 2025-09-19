import Link from 'next/link'
import { FileText, Users, Settings, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Всего заявок',
      value: '0',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'В обработке',
      value: '0',
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Одобрено',
      value: '0',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Отклонено',
      value: '0',
      icon: Settings,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ]

  const quickActions = [
    {
      title: 'Просмотр заявок',
      description: 'Управление всеми заявками клиентов',
      href: '/admin/applications',
      icon: FileText,
    },
    {
      title: 'Настройки контента',
      description: 'Редактирование текстов сайта',
      href: '/admin/content',
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка админки */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-gold-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EF</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Expensive Finance - Админ панель</h1>
            </div>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Быстрые действия */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Быстрые действия</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="block p-6 border border-gray-200 rounded-lg hover:border-gold-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className="p-3 bg-gold-100 rounded-lg">
                      <action.icon className="h-6 w-6 text-gold-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Последние заявки */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Последние заявки</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Заявок пока нет</p>
              <p className="text-sm">Новые заявки будут отображаться здесь</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
