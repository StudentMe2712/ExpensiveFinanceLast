'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, Lock } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 dark:bg-red-800 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Shield className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Доступ запрещен
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            У вас нет прав для доступа к этой странице. 
            Пожалуйста, войдите в систему с соответствующими правами.
          </p>

          <div className="space-y-4">
            <Link
              href="/auth"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Lock className="h-4 w-4" />
              <span>Войти в систему</span>
            </Link>
            
            <Link
              href="/"
              className="w-full flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>На главную страницу</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Expensive Finance. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  )
}

