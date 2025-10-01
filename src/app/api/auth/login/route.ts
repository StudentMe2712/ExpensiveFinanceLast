import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/auth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(1, 'Введите пароль')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация данных
    const validatedData = loginSchema.parse(body)
    
    // Вход пользователя
    const { user, token } = await loginUser(validatedData)
    
    // Создаем ответ с токеном в httpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
    
    // Устанавливаем httpOnly cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
    })
    
    return response
  } catch (error) {
    console.error('Ошибка входа:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Неверные данные', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Ошибка входа' },
      { status: 401 }
    )
  }
}

