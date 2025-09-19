const TelegramBot = require('node-telegram-bot-api');

// Конфигурация
const DEVELOPER_BOT_TOKEN = '8275935313:AAEJ6O8HN_6r6X-XRzzRpuWwb8jC883yn8o';
const CLIENT_BOT_TOKEN = '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';
const ADMIN_CHAT_ID = '-1002971250513';
const WEBSITE_URL = 'https://expensive-finance.vercel.app';

console.log('🔍 Проверка статуса системы Expensive Finance...\n');

async function checkSystemStatus() {
  const results = {
    developerBot: false,
    clientBot: false,
    developerBotInGroup: false,
    clientBotInGroup: false,
    websiteAccessible: false
  };

  try {
    // Проверка Developer Bot
    console.log('🤖 Проверка Developer Bot...');
    const devBot = new TelegramBot(DEVELOPER_BOT_TOKEN, { polling: false });
    const devBotInfo = await devBot.getMe();
    console.log(`✅ Developer Bot: @${devBotInfo.username} (${devBotInfo.first_name})`);
    results.developerBot = true;

    // Проверка Client Bot
    console.log('🤖 Проверка Client Bot...');
    const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: false });
    const clientBotInfo = await clientBot.getMe();
    console.log(`✅ Client Bot: @${clientBotInfo.username} (${clientBotInfo.first_name})`);
    results.clientBot = true;

    // Проверка Developer Bot в группе
    console.log('👥 Проверка Developer Bot в группе...');
    try {
      const devChatInfo = await devBot.getChat(ADMIN_CHAT_ID);
      console.log(`✅ Developer Bot в группе: ${devChatInfo.title || 'Группа разработчиков'}`);
      results.developerBotInGroup = true;
    } catch (error) {
      console.log(`❌ Developer Bot НЕ в группе: ${error.message}`);
    }

    // Проверка Client Bot в группе
    console.log('👥 Проверка Client Bot в группе...');
    try {
      const clientChatInfo = await clientBot.getChat(ADMIN_CHAT_ID);
      console.log(`✅ Client Bot в группе: ${clientChatInfo.title || 'Группа разработчиков'}`);
      results.clientBotInGroup = true;
    } catch (error) {
      console.log(`❌ Client Bot НЕ в группе: ${error.message}`);
      console.log('🔧 РЕШЕНИЕ: Добавьте @ExpensiveFinanceClientbot в группу разработчиков');
    }

    // Проверка доступности сайта
    console.log('🌐 Проверка доступности сайта...');
    try {
      const response = await fetch(WEBSITE_URL);
      if (response.ok) {
        console.log(`✅ Сайт доступен: ${WEBSITE_URL}`);
        results.websiteAccessible = true;
      } else {
        console.log(`❌ Сайт недоступен: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Ошибка доступа к сайту: ${error.message}`);
    }

  } catch (error) {
    console.error('❌ Критическая ошибка:', error.message);
  }

  // Итоговый отчет
  console.log('\n📊 ИТОГОВЫЙ ОТЧЕТ:');
  console.log('==================');
  console.log(`🤖 Developer Bot: ${results.developerBot ? '✅ Работает' : '❌ Не работает'}`);
  console.log(`🤖 Client Bot: ${results.clientBot ? '✅ Работает' : '❌ Не работает'}`);
  console.log(`👥 Developer Bot в группе: ${results.developerBotInGroup ? '✅ Да' : '❌ Нет'}`);
  console.log(`👥 Client Bot в группе: ${results.clientBotInGroup ? '✅ Да' : '❌ Нет'}`);
  console.log(`🌐 Сайт доступен: ${results.websiteAccessible ? '✅ Да' : '❌ Нет'}`);

  const allWorking = Object.values(results).every(status => status === true);
  
  if (allWorking) {
    console.log('\n🎉 СИСТЕМА ПОЛНОСТЬЮ ГОТОВА К ПРОДАКШН!');
    console.log('🚀 Можно деплоить на Vercel');
  } else {
    console.log('\n⚠️ ТРЕБУЮТСЯ ИСПРАВЛЕНИЯ:');
    if (!results.clientBotInGroup) {
      console.log('1. Добавить @ExpensiveFinanceClientbot в группу разработчиков');
    }
    if (!results.websiteAccessible) {
      console.log('2. Проверить доступность сайта');
    }
    if (!results.developerBotInGroup) {
      console.log('3. Проверить Developer Bot в группе');
    }
  }

  console.log('\n📋 СЛЕДУЮЩИЕ ШАГИ:');
  console.log('1. Исправить найденные проблемы');
  console.log('2. Запустить: npm run build');
  console.log('3. Деплой на Vercel');
  console.log('4. Добавить TELEGRAM_CLIENT_BOT_TOKEN в Vercel Environment Variables');
  console.log('5. Протестировать все функции');
}

// Запуск проверки
checkSystemStatus().catch(console.error);
