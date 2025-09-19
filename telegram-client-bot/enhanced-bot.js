const TelegramBot = require('node-telegram-bot-api');
const ClientBotDatabase = require('./database');
require('dotenv').config();

// Конфигурация
const CLIENT_BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN || '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://expensive-finance.vercel.app';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_2NCTrVw3RPaj@ep-dark-tooth-adac7ukk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// Клиентский бот работает независимо, с интеграцией в базу данных

// Создание клиентского бота
const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { 
  polling: {
    interval: 1000,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

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

// Состояния пользователей
const userStates = new Map();
const userData = new Map();

// Функция для обработки фиксированных вопросов
function getFixedAnswer(question) {
  const q = question.toLowerCase();
  
  if (q.includes('документ') || q.includes('справк')) {
    return `${EMOJI.SUCCESS} <b>Документы для кредита:</b>\n\n${EMOJI.CHECK} Паспорт гражданина РК\n${EMOJI.CHECK} ИИН (индивидуальный идентификационный номер)\n${EMOJI.CHECK} Справка о доходах (при необходимости)\n${EMOJI.CHECK} Трудовая книжка или договор\n${EMOJI.CHECK} Справка с места работы\n\n${EMOJI.LIGHTBULB} Для экспресс-кредита документов требуется меньше!`;
  }
  
  if (q.includes('минимальн') || q.includes('сумма')) {
    return `${EMOJI.MONEY} <b>Минимальная сумма кредита:</b>\n\n${EMOJI.CHECK} От 50,000 тенге\n${EMOJI.CHECK} Максимальная сумма: до 50,000,000 тенге\n${EMOJI.CHECK} Экспресс кредит: до 3,000,000 тенге\n\n${EMOJI.LIGHTBULB} Сумма зависит от вашего дохода и кредитной истории!`;
  }
  
  if (q.includes('досрочн') || q.includes('погашен')) {
    return `${EMOJI.CHECK} <b>Досрочное погашение:</b>\n\n${EMOJI.SUCCESS} Досрочное погашение БЕЗ штрафов\n${EMOJI.SUCCESS} Частичное досрочное погашение\n${EMOJI.SUCCESS} Полное досрочное погашение\n${EMOJI.SUCCESS} Пересчет процентов\n\n${EMOJI.LIGHTBULB} Уведомите нас за 30 дней до досрочного погашения!`;
  }
  
  if (q.includes('пенсион') || q.includes('льгот')) {
    return `${EMOJI.HEART} <b>Льготы для пенсионеров:</b>\n\n${EMOJI.SUCCESS} Сниженная процентная ставка\n${EMOJI.SUCCESS} Упрощенная процедура оформления\n${EMOJI.SUCCESS} Гибкие условия погашения\n${EMOJI.SUCCESS} Специальные программы\n\n${EMOJI.LIGHTBULB} Обратитесь к менеджеру для получения подробной информации!`;
  }
  
  if (q.includes('ставк') || q.includes('процент')) {
    return `${EMOJI.CHART} <b>Процентные ставки:</b>\n\n${EMOJI.CREDIT} Экспресс кредит: от 13,10% годовых\n${EMOJI.MORTGAGE} Ипотека: от 8,50% годовых\n${EMOJI.CAR} Автокредит: от 9,90% годовых\n${EMOJI.BUSINESS} Бизнес кредит: от 12,50% годовых\n\n${EMOJI.LIGHTBULB} Ставка зависит от суммы, срока и вашей кредитной истории!`;
  }
  
  if (q.includes('время') || q.includes('скорост') || q.includes('быстро')) {
    return `${EMOJI.LIGHTNING} <b>Скорость обработки:</b>\n\n${EMOJI.SUCCESS} Экспресс кредит: одобрение за 24 часа\n${EMOJI.SUCCESS} Ипотека: одобрение за 3-5 дней\n${EMOJI.SUCCESS} Автокредит: одобрение за 1-2 дня\n${EMOJI.SUCCESS} Бизнес кредит: одобрение за 2-3 дня\n\n${EMOJI.LIGHTBULB} Мы работаем быстрее банков!`;
  }
  
  return null; // Если нет фиксированного ответа
}

// Главное меню
const mainMenu = {
  reply_markup: {
    keyboard: [
      [`${EMOJI.CREDIT} Кредиты`, `${EMOJI.CALCULATOR} Калькулятор`],
      [`${EMOJI.PHONE} Связаться с менеджером`, `${EMOJI.WEBSITE} Наш сайт`],
      [`${EMOJI.INFO} О компании`, `${EMOJI.QUESTION} Задать вопрос`]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Кредитное меню
const creditMenu = {
  reply_markup: {
    keyboard: [
      [`${EMOJI.CREDIT} Экспресс кредит`, `${EMOJI.MORTGAGE} Ипотека`],
      [`${EMOJI.CAR} Автокредит`, `${EMOJI.BUSINESS} Бизнес кредит`],
      [`${EMOJI.QUESTION} Задать вопрос`, `${EMOJI.BACK} Назад в меню`]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Меню для вопросов
const questionMenu = {
  reply_markup: {
    keyboard: [
      [`${EMOJI.CALL} Позвонить`, `${EMOJI.WHATSAPP} WhatsApp`],
      [`${EMOJI.EMAIL} Email`, `${EMOJI.BACK} Назад в меню`]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Обработка команды /stats (только для администраторов)
clientBot.onText(/\/stats/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Проверяем права администратора (можно настроить список ID)
  const adminIds = ['549168650']; // Ваш Telegram ID

  if (!adminIds.includes(userId.toString())) {
    clientBot.sendMessage(chatId, '❌ У вас нет прав для просмотра статистики');
    return;
  }

  try {
    const stats = await ClientBotDatabase.getBotStats();
    const recentActivity = await ClientBotDatabase.getRecentActivity(5);

    const statsMessage = `
📊 <b>Статистика клиентского бота</b>

👥 <b>Пользователи:</b>
• Всего: ${stats.totalUsers}
• Активных: ${stats.activeUsers}

❓ <b>Вопросы:</b>
• Всего: ${stats.totalQuestions}
• Автоответы: ${stats.fixedAnswers}
• Ручные: ${stats.manualAnswers}

📊 <b>Расчеты:</b>
• Всего: ${stats.totalCalculations}

🕐 <b>Последние активности:</b>
${recentActivity.questions.slice(0, 3).map(q =>
  `• ${q.user.firstName}: "${q.question.substring(0, 30)}..."`
).join('\n')}
    `;

    clientBot.sendMessage(chatId, statsMessage, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Ошибка получения статистики:', error);
    clientBot.sendMessage(chatId, '❌ Ошибка получения статистики');
  }
});

// Обработка команды /start
clientBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  const userId = msg.from.id;

  // Сохраняем данные пользователя в БД
  const dbUser = await ClientBotDatabase.createOrUpdateUser(msg.from);

  // Сохраняем данные пользователя в памяти
  userData.set(userId, {
    firstName: firstName,
    username: msg.from.username,
    chatId: chatId,
    joinedAt: new Date(),
    dbId: dbUser?.id // Store DB ID
  });

  const welcomeMessage = `
${EMOJI.SPARKLES} <b>Добро пожаловать в Expensive Finance!</b> ${EMOJI.SPARKLES}

${EMOJI.HEART} Привет, ${firstName}! Я ваш персональный финансовый помощник.

${EMOJI.TARGET} <b>Мы помогаем получить кредит, даже если банки отказывают!</b>

${EMOJI.STAR} <b>Наши преимущества:</b>
${EMOJI.SUCCESS} 95% успешных заявок
${EMOJI.CLOCK} Одобрение за 24 часа  
${EMOJI.USERS} 1000+ довольных клиентов
${EMOJI.SHIELD} Индивидуальный подход

${EMOJI.MAGIC} <b>Что я могу для вас сделать:</b>
${EMOJI.CREDIT} Рассказать о кредитах
${EMOJI.CALCULATOR} Помочь рассчитать платеж
${EMOJI.PHONE} Связать с менеджером
${EMOJI.QUESTION} Ответить на вопросы

${EMOJI.ROCKET} <b>Выберите интересующий раздел:</b>
  `;
  
  clientBot.sendMessage(chatId, welcomeMessage, { parse_mode: 'HTML', ...mainMenu });
});

// Обработка текстовых сообщений
clientBot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const userId = msg.from.id;
  
  // Сохраняем состояние пользователя
  if (!userStates.has(userId)) {
    userStates.set(userId, 'main');
  }
  
  const userState = userStates.get(userId);
  const user = userData.get(userId);
  
  switch (text) {
    case `${EMOJI.CREDIT} Кредиты`:
      userStates.set(userId, 'credits');
      clientBot.sendMessage(chatId, 
        `${EMOJI.CREDIT} <b>Наши кредитные продукты</b>\n\n${EMOJI.SPARKLES} Выберите интересующий вас тип кредита для получения подробной информации:\n\n${EMOJI.LIGHTNING} <b>Быстрое одобрение за 24 часа!</b>`,
        { parse_mode: 'HTML', ...creditMenu }
      );
      break;
      
    case `${EMOJI.CALCULATOR} Калькулятор`:
      userStates.set(userId, 'calculator_amount');
      clientBot.sendMessage(chatId, 
        `${EMOJI.CALCULATOR} <b>Кредитный калькулятор</b>\n\n${EMOJI.SPARKLES} Давайте рассчитаем ваш кредит!\n\n${EMOJI.MONEY} <b>Шаг 1:</b> Введите сумму кредита в тенге\n\n${EMOJI.LIGHTBULB} Пример: 1500000 (для 1,500,000 ₸)`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [[`${EMOJI.BACK} Отмена`]],
            resize_keyboard: true,
            one_time_keyboard: true
          }
        }
      );
      break;
      
    case `${EMOJI.PHONE} Связаться с менеджером`:
      userStates.set(userId, 'contact');
      clientBot.sendMessage(chatId, 
        `${EMOJI.PHONE} <b>Связь с менеджером</b>\n\n${EMOJI.SPARKLES} Выберите удобный способ связи:\n\n${EMOJI.PHONE} Телефон: +7 (777) 123-45-67\n${EMOJI.WHATSAPP} WhatsApp: +7 (777) 123-45-67\n${EMOJI.EMAIL} Email: info@expensive-finance.com\n\n${EMOJI.CLOCK} Работаем: 9:00 - 21:00 (ежедневно)`,
        { parse_mode: 'HTML', ...questionMenu }
      );
      break;
      
    case `${EMOJI.INFO} О компании`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.INFO} <b>О компании Expensive Finance</b>\n\n${EMOJI.SUCCESS} Лицензированная финансовая организация\n${EMOJI.SUCCESS} Работаем с 2018 года\n${EMOJI.SUCCESS} Более 10,000 довольных клиентов\n${EMOJI.SUCCESS} Одобрение кредита за 24 часа\n${EMOJI.SUCCESS} Индивидуальный подход к каждому клиенту\n\n${EMOJI.TARGET} <b>Наша миссия</b> - помочь каждому получить необходимые финансовые услуги!\n\n${EMOJI.WEBSITE} Подробнее: ${WEBSITE_URL}/about`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[
              { text: `${EMOJI.WEBSITE} Подробнее на сайте`, url: `${WEBSITE_URL}/about` }
            ]]
          }
        }
      );
      break;
      
    case `${EMOJI.WEBSITE} Наш сайт`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.WEBSITE} <b>Переходим на наш сайт!</b>\n\n${EMOJI.SPARKLES} Там вы найдете:\n${EMOJI.CALCULATOR} Кредитный калькулятор\n${EMOJI.APPLICATION} Онлайн заявки\n${EMOJI.CHART} Актуальные ставки\n${EMOJI.PHONE} Контактную информацию\n\n${EMOJI.ROCKET} Переходите и изучайте наши услуги!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[
              { text: `${EMOJI.WEBSITE} Открыть сайт`, url: WEBSITE_URL }
            ]]
          }
        }
      );
      break;
      
    // Кредитные продукты
    case `${EMOJI.CREDIT} Экспресс кредит`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.CREDIT} <b>Экспресс кредит</b>\n\n${EMOJI.MONEY_BAG} Сумма: до 3,000,000 ₸\n${EMOJI.CLOCK} Срок: до 36 месяцев\n${EMOJI.CHART} Ставка: от 13,10% годовых\n${EMOJI.LIGHTNING} Одобрение: за 24 часа\n\n${EMOJI.SUCCESS} Без справок о доходах\n${EMOJI.SUCCESS} Онлайн заявка\n${EMOJI.SUCCESS} Быстрое решение\n${EMOJI.SUCCESS} Минимальный пакет документов\n\n${EMOJI.SPARKLES} Хотите подать заявку или есть вопросы?`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${EMOJI.APPLICATION} Подать заявку`, url: `${WEBSITE_URL}/#application` }],
              [{ text: `${EMOJI.CALCULATOR} Рассчитать платеж`, url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: `${EMOJI.QUESTION} Задать вопрос`, callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case `${EMOJI.MORTGAGE} Ипотека`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.MORTGAGE} <b>Ипотечный кредит</b>\n\n${EMOJI.MONEY_BAG} Сумма: до 50,000,000 ₸\n${EMOJI.CLOCK} Срок: до 25 лет\n${EMOJI.CHART} Ставка: от 8,50% годовых\n${EMOJI.HOUSE} Первоначальный взнос: от 20%\n\n${EMOJI.SUCCESS} Низкая ставка\n${EMOJI.SUCCESS} Долгосрочный период\n${EMOJI.SUCCESS} Государственная поддержка\n${EMOJI.SUCCESS} Страхование в подарок\n${EMOJI.SUCCESS} Широкий выбор недвижимости\n\n${EMOJI.SPARKLES} Интересует ипотека?`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${EMOJI.APPLICATION} Подать заявку`, url: `${WEBSITE_URL}/#application` }],
              [{ text: `${EMOJI.CALCULATOR} Рассчитать платеж`, url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: `${EMOJI.QUESTION} Задать вопрос`, callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case `${EMOJI.CAR} Автокредит`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.CAR} <b>Автокредит</b>\n\n${EMOJI.MONEY_BAG} Сумма: до 15,000,000 ₸\n${EMOJI.CLOCK} Срок: до 7 лет\n${EMOJI.CHART} Ставка: от 9,90% годовых\n${EMOJI.CAR_KEY} Без первоначального взноса\n\n${EMOJI.SUCCESS} Быстрое оформление\n${EMOJI.SUCCESS} Страховка в подарок\n${EMOJI.SUCCESS} Выгодные условия\n${EMOJI.SUCCESS} Широкий выбор авто\n${EMOJI.SUCCESS} Гибкие условия погашения\n\n${EMOJI.SPARKLES} Готовы купить автомобиль?`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${EMOJI.APPLICATION} Подать заявку`, url: `${WEBSITE_URL}/#application` }],
              [{ text: `${EMOJI.CALCULATOR} Рассчитать платеж`, url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: `${EMOJI.QUESTION} Задать вопрос`, callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case `${EMOJI.BUSINESS} Бизнес кредит`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.BUSINESS} <b>Кредит для бизнеса</b>\n\n${EMOJI.MONEY_BAG} Сумма: до 100,000,000 ₸\n${EMOJI.CLOCK} Срок: до 5 лет\n${EMOJI.CHART} Ставка: от 12,50% годовых\n${EMOJI.BRIEFCASE} Льготный период: до 6 месяцев\n\n${EMOJI.SUCCESS} Без залога\n${EMOJI.SUCCESS} Индивидуальный подход\n${EMOJI.SUCCESS} Быстрое решение\n${EMOJI.SUCCESS} Гибкие условия\n${EMOJI.SUCCESS} Поддержка малого бизнеса\n\n${EMOJI.SPARKLES} Развивайте бизнес с нами!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${EMOJI.APPLICATION} Подать заявку`, url: `${WEBSITE_URL}/#application` }],
              [{ text: `${EMOJI.CALCULATOR} Рассчитать платеж`, url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: `${EMOJI.QUESTION} Задать вопрос`, callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case `${EMOJI.QUESTION} Задать вопрос`:
      userStates.set(userId, 'asking');
      clientBot.sendMessage(chatId, 
        `${EMOJI.QUESTION} <b>Задайте ваш вопрос</b>\n\n${EMOJI.SPARKLES} Напишите ваш вопрос, и я отвечу на него или передам менеджеру!\n\n${EMOJI.LIGHTBULB} <b>Частые вопросы:</b>\n${EMOJI.ARROW} Какие документы нужны для кредита?\n${EMOJI.ARROW} Какова минимальная сумма кредита?\n${EMOJI.ARROW} Какие условия досрочного погашения?\n${EMOJI.ARROW} Есть ли льготы для пенсионеров?`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [[`${EMOJI.BACK} Отмена`]],
            resize_keyboard: true,
            one_time_keyboard: true
          }
        }
      );
      break;
      
    case `${EMOJI.BACK} Отмена`:
      userStates.set(userId, 'main');
      clientBot.sendMessage(chatId, `${EMOJI.HOUSE} Главное меню:`, mainMenu);
      break;
      
    case `${EMOJI.BACK} Назад в меню`:
      userStates.set(userId, 'main');
      clientBot.sendMessage(chatId, `${EMOJI.HOUSE} Главное меню:`, mainMenu);
      break;
      
    case `${EMOJI.APPLICATION} Подать заявку`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.APPLICATION} <b>Подача заявки</b>\n\n${EMOJI.SPARKLES} Для подачи заявки перейдите на наш сайт. Там вы найдете удобную форму с валидацией и быстрой обработкой.\n\n${EMOJI.WEBSITE} Ссылка: ${WEBSITE_URL}/#application`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[
              { text: `${EMOJI.APPLICATION} Подать заявку`, url: `${WEBSITE_URL}/#application` }
            ]]
          }
        }
      );
      break;
      
    case `${EMOJI.CALL} Позвонить`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.CALL} <b>Позвонить нам</b>\n\n${EMOJI.PHONE} Телефон: +7 (777) 123-45-67\n${EMOJI.CLOCK} Работаем: 9:00 - 21:00 (ежедневно)\n\n${EMOJI.EXPERT} Наши менеджеры готовы ответить на все ваши вопросы!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[
              { text: `${EMOJI.CALL} Позвонить`, url: 'tel:+77771234567' }
            ]]
          }
        }
      );
      break;
      
    case `${EMOJI.WHATSAPP} WhatsApp`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.WHATSAPP} <b>WhatsApp</b>\n\n${EMOJI.SPARKLES} Напишите нам в WhatsApp для быстрого общения:\n\n${EMOJI.PHONE} +7 (777) 123-45-67\n\n${EMOJI.LIGHTNING} Мы отвечаем в WhatsApp в течение 15 минут!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[
              { text: `${EMOJI.WHATSAPP} Написать в WhatsApp`, url: 'https://wa.me/77771234567?text=Здравствуйте! Меня интересуют ваши финансовые услуги.' }
            ]]
          }
        }
      );
      break;
      
    default:
      // Если пользователь в режиме калькулятора - ввод суммы
      if (userState === 'calculator_amount') {
        const amount = parseInt(text.replace(/\D/g, ''));
        if (isNaN(amount) || amount < 50000 || amount > 50000000) {
          clientBot.sendMessage(chatId, 
            `${EMOJI.WARNING} <b>Неверная сумма!</b>\n\n${EMOJI.LIGHTBULB} Введите сумму от 50,000 до 50,000,000 тенге\n\n${EMOJI.MONEY} Пример: 1500000`,
            { parse_mode: 'HTML' }
          );
          return;
        }
        
        // Сохраняем сумму и переходим к вводу срока
        userData.set(userId, { amount });
        userStates.set(userId, 'calculator_term');
        
        clientBot.sendMessage(chatId, 
          `${EMOJI.SUCCESS} <b>Сумма:</b> ${new Intl.NumberFormat('ru-RU').format(amount)} ₸\n\n${EMOJI.TERM} <b>Шаг 2:</b> Введите срок кредита в месяцах\n\n${EMOJI.LIGHTBULB} Пример: 24 (для 24 месяцев)`,
          { parse_mode: 'HTML' }
        );
      }
      // Если пользователь в режиме калькулятора - ввод срока
      else if (userState === 'calculator_term') {
        const term = parseInt(text.replace(/\D/g, ''));
        if (isNaN(term) || term < 7 || term > 60) {
          clientBot.sendMessage(chatId, 
            `${EMOJI.WARNING} <b>Неверный срок!</b>\n\n${EMOJI.LIGHTBULB} Введите срок от 7 до 60 месяцев\n\n${EMOJI.TERM} Пример: 24`,
            { parse_mode: 'HTML' }
          );
          return;
        }
        
        // Получаем сумму и рассчитываем кредит
        const userCalcData = userData.get(userId);
        const amount = userCalcData.amount;
        const interestRate = 25.6; // Фиксированная ставка
        
        // Расчет аннуитетного платежа
        const monthlyRate = (interestRate / 100) / 12;
        const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, term);
        const denominator = Math.pow(1 + monthlyRate, term) - 1;
        const monthlyPayment = numerator / denominator;
        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - amount;
        
        // Сохраняем расчет в БД
        const user = userData.get(userId);
        if (user?.dbId) {
          await ClientBotDatabase.saveCalculation(
            user.dbId, 
            amount, 
            term, 
            interestRate, 
            monthlyPayment, 
            totalPayment, 
            totalInterest
          );
        }
        
        clientBot.sendMessage(chatId, 
          `${EMOJI.CALCULATOR} <b>Результат расчета:</b>\n\n${EMOJI.MONEY} <b>Сумма кредита:</b> ${new Intl.NumberFormat('ru-RU').format(amount)} ₸\n${EMOJI.TERM} <b>Срок:</b> ${term} месяцев\n${EMOJI.CHART} <b>Ставка:</b> ${interestRate}% годовых\n\n${EMOJI.ROCKET} <b>Результат:</b>\n${EMOJI.CALCULATOR} Ежемесячный платеж: <b>${new Intl.NumberFormat('ru-RU').format(Math.round(monthlyPayment))} ₸</b>\n${EMOJI.MONEY} Общая сумма: <b>${new Intl.NumberFormat('ru-RU').format(Math.round(totalPayment))} ₸</b>\n${EMOJI.CHART} Переплата: <b>${new Intl.NumberFormat('ru-RU').format(Math.round(totalInterest))} ₸</b>\n\n${EMOJI.LIGHTBULB} Для детального расчета с разными параметрами перейдите на сайт!`,
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: `${EMOJI.CALCULATOR} Детальный расчет`, url: `${WEBSITE_URL}/#credit-calculator` },
                  { text: `${EMOJI.APPLICATION} Подать заявку`, url: `${WEBSITE_URL}/#application` }
                ],
                [
                  { text: `${EMOJI.BACK} Назад в меню`, callback_data: 'back_to_main' }
                ]
              ]
            }
          }
        );
        
        userStates.set(userId, 'main');
        userData.delete(userId);
      }
      // Если пользователь в режиме задания вопросов
      else if (userState === 'asking') {
        // Проверяем на фиксированные вопросы
        const fixedAnswer = getFixedAnswer(text);
        const user = userData.get(userId);
        
        if (fixedAnswer) {
          // Сохраняем вопрос с фиксированным ответом в БД
          if (user?.dbId) {
            await ClientBotDatabase.saveQuestion(user.dbId, text, fixedAnswer, true);
          }
          
          clientBot.sendMessage(chatId, fixedAnswer, { parse_mode: 'HTML', ...mainMenu });
          userStates.set(userId, 'main');
        } else {
          // Сохраняем вопрос без ответа в БД
          if (user?.dbId) {
            await ClientBotDatabase.saveQuestion(user.dbId, text, null, false);
          }
          
          // Передаем вопрос менеджерам
          clientBot.sendMessage(chatId, 
            `${EMOJI.SUCCESS} <b>Ваш вопрос получен!</b>\n\n${EMOJI.CHAT} Вопрос: "${text}"\n\n${EMOJI.EXPERT} Наш менеджер ответит вам в течение часа.\n\n${EMOJI.CLOCK} Время получения: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}`,
            { parse_mode: 'HTML', ...mainMenu }
          );
          
          userStates.set(userId, 'main');
        }
      } else {
        // Если пользователь написал что-то неожиданное
        if (userState === 'credits') {
          clientBot.sendMessage(chatId, `${EMOJI.CREDIT} Выберите тип кредита из меню ниже:`, creditMenu);
        } else if (userState === 'contact') {
          clientBot.sendMessage(chatId, `${EMOJI.PHONE} Выберите способ связи из меню ниже:`, questionMenu);
        } else {
          clientBot.sendMessage(chatId, 
            `${EMOJI.CONFUSED} Не понимаю ваш запрос. Используйте меню ниже или напишите /start для перезапуска.\n\n${EMOJI.LIGHTBULB} Если у вас есть вопрос, нажмите "${EMOJI.QUESTION} Задать вопрос" в любом разделе.`,
            mainMenu
          );
        }
      }
      break;
  }
});

// Обработка callback запросов
clientBot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const data = callbackQuery.data;
  
  if (data === 'ask_question') {
    const userId = callbackQuery.from.id;
    userStates.set(userId, 'asking');
    
    clientBot.answerCallbackQuery(callbackQuery.id);
    clientBot.sendMessage(chatId, 
      `${EMOJI.QUESTION} <b>Задайте ваш вопрос:</b>\n\n${EMOJI.SPARKLES} Напишите ваш вопрос, и я передам его нашему менеджеру. Мы ответим в течение часа!`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: [[`${EMOJI.BACK} Отмена`]],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      }
    );
  } else if (data === 'back_to_main') {
    const userId = callbackQuery.from.id;
    userStates.set(userId, 'main');
    
    clientBot.answerCallbackQuery(callbackQuery.id);
    clientBot.sendMessage(chatId, 
      `${EMOJI.BACK} Возвращаемся в главное меню!`,
      mainMenu
    );
  }
});

// Клиентский бот работает как независимый чатбот

// Обработка ошибок
clientBot.on('polling_error', (error) => {
  console.error('❌ Polling error:', error.message);
  if (error.code === 'ETELEGRAM' && error.response?.statusCode === 404) {
    console.error('💥 Бот не найден или токен неверный!');
    console.error('🔧 Проверьте токен бота и убедитесь, что бот активен');
  }
});

clientBot.on('error', (error) => {
  console.error('❌ Client Bot error:', error.message);
});

// Обработка успешного запуска
clientBot.on('polling_error', (error) => {
  if (error.code === 'ETELEGRAM' && error.response?.statusCode === 404) {
    console.error('💥 Критическая ошибка: бот не найден!');
    process.exit(1);
  }
});

// Проверка подключения к БД при запуске
ClientBotDatabase.testConnection().then((connected) => {
  if (connected) {
    console.log('✅ База данных: подключена');
    
    // Проверяем информацию о боте
    clientBot.getMe().then((botInfo) => {
      console.log('🤖 Клиентский Telegram Bot запущен и готов к работе!');
      console.log(`📱 Бот: ${botInfo.first_name} (@${botInfo.username})`);
      console.log(`🆔 ID: ${botInfo.id}`);
      console.log('🌐 Сайт:', WEBSITE_URL);
      console.log('💬 Режим: Независимый чатбот для клиентов');
      console.log('🗄️ База данных: Подключена');
      console.log('🚀 Polling: активен');
    }).catch((error) => {
      console.error('❌ Ошибка получения информации о боте:', error.message);
    });
  } else {
    console.log('❌ Ошибка подключения к базе данных!');
    console.log('🤖 Бот запущен без интеграции с БД');
  }
});