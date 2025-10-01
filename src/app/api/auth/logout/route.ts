import { NextRequest, NextResponse } from 'next/server'
import { logoutUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    
    if (token) {
      await logoutUser(token)
    }
    
    // Создаем ответ и удаляем cookie
    const response = NextResponse.json({
      success: true,
      message: 'Выход выполнен успешно'
    })
    
    // Удаляем cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    })
    
    return response
  } catch (error) {
    console.error('Ошибка выхода:', error)
    
    return NextResponse.json(
      { success: false, error: 'Ошибка выхода' },
      { status: 500 }
    )
  }
}

