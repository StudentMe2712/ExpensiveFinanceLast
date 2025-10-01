import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ChatbotButton from '@/components/ChatbotButton'
import VisualEnhancements from '@/components/VisualEnhancements'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Expensive Finance - Помогаем получить кредит',
  description: 'Expensive Finance — надёжный партнёр в решении финансовых вопросов. Помогаем получить кредит, даже если банки отказывают.',
  keywords: 'кредит, займ, финансы, банк, одобрение кредита',
  authors: [{ name: 'Expensive Finance' }],
  openGraph: {
    title: 'Expensive Finance - Помогаем получить кредит',
    description: 'Expensive Finance — надёжный партнёр в решении финансовых вопросов',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300">
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <VisualEnhancements />
              {children}
              <ChatbotButton />
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
