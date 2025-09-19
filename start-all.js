#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Запуск полной системы Expensive Finance...\n');

// Массив для хранения процессов
const processes = [];

// Функция для запуска процесса
function startProcess(name, command, args, cwd, color) {
  console.log(`${color}📦 Запуск ${name}...`);
  
  const process = spawn(command, args, {
    cwd: cwd,
    stdio: 'pipe',
    shell: true
  });

  // Обработка вывода
  process.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(`${color}[${name}] ${output}`);
    }
  });

  process.stderr.on('data', (data) => {
    const error = data.toString().trim();
    if (error) {
      console.log(`${color}[${name}] ❌ ${error}`);
    }
  });

  process.on('close', (code) => {
    console.log(`${color}[${name}] 🔴 Процесс завершен с кодом ${code}`);
  });

  process.on('error', (error) => {
    console.log(`${color}[${name}] ❌ Ошибка: ${error.message}`);
  });

  processes.push({ name, process });
  return process;
}

// Функция для остановки всех процессов
function stopAllProcesses() {
  console.log('\n🛑 Остановка всех процессов...');
  processes.forEach(({ name, process }) => {
    console.log(`🔴 Остановка ${name}...`);
    process.kill('SIGTERM');
  });
  
  setTimeout(() => {
    processes.forEach(({ name, process }) => {
      if (!process.killed) {
        console.log(`🔴 Принудительная остановка ${name}...`);
        process.kill('SIGKILL');
      }
    });
    process.exit(0);
  }, 5000);
}

// Обработка сигналов завершения
process.on('SIGINT', stopAllProcesses);
process.on('SIGTERM', stopAllProcesses);

// Запуск процессов с задержкой
setTimeout(() => {
  // 1. Запуск основного бота (для группы разработчиков)
  startProcess(
    'Основной бот',
    'npm',
    ['start'],
    path.join(__dirname, 'telegram-bot'),
    '\x1b[36m' // Cyan
  );
}, 1000);

setTimeout(() => {
  // 2. Запуск клиентского бота
  startProcess(
    'Клиентский бот',
    'npm',
    ['start'],
    path.join(__dirname, 'telegram-client-bot'),
    '\x1b[32m' // Green
  );
}, 3000);

setTimeout(() => {
  // 3. Запуск сайта (Next.js)
  startProcess(
    'Сайт (Next.js)',
    'npm',
    ['run', 'dev'],
    __dirname,
    '\x1b[33m' // Yellow
  );
}, 5000);

// Информация о системе
setTimeout(() => {
  console.log('\n✅ Все сервисы запущены!');
  console.log('\n📋 Доступные сервисы:');
  console.log('🤖 Основной бот: @ExpensiveFinanceBot (для группы разработчиков)');
  console.log('👥 Клиентский бот: @ExpensiveFinanceClientbot (для клиентов)');
  console.log('🌐 Сайт: http://localhost:3000');
  console.log('\n💡 Для остановки всех сервисов нажмите Ctrl+C');
  console.log('📱 Заявки с сайта будут автоматически отправляться в группу разработчиков');
  console.log('💬 Клиенты могут общаться с ботом через кнопку в footer сайта\n');
}, 7000);
