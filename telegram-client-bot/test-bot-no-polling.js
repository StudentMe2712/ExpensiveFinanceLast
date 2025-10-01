const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

console.log('🔍 Тестирование бота без polling...');

// Проверяем переменные окружения
const CLIENT_BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN || '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';

console.log('📋 Конфигурация:');
console.log(`🤖 Bot Token: ${CLIENT_BOT_TOKEN ? '✅ Установлен' : '❌ Не установлен'}`);

try {
  // Создаем бота БЕЗ polling
  const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: false });
  
  console.log('✅ Клиентский бот успешно создан!');
  console.log('🚀 Бот готов к работе (без polling)!');
  console.log('📱 Бот: @ExpensiveFinanceClientbot');
  
  // Обработка ошибок
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

  // Тестируем отправку сообщения
  console.log('📤 Тестируем отправку сообщения...');
  
  // Получаем информацию о боте
  clientBot.getMe().then((botInfo) => {
    console.log(`✅ Бот активен: ${botInfo.first_name} (@${botInfo.username})`);
    console.log('🎉 Бот готов к работе!');
    console.log('💡 Для тестирования отправьте команду /start боту @ExpensiveFinanceClientbot');
  }).catch((error) => {
    console.error('❌ Ошибка получения информации о боте:', error.message);
  });

} catch (error) {
  console.error('❌ Ошибка при создании бота:', error.message);
  process.exit(1);
}
