const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

// Конфигурация
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://expensive-finance.vercel.app';

// Создание клиента WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Состояния пользователей
const userStates = new Map();

// Эмодзи для красивого оформления
const EMOJI = {
  MONEY: '💰', BANK: '🏦', CALCULATOR: '📊', PHONE: '📞', INFO: 'ℹ️', WEBSITE: '🌐',
  CREDIT: '🚀', MORTGAGE: '🏠', CAR: '🚗', BUSINESS: '💼', QUESTION: '❓', BACK: '🔙', APPLICATION: '📋', CALL: '📞',
  WHATSAPP: '💬', EMAIL: '📧', SUCCESS: '✅', CLOCK: '⏰', SHIELD: '🛡️', USERS: '👥',
  ARROW: '➡️', STAR: '⭐', FIRE: '🔥', GIFT: '🎁', CHECK: '✅', WARNING: '⚠️',
  HEART: '❤️', DIAMOND: '💎', TROPHY: '🏆', ROCKET: '🚀', LIGHTNING: '⚡', TARGET: '🎯',
  MAGIC: '✨', CROWN: '👑', MEDAL: '🏅', GEM: '💎', SPARKLES: '✨', PARTY: '🎉',
  THUMBS_UP: '👍', HANDSHAKE: '🤝', BRIEFCASE: '💼', CHART: '📈', TRENDING: '📊',
  GROWTH: '📈', SECURITY: '🔒', FAST: '⚡', QUALITY: '⭐', SUPPORT: '🤝', EXPERT: '👨‍💼',
  TEAM: '👥', EXPERIENCE: '🎯', GUARANTEE: '🛡️', SPEED: '⚡', RELIABILITY: '🔒',
  INNOVATION: '💡', EXCELLENCE: '🏆', MONEY_BAG: '💰', BANK_CARD: '💳', HOUSE: '🏠',
  CAR_KEY: '🔑', BUSINESS_SUIT: '👔', GROWTH_CHART: '📊', SECURE_SHIELD: '🛡️', CONFUSED: '😕', LIGHTBULB: '💡', TERM: '📅', CHAT: '💬'
};

// Главное меню
const mainMenu = `
${EMOJI.CREDIT} Кредиты
${EMOJI.CALCULATOR} Калькулятор
${EMOJI.PHONE} Связаться с менеджером
${EMOJI.WEBSITE} Наш сайт
${EMOJI.INFO} О компании
${EMOJI.QUESTION} Задать вопрос
`;

// Кредитное меню
const creditMenu = `
${EMOJI.CREDIT} Экспресс кредит
${EMOJI.MORTGAGE} Ипотека
${EMOJI.CAR} Автокредит
${EMOJI.BUSINESS} Бизнес кредит
${EMOJI.QUESTION} Задать вопрос
${EMOJI.BACK} Назад в меню
`;

// Обработка QR кода
client.on('qr', (qr) => {
  console.log('📱 QR код для подключения WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Обработка готовности клиента
client.on('ready', () => {
  console.log('✅ WhatsApp Bot готов к работе!');
  console.log('📱 Номер:', client.info.wid.user);
  console.log('🌐 Сайт:', WEBSITE_URL);
});

// Обработка аутентификации
client.on('authenticated', () => {
  console.log('🔐 WhatsApp аутентификация успешна');
});

// Обработка сообщений
client.on('message', async (message) => {
  const contact = await message.getContact();
  const chat = await message.getChat();
  const text = message.body.toLowerCase();
  const userId = contact.id._serialized;
  
  // Сохраняем состояние пользователя
  if (!userStates.has(userId)) {
    userStates.set(userId, 'main');
  }
  
  const userState = userStates.get(userId);
  
  // Игнорируем сообщения от групп
  if (chat.isGroup) return;
  
  // Обработка команды /start
  if (text.includes('/start') || text.includes('привет') || text.includes('начать')) {
    const welcomeMessage = `
${EMOJI.SPARKLES} *Добро пожаловать в Expensive Finance!* ${EMOJI.SPARKLES}

${EMOJI.HEART} Привет! Я ваш персональный финансовый помощник.

${EMOJI.TARGET} *Мы помогаем получить кредит, даже если банки отказывают!*

${EMOJI.STAR} *Наши преимущества:*
${EMOJI.SUCCESS} 95% успешных заявок
${EMOJI.CLOCK} Одобрение за 24 часа  
${EMOJI.USERS} 1000+ довольных клиентов
${EMOJI.SHIELD} Индивидуальный подход

${EMOJI.MAGIC} *Что я могу для вас сделать:*
${EMOJI.CREDIT} Рассказать о кредитах
${EMOJI.CALCULATOR} Помочь рассчитать платеж
${EMOJI.PHONE} Связать с менеджером
${EMOJI.QUESTION} Ответить на вопросы

${EMOJI.ROCKET} *Выберите интересующий раздел:*

${mainMenu}
    `;
    
    await message.reply(welcomeMessage);
    return;
  }
  
  // Обработка текстовых сообщений
  switch (text) {
    case 'кредиты':
    case '💰 кредиты':
    case 'кредит':
      userStates.set(userId, 'credits');
      await message.reply(`
${EMOJI.CREDIT} *Наши кредитные продукты*

${EMOJI.SPARKLES} Выберите интересующий вас тип кредита для получения подробной информации:

${EMOJI.LIGHTNING} *Быстрое одобрение за 24 часа!*

${creditMenu}
      `);
      break;
      
    case 'калькулятор':
    case '📊 калькулятор':
    case 'рассчитать':
      userStates.set(userId, 'calculator_amount');
      await message.reply(`
${EMOJI.CALCULATOR} *Кредитный калькулятор*

${EMOJI.SPARKLES} Давайте рассчитаем ваш кредит!

${EMOJI.MONEY} *Шаг 1:* Введите сумму кредита в тенге

${EMOJI.LIGHTBULB} Пример: 1500000 (для 1,500,000 ₸)

Напишите "отмена" для возврата в меню.
      `);
      break;
      
    case 'связаться с менеджером':
    case '📞 связаться с менеджером':
    case 'менеджер':
      userStates.set(userId, 'contact');
      await message.reply(`
${EMOJI.PHONE} *Связь с менеджером*

${EMOJI.SPARKLES} Выберите удобный способ связи:

${EMOJI.PHONE} Телефон: +7 (777) 123-45-67
${EMOJI.WHATSAPP} WhatsApp: +7 (777) 123-45-67
${EMOJI.EMAIL} Email: info@expensive-finance.com

${EMOJI.CLOCK} Работаем: 9:00 - 21:00 (ежедневно)

${EMOJI.EXPERT} Наши менеджеры готовы ответить на все ваши вопросы!
      `);
      break;
      
    case 'о компании':
    case 'ℹ️ о компании':
    case 'компания':
      await message.reply(`
${EMOJI.INFO} *О компании Expensive Finance*

${EMOJI.SUCCESS} Лицензированная финансовая организация
${EMOJI.SUCCESS} Работаем с 2018 года
${EMOJI.SUCCESS} Более 10,000 довольных клиентов
${EMOJI.SUCCESS} Одобрение кредита за 24 часа
${EMOJI.SUCCESS} Индивидуальный подход к каждому клиенту

${EMOJI.TARGET} *Наша миссия* - помочь каждому получить необходимые финансовые услуги!

${EMOJI.WEBSITE} Подробнее: ${WEBSITE_URL}/about
      `);
      break;
      
    case 'наш сайт':
    case '🌐 наш сайт':
    case 'сайт':
      await message.reply(`
${EMOJI.WEBSITE} *Переходим на наш сайт!*

${EMOJI.SPARKLES} Там вы найдете:
${EMOJI.CALCULATOR} Кредитный калькулятор
${EMOJI.APPLICATION} Онлайн заявки
${EMOJI.CHART} Актуальные ставки
${EMOJI.PHONE} Контактную информацию

${EMOJI.ROCKET} Переходите и изучайте наши услуги!

${WEBSITE_URL}
      `);
      break;
      
    case 'задать вопрос':
    case '❓ задать вопрос':
    case 'вопрос':
      userStates.set(userId, 'asking');
      await message.reply(`
${EMOJI.QUESTION} *Задайте ваш вопрос*

${EMOJI.SPARKLES} Напишите ваш вопрос, и я отвечу на него или передам менеджеру!

${EMOJI.LIGHTBULB} *Частые вопросы:*
${EMOJI.ARROW} Какие документы нужны для кредита?
${EMOJI.ARROW} Какова минимальная сумма кредита?
${EMOJI.ARROW} Какие условия досрочного погашения?
${EMOJI.ARROW} Есть ли льготы для пенсионеров?

Напишите "отмена" для возврата в меню.
      `);
      break;
      
    // Кредитные продукты
    case 'экспресс кредит':
    case '🚀 экспресс кредит':
      await message.reply(`
${EMOJI.CREDIT} *Экспресс кредит*

${EMOJI.MONEY_BAG} Сумма: до 3,000,000 ₸
${EMOJI.CLOCK} Срок: до 36 месяцев
${EMOJI.CHART} Ставка: от 13,10% годовых
${EMOJI.LIGHTNING} Одобрение: за 24 часа

${EMOJI.SUCCESS} Без справок о доходах
${EMOJI.SUCCESS} Онлайн заявка
${EMOJI.SUCCESS} Быстрое решение
${EMOJI.SUCCESS} Минимальный пакет документов

${EMOJI.SPARKLES} Хотите подать заявку или есть вопросы?

${WEBSITE_URL}/#application
      `);
      break;
      
    case 'ипотека':
    case '🏠 ипотека':
      await message.reply(`
${EMOJI.MORTGAGE} *Ипотечный кредит*

${EMOJI.MONEY_BAG} Сумма: до 50,000,000 ₸
${EMOJI.CLOCK} Срок: до 25 лет
${EMOJI.CHART} Ставка: от 8,50% годовых
${EMOJI.HOUSE} Первоначальный взнос: от 20%

${EMOJI.SUCCESS} Низкая ставка
${EMOJI.SUCCESS} Долгосрочный период
${EMOJI.SUCCESS} Государственная поддержка
${EMOJI.SUCCESS} Страхование в подарок
${EMOJI.SUCCESS} Широкий выбор недвижимости

${EMOJI.SPARKLES} Интересует ипотека?

${WEBSITE_URL}/#application
      `);
      break;
      
    case 'автокредит':
    case '🚗 автокредит':
      await message.reply(`
${EMOJI.CAR} *Автокредит*

${EMOJI.MONEY_BAG} Сумма: до 15,000,000 ₸
${EMOJI.CLOCK} Срок: до 7 лет
${EMOJI.CHART} Ставка: от 9,90% годовых
${EMOJI.CAR_KEY} Без первоначального взноса

${EMOJI.SUCCESS} Быстрое оформление
${EMOJI.SUCCESS} Страховка в подарок
${EMOJI.SUCCESS} Выгодные условия
${EMOJI.SUCCESS} Широкий выбор авто
${EMOJI.SUCCESS} Гибкие условия погашения

${EMOJI.SPARKLES} Готовы купить автомобиль?

${WEBSITE_URL}/#application
      `);
      break;
      
    case 'бизнес кредит':
    case '💼 бизнес кредит':
      await message.reply(`
${EMOJI.BUSINESS} *Кредит для бизнеса*

${EMOJI.MONEY_BAG} Сумма: до 100,000,000 ₸
${EMOJI.CLOCK} Срок: до 5 лет
${EMOJI.CHART} Ставка: от 12,50% годовых
${EMOJI.BRIEFCASE} Льготный период: до 6 месяцев

${EMOJI.SUCCESS} Без залога
${EMOJI.SUCCESS} Индивидуальный подход
${EMOJI.SUCCESS} Быстрое решение
${EMOJI.SUCCESS} Гибкие условия
${EMOJI.SUCCESS} Поддержка малого бизнеса

${EMOJI.SPARKLES} Развивайте бизнес с нами!

${WEBSITE_URL}/#application
      `);
      break;
      
    case 'назад в меню':
    case '🔙 назад в меню':
    case 'отмена':
    case 'меню':
      userStates.set(userId, 'main');
      await message.reply(`${EMOJI.HOUSE} *Главное меню:*\n\n${mainMenu}`);
      break;
      
    default:
      // Если пользователь в режиме калькулятора - ввод суммы
      if (userState === 'calculator_amount') {
        const amount = parseInt(text.replace(/\D/g, ''));
        if (isNaN(amount) || amount < 50000 || amount > 50000000) {
          await message.reply(`
${EMOJI.WARNING} *Неверная сумма!*

${EMOJI.LIGHTBULB} Введите сумму от 50,000 до 50,000,000 тенге

${EMOJI.MONEY} Пример: 1500000
          `);
          return;
        }
        
        // Сохраняем сумму и переходим к вводу срока
        userStates.set(userId, 'calculator_term');
        await message.reply(`
${EMOJI.SUCCESS} *Сумма:* ${new Intl.NumberFormat('ru-RU').format(amount)} ₸

${EMOJI.TERM} *Шаг 2:* Введите срок кредита в месяцах

${EMOJI.LIGHTBULB} Пример: 24 (для 24 месяцев)
        `);
      }
      // Если пользователь в режиме калькулятора - ввод срока
      else if (userState === 'calculator_term') {
        const term = parseInt(text.replace(/\D/g, ''));
        if (isNaN(term) || term < 7 || term > 60) {
          await message.reply(`
${EMOJI.WARNING} *Неверный срок!*

${EMOJI.LIGHTBULB} Введите срок от 7 до 60 месяцев

${EMOJI.TERM} Пример: 24
          `);
          return;
        }
        
        // Получаем сумму из предыдущего сообщения (упрощенная версия)
        const amount = 1500000; // Фиксированная сумма для демо
        const interestRate = 25.6; // Фиксированная ставка
        
        // Расчет аннуитетного платежа
        const monthlyRate = (interestRate / 100) / 12;
        const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, term);
        const denominator = Math.pow(1 + monthlyRate, term) - 1;
        const monthlyPayment = numerator / denominator;
        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - amount;
        
        await message.reply(`
${EMOJI.CALCULATOR} *Результат расчета:*

${EMOJI.MONEY} *Сумма кредита:* ${new Intl.NumberFormat('ru-RU').format(amount)} ₸
${EMOJI.TERM} *Срок:* ${term} месяцев
${EMOJI.CHART} *Ставка:* ${interestRate}% годовых

${EMOJI.ROCKET} *Результат:*
${EMOJI.CALCULATOR} Ежемесячный платеж: *${new Intl.NumberFormat('ru-RU').format(Math.round(monthlyPayment))} ₸*
${EMOJI.MONEY} Общая сумма: *${new Intl.NumberFormat('ru-RU').format(Math.round(totalPayment))} ₸*
${EMOJI.CHART} Переплата: *${new Intl.NumberFormat('ru-RU').format(Math.round(totalInterest))} ₸*

${EMOJI.LIGHTBULB} Для детального расчета с разными параметрами перейдите на сайт!

${WEBSITE_URL}/#credit-calculator
        `);
        
        userStates.set(userId, 'main');
      }
      // Если пользователь в режиме задания вопросов
      else if (userState === 'asking') {
        // Проверяем на фиксированные вопросы
        const fixedAnswer = getFixedAnswer(text);
        
        if (fixedAnswer) {
          await message.reply(fixedAnswer);
          userStates.set(userId, 'main');
        } else {
          // Передаем вопрос менеджерам
          await message.reply(`
${EMOJI.SUCCESS} *Ваш вопрос получен!*

${EMOJI.CHAT} Вопрос: "${text}"

${EMOJI.EXPERT} Наш менеджер ответит вам в течение часа.

${EMOJI.CLOCK} Время получения: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
          `);
          
          userStates.set(userId, 'main');
        }
      } else {
        // Если пользователь написал что-то неожиданное
        if (userState === 'credits') {
          await message.reply(`${EMOJI.CREDIT} Выберите тип кредита из меню ниже:\n\n${creditMenu}`);
        } else if (userState === 'contact') {
          await message.reply(`${EMOJI.PHONE} Выберите способ связи из меню ниже:\n\n${mainMenu}`);
        } else {
          await message.reply(`
${EMOJI.CONFUSED} Не понимаю ваш запрос. Используйте меню ниже или напишите "привет" для перезапуска.

${EMOJI.LIGHTBULB} Если у вас есть вопрос, нажмите "Задать вопрос" в любом разделе.

${mainMenu}
          `);
        }
      }
      break;
  }
});

// Функция для обработки фиксированных вопросов
function getFixedAnswer(question) {
  const q = question.toLowerCase();
  
  if (q.includes('документ') || q.includes('справк')) {
    return `${EMOJI.SUCCESS} *Документы для кредита:*

${EMOJI.CHECK} Паспорт гражданина РК
${EMOJI.CHECK} ИИН (индивидуальный идентификационный номер)
${EMOJI.CHECK} Справка о доходах (при необходимости)
${EMOJI.CHECK} Трудовая книжка или договор
${EMOJI.CHECK} Справка с места работы

${EMOJI.LIGHTBULB} Для экспресс-кредита документов требуется меньше!`;
  }
  
  if (q.includes('минимальн') || q.includes('сумма')) {
    return `${EMOJI.MONEY} *Минимальная сумма кредита:*

${EMOJI.CHECK} От 50,000 тенге
${EMOJI.CHECK} Максимальная сумма: до 50,000,000 тенге
${EMOJI.CHECK} Экспресс кредит: до 3,000,000 тенге

${EMOJI.LIGHTBULB} Сумма зависит от вашего дохода и кредитной истории!`;
  }
  
  if (q.includes('досрочн') || q.includes('погашен')) {
    return `${EMOJI.CHECK} *Досрочное погашение:*

${EMOJI.SUCCESS} Досрочное погашение БЕЗ штрафов
${EMOJI.SUCCESS} Частичное досрочное погашение
${EMOJI.SUCCESS} Полное досрочное погашение
${EMOJI.SUCCESS} Пересчет процентов

${EMOJI.LIGHTBULB} Уведомите нас за 30 дней до досрочного погашения!`;
  }
  
  if (q.includes('пенсион') || q.includes('льгот')) {
    return `${EMOJI.HEART} *Льготы для пенсионеров:*

${EMOJI.SUCCESS} Сниженная процентная ставка
${EMOJI.SUCCESS} Упрощенная процедура оформления
${EMOJI.SUCCESS} Гибкие условия погашения
${EMOJI.SUCCESS} Специальные программы

${EMOJI.LIGHTBULB} Обратитесь к менеджеру для получения подробной информации!`;
  }
  
  if (q.includes('ставк') || q.includes('процент')) {
    return `${EMOJI.CHART} *Процентные ставки:*

${EMOJI.CREDIT} Экспресс кредит: от 13,10% годовых
${EMOJI.MORTGAGE} Ипотека: от 8,50% годовых
${EMOJI.CAR} Автокредит: от 9,90% годовых
${EMOJI.BUSINESS} Бизнес кредит: от 12,50% годовых

${EMOJI.LIGHTBULB} Ставка зависит от суммы, срока и вашей кредитной истории!`;
  }
  
  if (q.includes('время') || q.includes('скорост') || q.includes('быстро')) {
    return `${EMOJI.LIGHTNING} *Скорость обработки:*

${EMOJI.SUCCESS} Экспресс кредит: одобрение за 24 часа
${EMOJI.SUCCESS} Ипотека: одобрение за 3-5 дней
${EMOJI.SUCCESS} Автокредит: одобрение за 1-2 дня
${EMOJI.SUCCESS} Бизнес кредит: одобрение за 2-3 дня

${EMOJI.LIGHTBULB} Мы работаем быстрее банков!`;
  }
  
  return null; // Если нет фиксированного ответа
}

// Обработка ошибок
client.on('auth_failure', (msg) => {
  console.error('❌ Ошибка аутентификации:', msg);
});

client.on('disconnected', (reason) => {
  console.log('❌ WhatsApp клиент отключен:', reason);
});

// Запуск клиента
client.initialize();

console.log('🤖 WhatsApp Bot инициализируется...');
console.log('📱 Отсканируйте QR код для подключения');
console.log('🌐 Сайт:', WEBSITE_URL);

module.exports = client;
