import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getUserFromToken } from '@/lib/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const newsSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен'),
  content: z.string().min(1, 'Содержание обязательно'),
  published: z.boolean().optional()
})

// GET - получение новостей
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    
    const where = published === 'true' ? { published: true } : {}
    
    const news = await prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      news: news.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        published: item.published,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString()
      }))
    })
  } catch (error) {
    console.error('Ошибка получения новостей:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении новостей' },
      { status: 500 }
    )
  }
}

// POST - создание новости
export async function POST(request: NextRequest) {
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
    const validatedData = newsSchema.parse(body)

    const news = await prisma.news.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        published: validatedData.published || false
      }
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
    }, { status: 201 })
  } catch (error) {
    console.error('Ошибка создания новости:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Ошибка при создании новости' },
      { status: 500 }
    )
  }
}

