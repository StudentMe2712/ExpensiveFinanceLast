const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

console.log('🔍 Тестирование запуска клиентского бота...');

// Проверяем переменные окружения
const CLIENT_BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN || '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://expensive-finance.vercel.app';
const DATABASE_URL = process.env.DATABASE_URL;

console.log('📋 Конфигурация:');
console.log(`🤖 Bot Token: ${CLIENT_BOT_TOKEN ? '✅ Установлен' : '❌ Не установлен'}`);
console.log(`🌐 Website URL: ${WEBSITE_URL}`);
console.log(`🗄️ Database URL: ${DATABASE_URL ? '✅ Установлен' : '❌ Не установлен'}`);

try {
  // Создаем бота
  const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: true });
  
  console.log('✅ Клиентский бот успешно создан!');
  console.log('🚀 Бот запущен и готов к работе!');
  console.log('📱 Бот: @ExpensiveFinanceClientbot');
  console.log('🌐 Сайт:', WEBSITE_URL);
  console.log('💬 Режим: Независимый чатбот для клиентов');
  
  // Обработка ошибок
  clientBot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error.message);
  });

  clientBot.on('error', (error) => {
    console.error('❌ Bot error:', error.message);
  });

  // Простой обработчик сообщений для теста
  clientBot.on('message', (msg) => {
    console.log(`📨 Получено сообщение от ${msg.from.first_name}: ${msg.text}`);
  });

  // Обработчик команды /start
  clientBot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    
    clientBot.sendMessage(chatId, 
      `✨ Добро пожаловать в Expensive Finance! ✨\n\n💖 Привет, ${firstName}! Я ваш персональный финансовый помощник.\n\n🎯 Мы помогаем получить кредит, даже если банки отказывают!\n\n✨ Что я могу для вас сделать:\n🚀 Рассказать о кредитах\n📊 Помочь рассчитать платеж\n📞 Связать с менеджером\n❓ Ответить на вопросы\n\n🚀 Выберите интересующий раздел:`,
      {
        reply_markup: {
          keyboard: [
            ['🚀 Кредиты', '📊 Калькулятор'],
            ['📞 Связаться с менеджером', '🌐 Наш сайт'],
            ['ℹ️ О компании', '❓ Задать вопрос']
          ],
          resize_keyboard: true,
          one_time_keyboard: false
        }
      }
    );
  });

} catch (error) {
  console.error('❌ Ошибка при создании бота:', error.message);
  process.exit(1);
}
