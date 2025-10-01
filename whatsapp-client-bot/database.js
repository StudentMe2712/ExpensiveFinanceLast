const { PrismaClient } = require('@prisma/client');

class WhatsAppClientBotDatabase {
  constructor() {
    this.prisma = new PrismaClient();
  }

  // Создание или обновление пользователя
  async createOrUpdateUser(userData) {
    try {
      const user = await this.prisma.user.upsert({
        where: { 
          telegramId: userData.id?.toString() || userData.phoneNumber 
        },
        update: {
          firstName: userData.first_name || userData.name,
          lastName: userData.last_name,
          username: userData.username,
          phoneNumber: userData.phoneNumber,
          lastActiveAt: new Date(),
          platform: 'whatsapp'
        },
        create: {
          telegramId: userData.id?.toString() || userData.phoneNumber,
          firstName: userData.first_name || userData.name,
          lastName: userData.last_name,
          username: userData.username,
          phoneNumber: userData.phoneNumber,
          platform: 'whatsapp',
          createdAt: new Date(),
          lastActiveAt: new Date()
        }
      });
      return user;
    } catch (error) {
      console.error('Ошибка создания/обновления пользователя:', error);
      return null;
    }
  }

  // Сохранение вопроса
  async saveQuestion(userId, question, answer, isFixedAnswer) {
    try {
      const questionRecord = await this.prisma.question.create({
        data: {
          userId: userId,
          question: question,
          answer: answer,
          isFixedAnswer: isFixedAnswer,
          createdAt: new Date()
        }
      });
      return questionRecord;
    } catch (error) {
      console.error('Ошибка сохранения вопроса:', error);
      return null;
    }
  }

  // Сохранение расчета
  async saveCalculation(userId, amount, term, interestRate, monthlyPayment, totalPayment, totalInterest) {
    try {
      const calculation = await this.prisma.calculation.create({
        data: {
          userId: userId,
          amount: amount,
          term: term,
          interestRate: interestRate,
          monthlyPayment: monthlyPayment,
          totalPayment: totalPayment,
          totalInterest: totalInterest,
          createdAt: new Date()
        }
      });
      return calculation;
    } catch (error) {
      console.error('Ошибка сохранения расчета:', error);
      return null;
    }
  }

  // Получение статистики бота
  async getBotStats() {
    try {
      const totalUsers = await this.prisma.user.count({
        where: { platform: 'whatsapp' }
      });
      
      const activeUsers = await this.prisma.user.count({
        where: { 
          platform: 'whatsapp',
          lastActiveAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Активные за последние 7 дней
          }
        }
      });
      
      const totalQuestions = await this.prisma.question.count({
        where: {
          user: { platform: 'whatsapp' }
        }
      });
      
      const fixedAnswers = await this.prisma.question.count({
        where: {
          user: { platform: 'whatsapp' },
          isFixedAnswer: true
        }
      });
      
      const manualAnswers = await this.prisma.question.count({
        where: {
          user: { platform: 'whatsapp' },
          isFixedAnswer: false
        }
      });
      
      const totalCalculations = await this.prisma.calculation.count({
        where: {
          user: { platform: 'whatsapp' }
        }
      });

      return {
        totalUsers,
        activeUsers,
        totalQuestions,
        fixedAnswers,
        manualAnswers,
        totalCalculations
      };
    } catch (error) {
      console.error('Ошибка получения статистики:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        totalQuestions: 0,
        fixedAnswers: 0,
        manualAnswers: 0,
        totalCalculations: 0
      };
    }
  }

  // Получение последней активности
  async getRecentActivity(limit = 5) {
    try {
      const questions = await this.prisma.question.findMany({
        where: {
          user: { platform: 'whatsapp' }
        },
        include: {
          user: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit
      });

      return { questions };
    } catch (error) {
      console.error('Ошибка получения последней активности:', error);
      return { questions: [] };
    }
  }

  // Тест подключения к БД
  async testConnection() {
    try {
      await this.prisma.$connect();
      console.log('✅ База данных WhatsApp клиент-бота: подключена');
      return true;
    } catch (error) {
      console.error('❌ Ошибка подключения к БД WhatsApp клиент-бота:', error);
      return false;
    }
  }

  // Закрытие подключения
  async disconnect() {
    await this.prisma.$disconnect();
  }
}

module.exports = new WhatsAppClientBotDatabase();
