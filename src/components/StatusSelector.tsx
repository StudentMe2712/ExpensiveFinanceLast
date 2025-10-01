'use client'

import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface StatusOption {
  value: string
  label: string
  color: string
}

interface StatusSelectorProps {
  currentStatus: string
  onStatusChange: (status: string) => Promise<void>
  disabled?: boolean
}

const statusOptions: StatusOption[] = [
  { value: 'NEW', label: 'Новая', color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300' },
  { value: 'PENDING', label: 'Ожидает', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200' },
  { value: 'IN_PROGRESS', label: 'В обработке', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200' },
  { value: 'SENT_TO_BANK', label: 'Отправлено в банк', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200' },
  { value: 'APPROVED', label: 'Одобрено', color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200' },
  { value: 'REJECTED', label: 'Отклонено', color: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200' }
]

export default function StatusSelector({ currentStatus, onStatusChange, disabled = false }: StatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const currentOption = statusOptions.find(option => option.value === currentStatus) || statusOptions[0]

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus || isChanging) return

    setIsChanging(true)
    try {
      await onStatusChange(newStatus)
      setIsOpen(false)
    } catch (error) {
      console.error('Ошибка изменения статуса:', error)
    } finally {
      setIsChanging(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled || isChanging}
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          disabled || isChanging
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:opacity-80 cursor-pointer'
        } ${currentOption.color}`}
      >
        <span>{currentOption.label}</span>
        {!disabled && !isChanging && (
          <ChevronDown className="ml-1 h-3 w-3" />
        )}
        {isChanging && (
          <div className="ml-1 h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
        )}
      </button>

      {isOpen && !disabled && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="py-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    option.value === currentStatus ? 'bg-gray-50 dark:bg-gray-700' : ''
                  }`}
                >
                  <span className="text-gray-900 dark:text-white">{option.label}</span>
                  {option.value === currentStatus && (
                    <Check className="h-4 w-4 text-primary-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

