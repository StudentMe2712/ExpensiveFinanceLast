'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

export default function AuthButton() {
  const { user } = useAuth()

  if (user) {
    return null // Показываем UserMenu вместо AuthButton
  }

  return (
    <Link
      href="/auth"
      className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95"
    >
      <LogIn className="h-4 w-4" />
      <span className="hidden md:block">Войти</span>
    </Link>
  )
}
