const { PrismaClient } = require('../node_modules/@prisma/client');

// Создание экземпляра Prisma клиента
const prisma = new PrismaClient();

// Функции для работы с пользователями
class ClientBotDatabase {
  
  // Создание или обновление пользователя
  static async createOrUpdateUser(telegramUser) {
    try {
      const user = await prisma.clientBotUser.upsert({
        where: { telegramId: telegramUser.id.toString() },
        update: {
          username: telegramUser.username || null,
          firstName: telegramUser.first_name || null,
          lastName: telegramUser.last_name || null,
          lastActivity: new Date(),
          isActive: true
        },
        create: {
          telegramId: telegramUser.id.toString(),
          username: telegramUser.username || null,
          firstName: telegramUser.first_name || null,
          lastName: telegramUser.last_name || null,
          lastActivity: new Date(),
          isActive: true
        }
      });
      
      console.log(`✅ Пользователь ${user.firstName} (${user.telegramId}) обновлен в БД`);
      return user;
    } catch (error) {
      console.error('❌ Ошибка создания/обновления пользователя:', error);
      return null;
    }
  }

  // Сохранение вопроса пользователя
  static async saveQuestion(userId, question, answer = null, isFixedAnswer = false) {
    try {
      const questionRecord = await prisma.clientBotQuestion.create({
        data: {
          userId: userId,
          question: question,
          answer: answer,
          isAnswered: answer !== null,
          isFixedAnswer: isFixedAnswer,
          answeredAt: answer ? new Date() : null
        }
      });
      
      console.log(`✅ Вопрос сохранен в БД: ${questionRecord.id}`);
      return questionRecord;
    } catch (error) {
      console.error('❌ Ошибка сохранения вопроса:', error);
      return null;
    }
  }

  // Сохранение расчета кредита
  static async saveCalculation(userId, amount, term, interestRate, monthlyPayment, totalPayment, totalInterest) {
    try {
      const calculation = await prisma.clientBotCalculation.create({
        data: {
          userId: userId,
          amount: amount,
          term: term,
          interestRate: interestRate,
          monthlyPayment: monthlyPayment,
          totalPayment: totalPayment,
          totalInterest: totalInterest
        }
      });
      
      console.log(`✅ Расчет сохранен в БД: ${calculation.id}`);
      return calculation;
    } catch (error) {
      console.error('❌ Ошибка сохранения расчета:', error);
      return null;
    }
  }

  // Получение статистики пользователя
  static async getUserStats(userId) {
    try {
      const user = await prisma.clientBotUser.findUnique({
        where: { id: userId },
        include: {
          questions: {
            orderBy: { createdAt: 'desc' },
            take: 5
          },
          calculations: {
            orderBy: { createdAt: 'desc' },
            take: 5
          }
        }
      });
      
      return user;
    } catch (error) {
      console.error('❌ Ошибка получения статистики пользователя:', error);
      return null;
    }
  }

  // Получение общей статистики бота
  static async getBotStats() {
    try {
      const totalUsers = await prisma.clientBotUser.count();
      const activeUsers = await prisma.clientBotUser.count({
        where: { isActive: true }
      });
      const totalQuestions = await prisma.clientBotQuestion.count();
      const totalCalculations = await prisma.clientBotCalculation.count();
      const fixedAnswers = await prisma.clientBotQuestion.count({
        where: { isFixedAnswer: true }
      });

      return {
        totalUsers,
        activeUsers,
        totalQuestions,
        totalCalculations,
        fixedAnswers,
        manualAnswers: totalQuestions - fixedAnswers
      };
    } catch (error) {
      console.error('❌ Ошибка получения статистики бота:', error);
      return null;
    }
  }

  // Получение последних активностей
  static async getRecentActivity(limit = 10) {
    try {
      const questions = await prisma.clientBotQuestion.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              firstName: true,
              username: true,
              telegramId: true
            }
          }
        }
      });

      const calculations = await prisma.clientBotCalculation.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              firstName: true,
              username: true,
              telegramId: true
            }
          }
        }
      });

      return { questions, calculations };
    } catch (error) {
      console.error('❌ Ошибка получения последних активностей:', error);
      return { questions: [], calculations: [] };
    }
  }

  // Обновление активности пользователя
  static async updateUserActivity(userId) {
    try {
      await prisma.clientBotUser.update({
        where: { id: userId },
        data: { lastActivity: new Date() }
      });
    } catch (error) {
      console.error('❌ Ошибка обновления активности:', error);
    }
  }

  // Проверка подключения к БД
  static async testConnection() {
    try {
      await prisma.$connect();
      console.log('✅ Подключение к базе данных успешно');
      return true;
    } catch (error) {
      console.error('❌ Ошибка подключения к БД:', error);
      return false;
    }
  }

  // Закрытие подключения
  static async disconnect() {
    try {
      await prisma.$disconnect();
      console.log('✅ Подключение к БД закрыто');
    } catch (error) {
      console.error('❌ Ошибка закрытия подключения:', error);
    }
  }
}

module.exports = ClientBotDatabase;
