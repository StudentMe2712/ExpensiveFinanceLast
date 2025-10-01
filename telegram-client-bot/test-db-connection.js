const ClientBotDatabase = require('./database');

console.log('🔍 Тестирование подключения к базе данных...');

async function testConnection() {
  try {
    const connected = await ClientBotDatabase.testConnection();
    if (connected) {
      console.log('✅ Подключение к базе данных успешно!');
      
      // Тестируем получение статистики
      const stats = await ClientBotDatabase.getBotStats();
      console.log('📊 Статистика бота:', stats);
      
      await ClientBotDatabase.disconnect();
      console.log('🎉 Все тесты прошли успешно!');
    } else {
      console.log('❌ Не удалось подключиться к базе данных');
    }
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  }
}

testConnection();
