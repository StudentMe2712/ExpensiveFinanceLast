const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Запуск всех ботов Expensive Finance...\n');

// Функция для запуска бота
function startBot(name, command, args, cwd) {
  console.log(`📱 Запуск ${name}...`);
  
  const bot = spawn(command, args, {
    cwd: cwd,
    stdio: 'inherit',
    shell: true
  });

  bot.on('error', (error) => {
    console.error(`❌ Ошибка запуска ${name}:`, error.message);
  });

  bot.on('close', (code) => {
    console.log(`📱 ${name} завершен с кодом ${code}`);
  });

  return bot;
}

// Запуск Telegram админ-бота
const telegramAdminBot = startBot(
  'Telegram Admin Bot',
  'npm',
  ['start'],
  path.join(__dirname, 'telegram-bot')
);

// Запуск Telegram клиент-бота
const telegramClientBot = startBot(
  'Telegram Client Bot',
  'npm',
  ['start'],
  path.join(__dirname, 'telegram-client-bot')
);

// Запуск WhatsApp админ-бота
const whatsappAdminBot = startBot(
  'WhatsApp Admin Bot',
  'npm',
  ['start'],
  path.join(__dirname, 'whatsapp-bot')
);

// Запуск WhatsApp клиент-бота
const whatsappClientBot = startBot(
  'WhatsApp Client Bot',
  'npm',
  ['start'],
  path.join(__dirname, 'whatsapp-client-bot')
);

// Обработка завершения процесса
process.on('SIGINT', () => {
  console.log('\n🛑 Завершение работы всех ботов...');
  
  telegramAdminBot.kill();
  telegramClientBot.kill();
  whatsappAdminBot.kill();
  whatsappClientBot.kill();
  
  setTimeout(() => {
    console.log('✅ Все боты завершены');
    process.exit(0);
  }, 2000);
});

console.log('\n✅ Все боты запущены!');
console.log('📱 Telegram Admin Bot: @ExpensiveFinanceBot');
console.log('💬 Telegram Client Bot: @ExpensiveFinanceClientBot');
console.log('📱 WhatsApp Admin Bot: готов к подключению');
console.log('💬 WhatsApp Client Bot: готов к подключению');
console.log('\n🛑 Нажмите Ctrl+C для остановки всех ботов');
