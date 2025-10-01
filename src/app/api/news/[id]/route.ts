import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getUserFromToken } from '@/lib/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateNewsSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').optional(),
  content: z.string().min(1, 'Содержание обязательно').optional(),
  published: z.boolean().optional()
})

// PUT - обновление новости
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
    const validatedData = updateNewsSchema.parse(body)

    // Проверяем, существует ли новость
    const existingNews = await prisma.news.findUnique({
      where: { id: params.id }
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: 'Новость не найдена' },
        { status: 404 }
      )
    }

    const news = await prisma.news.update({
      where: { id: params.id },
      data: validatedData
    })

    return NextResponse.json({
      success: true,
      news: {
        id: news.id,
        title: news.title,
        content: news.content,
        published: news.published,
        createdAt: news.createdAt.toISOString(),
        updatedAt: news.updatedAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Ошибка обновления новости:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Ошибка при обновлении новости' },
      { status: 500 }
    )
  }
}

// DELETE - удаление новости
export async function DELETE(
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

    // Проверяем, существует ли новость
    const existingNews = await prisma.news.findUnique({
      where: { id: params.id }
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: 'Новость не найдена' },
        { status: 404 }
      )
    }

    await prisma.news.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Новость удалена'
    })
  } catch (error) {
    console.error('Ошибка удаления новости:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении новости' },
      { status: 500 }
    )
  }
}

