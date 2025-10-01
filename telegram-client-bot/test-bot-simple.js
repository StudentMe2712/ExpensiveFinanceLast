const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

console.log('🔍 Тестирование простого запуска бота...');

// Проверяем переменные окружения
const CLIENT_BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN || '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';

console.log('📋 Конфигурация:');
console.log(`🤖 Bot Token: ${CLIENT_BOT_TOKEN ? '✅ Установлен' : '❌ Не установлен'}`);

try {
  // Создаем бота
  const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: true });
  
  console.log('✅ Клиентский бот успешно создан!');
  console.log('🚀 Бот запущен и готов к работе!');
  console.log('📱 Бот: @ExpensiveFinanceClientbot');
  
  // Обработка ошибок
  clientBot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error.message);
  });

  clientBot.on('error', (error) => {
    console.error('❌ Bot error:', error.message);
  });

  // Простой обработчик команды /start
  clientBot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    
    clientBot.sendMessage(chatId, 
      `✨ Добро пожаловать в Expensive Finance! ✨\n\n💖 Привет, ${firstName}! Я ваш персональный финансовый помощник.\n\n🎯 Мы помогаем получить кредит, даже если банки отказывают!`
    );
  });

  // Обработчик сообщений
  clientBot.on('message', (msg) => {
    console.log(`📨 Получено сообщение от ${msg.from.first_name}: ${msg.text}`);
  });

} catch (error) {
  console.error('❌ Ошибка при создании бота:', error.message);
  process.exit(1);
}
