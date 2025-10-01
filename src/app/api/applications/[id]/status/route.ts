import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getUserFromToken } from '@/lib/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const statusSchema = z.object({
  status: z.enum(['NEW', 'PENDING', 'IN_PROGRESS', 'SENT_TO_BANK', 'APPROVED', 'REJECTED'])
})

// PUT - обновление статуса заявки
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    // Проверяем авторизацию
    const token = request.cookies.get('auth-token')?.value
    const user = token ? await getUserFromToken(token) : null

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = statusSchema.parse(body)

    // Проверяем, существует ли заявка
    const existingApplication = await prisma.application.findUnique({
      where: { id: params.id },
      include: { user: true }
    })

    if (!existingApplication) {
      return NextResponse.json(
        { error: 'Заявка не найдена' },
        { status: 404 }
      )
    }

    // Обновляем статус
    const application = await prisma.application.update({
      where: { id: params.id },
      data: { status: validatedData.status },
      include: { user: true }
    })

    return NextResponse.json({
      success: true,
      application: {
        id: application.id,
        name: application.name,
        phone: application.phone,
        email: application.email,
        loanAmount: application.loanAmount,
        loanTerm: application.loanTerm,
        status: application.status,
        createdAt: application.createdAt.toISOString(),
        updatedAt: application.updatedAt.toISOString(),
        user: application.user ? {
          id: application.user.id,
          name: application.user.name,
          email: application.user.email
        } : null
      }
    })
  } catch (error) {
    console.error('Ошибка обновления статуса заявки:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Ошибка при обновлении статуса заявки' },
      { status: 500 }
    )
  }
}

