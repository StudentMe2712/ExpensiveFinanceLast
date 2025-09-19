import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ChatbotButton from '@/components/ChatbotButton'
import WhatsAppButton from '@/components/WhatsAppButton'
import TelegramBotButton from '@/components/TelegramBotButton'
import VisualEnhancements from '@/components/VisualEnhancements'

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
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <VisualEnhancements />
        {children}
        <ChatbotButton />
        <WhatsAppButton />
        <TelegramBotButton />
      </body>
    </html>
  )
}
