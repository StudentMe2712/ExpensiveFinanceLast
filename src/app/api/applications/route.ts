import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getUserFromToken } from '@/lib/auth'

const prisma = new PrismaClient()

// Telegram Bot API (Developer Bot - для уведомлений)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8275935313:AAEJ6O8HN_6r6X-XRzzRpuWwb8jC883yn8o'
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1002971250513' // Group Chat ID

// Client Bot Token (для клиентского бота)
const TELEGRAM_CLIENT_BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN

async function sendTelegramMessage(message: string) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      console.error('Failed to send Telegram message:', await response.text())
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, phone, email, loanAmount, comment } = body

    // Валидация данных
    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      )
    }

    // Проверяем авторизацию (опционально)
    const token = request.cookies.get('auth-token')?.value
    let userId = null
    
    if (token) {
      const user = await getUserFromToken(token)
      userId = user?.id || null
    }

    // Сохранение в базу данных
    const application = await prisma.application.create({
      data: {
        name: fullName,
        phone,
        email: email || null,
        loanAmount: loanAmount || null,
        loanTerm: null,
        purpose: comment || null,
        hasInsurance: false,
        status: 'NEW',
        userId: userId,
        createdAt: new Date(),
      },
    })

    // Формирование сообщения для Telegram
    const telegramMessage = `
🆕 <b>Новая заявка на кредит!</b>

👤 <b>Клиент:</b> ${fullName}
📞 <b>Телефон:</b> ${phone}
${email ? `📧 <b>Email:</b> ${email}` : ''}

💰 <b>Сумма кредита:</b> ${loanAmount ? `${new Intl.NumberFormat('ru-RU').format(loanAmount)} ₸` : 'Не указана'}
${comment ? `💬 <b>Комментарий:</b> ${comment}` : ''}

📊 <b>ID заявки:</b> #${application.id}
🕐 <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}

<i>Заявка автоматически сохранена в базе данных</i>
    `.trim()

    // Отправка в Telegram
    await sendTelegramMessage(telegramMessage)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена',
        applicationId: application.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Проверяем авторизацию
    const token = request.cookies.get('auth-token')?.value
    const user = token ? await getUserFromToken(token) : null

    if (!user) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      )
    }

    // Если админ - показываем все заявки, иначе только заявки пользователя
    const where = user.role === 'ADMIN' 
      ? {}
      : {
          OR: [
            { userId: user.id },
            { email: user.email }
          ]
        }

    const applications = await prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true,
      applications: applications.map(app => ({
        id: app.id,
        name: app.name,
        phone: app.phone,
        email: app.email,
        loanAmount: app.loanAmount,
        loanTerm: app.loanTerm,
        status: app.status,
        createdAt: app.createdAt.toISOString(),
        comment: app.comment,
        user: app.user
      }))
    })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении заявок' },
      { status: 500 }
    )
  }
}