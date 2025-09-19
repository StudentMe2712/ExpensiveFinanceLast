const TelegramBot = require('node-telegram-bot-api');

// Токен клиентского бота
const CLIENT_BOT_TOKEN = '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';

console.log('🧪 Тестирование клиентского бота...');
console.log('📱 Токен:', CLIENT_BOT_TOKEN);

// Создаем экземпляр бота
const bot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: false });

async function testBot() {
  try {
    console.log('\n🔍 Проверка информации о боте...');
    
    // Получаем информацию о боте
    const botInfo = await bot.getMe();
    console.log('✅ Бот найден!');
    console.log('📱 Имя:', botInfo.first_name);
    console.log('👤 Username:', botInfo.username);
    console.log('🆔 ID:', botInfo.id);
    console.log('🤖 Это бот:', botInfo.is_bot);
    
    console.log('\n🔗 Ссылка на бота:');
    console.log(`https://t.me/${botInfo.username}`);
    
    console.log('\n✅ Клиентский бот готов к работе!');
    console.log('📋 Следующие шаги:');
    console.log('1. Найдите бота в Telegram:', `@${botInfo.username}`);
    console.log('2. Напишите /start');
    console.log('3. Протестируйте меню и функции');
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании бота:', error.message);
    
    if (error.response) {
      console.error('📊 Статус:', error.response.status);
      console.error('📄 Ответ:', error.response.data);
    }
    
    console.log('\n🔧 Возможные причины:');
    console.log('- Неверный токен бота');
    console.log('- Бот не создан или удален');
    console.log('- Проблемы с интернет-соединением');
  }
}

// Запускаем тест
testBot();
