import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import { User, UserRole } from '@prisma/client'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = '7d'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
}

// Хеширование пароля
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Проверка пароля
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Создание JWT токена
export function createToken(user: AuthUser): string {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

// Проверка JWT токена
export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name || '',
      role: decoded.role
    }
  } catch (error) {
    return null
  }
}

// Регистрация пользователя
export async function registerUser(data: RegisterData): Promise<{ user: AuthUser; token: string }> {
  const { email, password, name, phone } = data

  // Проверяем, существует ли пользователь
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует')
  }

  // Хешируем пароль
  const hashedPassword = await hashPassword(password)

  // Создаем пользователя
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      phone,
      role: UserRole.CLIENT
    }
  })

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  }

  const token = createToken(authUser)

  // Сохраняем сессию
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
    }
  })

  return { user: authUser, token }
}

// Вход пользователя
export async function loginUser(data: LoginData): Promise<{ user: AuthUser; token: string }> {
  const { email, password } = data

  // Находим пользователя
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('Неверный email или пароль')
  }

  if (!user.isActive) {
    throw new Error('Аккаунт заблокирован')
  }

  // Проверяем пароль
  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) {
    throw new Error('Неверный email или пароль')
  }

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  }

  const token = createToken(authUser)

  // Сохраняем сессию
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
    }
  })

  return { user: authUser, token }
}

// Получение пользователя по токену
export async function getUserFromToken(token: string): Promise<AuthUser | null> {
  const decoded = verifyToken(token)
  if (!decoded) return null

  // Проверяем, что сессия существует и не истекла
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role
  }
}

// Выход пользователя
export async function logoutUser(token: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { token }
  })
}

