import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    // Проверяем, есть ли уже админ
    const existingAdmin = await prisma.user.findFirst({
      where: { role: UserRole.ADMIN }
    })

    if (existingAdmin) {
      console.log('✅ Администратор уже существует:', existingAdmin.email)
      return
    }

    // Создаем админа
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@expensive-finance.com',
        password: hashedPassword,
        name: 'Администратор',
        phone: '+7 (777) 123-45-67',
        role: UserRole.ADMIN,
        isActive: true
      }
    })

    console.log('✅ Администратор создан:')
    console.log('📧 Email:', admin.email)
    console.log('🔑 Пароль: admin123')
    console.log('👤 Имя:', admin.name)
    console.log('📞 Телефон:', admin.phone)
    console.log('🛡️ Роль:', admin.role)

  } catch (error) {
    console.error('❌ Ошибка создания администратора:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()

