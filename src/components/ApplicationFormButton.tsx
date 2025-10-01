'use client'

import { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import ApplicationForm from './ApplicationForm'
import { useLanguage } from '@/contexts/LanguageContext'

interface ApplicationFormButtonProps {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

const ApplicationFormButton = ({ className = "btn-primary glow-medium", children, onClick }: ApplicationFormButtonProps) => {
  const { t } = useLanguage()
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => {
          setIsFormOpen(true)
          if (onClick) onClick()
        }}
        className={`${className} inline-flex items-center justify-center`}
      >
        {children || t('common.submitApplication')}
        <ArrowRight size={20} className="ml-2" />
      </button>

      {/* Модальное окно с формой заявки */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsFormOpen(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="p-6">
              <div style={{ pointerEvents: 'auto' }}>
                <ApplicationForm onSuccess={() => setIsFormOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ApplicationFormButton