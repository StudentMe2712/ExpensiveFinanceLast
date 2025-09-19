import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Создание базового контента для сайта
  const contentData = [
    {
      section: 'about_title',
      title: 'О компании',
      content: 'Expensive Finance — это команда профессионалов, которая помогает людям решать финансовые вопросы и получать кредиты даже в сложных ситуациях.',
    },
    {
      section: 'about_description',
      title: 'Описание компании',
      content: 'Мы работаем с ведущими банками России и имеем многолетний опыт в области кредитования. Наша цель — помочь каждому клиенту получить необходимые финансовые средства на выгодных условиях.',
    },
    {
      section: 'services_title',
      title: 'Наши услуги',
      content: 'Полный спектр услуг для решения ваших финансовых вопросов. Мы работаем с любыми ситуациями и находим оптимальные решения.',
    },
    {
      section: 'contacts_title',
      title: 'Контакты',
      content: 'Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь и ответить на ваши вопросы.',
    },
  ]

  for (const content of contentData) {
    await prisma.content.upsert({
      where: { section: content.section },
      update: content,
      create: content,
    })
  }

  console.log('База данных успешно инициализирована!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
