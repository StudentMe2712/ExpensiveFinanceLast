const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

console.log('🔍 Тестирование токена клиентского бота...');

// Проверяем переменные окружения
const CLIENT_BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN || '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';

console.log('📋 Конфигурация:');
console.log(`🤖 Bot Token: ${CLIENT_BOT_TOKEN ? '✅ Установлен' : '❌ Не установлен'}`);
console.log(`🔑 Токен: ${CLIENT_BOT_TOKEN.substring(0, 10)}...`);

// Проверяем токен через API
async function testToken() {
  try {
    const bot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: false });
    
    // Получаем информацию о боте
    const botInfo = await bot.getMe();
    console.log('✅ Токен валидный!');
    console.log(`📱 Имя бота: ${botInfo.first_name}`);
    console.log(`🆔 ID бота: ${botInfo.id}`);
    console.log(`👤 Username: @${botInfo.username}`);
    
    return true;
  } catch (error) {
    console.error('❌ Ошибка при проверке токена:', error.message);
    if (error.response) {
      console.error('📄 Ответ API:', error.response.body);
    }
    return false;
  }
}

testToken().then((isValid) => {
  if (isValid) {
    console.log('🎉 Токен работает корректно!');
  } else {
    console.log('💥 Токен неверный или бот не существует!');
    console.log('🔧 Необходимо создать нового бота через @BotFather');
  }
});
