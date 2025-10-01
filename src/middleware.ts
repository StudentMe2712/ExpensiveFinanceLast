import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Страницы, которые требуют авторизации
const protectedRoutes = ['/dashboard', '/admin']
const adminRoutes = ['/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Получаем язык из cookie или заголовка Accept-Language
  const language = request.cookies.get('language')?.value || 'ru'
  
  // Проверяем авторизацию для защищенных страниц
  const token = request.cookies.get('auth-token')?.value
  
  // Если это защищенная страница
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      // Перенаправляем на страницу авторизации
      return NextResponse.redirect(new URL('/auth', request.url))
    }
    
    try {
      // Проверяем токен
      const decoded = jwt.verify(token, JWT_SECRET) as any
      
      // Проверяем права доступа к админ панели
      if (adminRoutes.some(route => pathname.startsWith(route)) && decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      // Токен недействителен, перенаправляем на авторизацию
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }
  
  // Если пользователь авторизован и пытается зайти на страницу авторизации
  if (pathname === '/auth' && token) {
    try {
      jwt.verify(token, JWT_SECRET)
      // Токен действителен, перенаправляем в личный кабинет
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      // Токен недействителен, продолжаем
    }
  }
  
  // Устанавливаем заголовок для клиентской стороны
  const response = NextResponse.next()
  
  // Добавляем заголовок с текущим языком
  response.headers.set('x-language', language)
  
  // Устанавливаем cookie для языка
  if (!request.cookies.get('language')) {
    response.cookies.set('language', 'ru', {
      maxAge: 60 * 60 * 24 * 365, // 1 год
      httpOnly: false, // Доступно для клиентского JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
