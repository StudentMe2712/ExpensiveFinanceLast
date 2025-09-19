const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Конфигурация
const CLIENT_BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN || '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://expensive-finance.vercel.app';
const ADMIN_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1002971250513'; // Группа для уведомлений

// Создание клиентского бота
const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: true });

// Эмодзи для красивого оформления
const EMOJI = {
  MONEY: '💰',
  BANK: '🏦',
  CALCULATOR: '📊',
  PHONE: '📞',
  INFO: 'ℹ️',
  WEBSITE: '🌐',
  CREDIT: '🚀',
  MORTGAGE: '🏠',
  CAR: '🚗',
  BUSINESS: '💼',
  DEPOSIT: '📈',
  PREMIUM: '💎',
  TERM: '📅',
  REFILL: '🔄',
  QUESTION: '❓',
  BACK: '🔙',
  APPLICATION: '📋',
  CALL: '📞',
  WHATSAPP: '💬',
  EMAIL: '📧',
  SUCCESS: '✅',
  CLOCK: '⏰',
  SHIELD: '🛡️',
  USERS: '👥',
  ARROW: '➡️',
  STAR: '⭐',
  FIRE: '🔥',
  GIFT: '🎁',
  CHECK: '✅',
  WARNING: '⚠️',
  HEART: '❤️',
  DIAMOND: '💎',
  TROPHY: '🏆',
  ROCKET: '🚀',
  LIGHTNING: '⚡',
  TARGET: '🎯',
  MAGIC: '✨',
  CROWN: '👑',
  MEDAL: '🏅',
  GEM: '💎',
  SPARKLES: '✨',
  PARTY: '🎉',
  THUMBS_UP: '👍',
  HANDSHAKE: '🤝',
  BRIEFCASE: '💼',
  CHART: '📈',
  TRENDING: '📊',
  GROWTH: '📈',
  SECURITY: '🔒',
  FAST: '⚡',
  QUALITY: '⭐',
  SUPPORT: '🤝',
  EXPERT: '👨‍💼',
  TEAM: '👥',
  EXPERIENCE: '🎯',
  GUARANTEE: '🛡️',
  SPEED: '⚡',
  RELIABILITY: '🔒',
  INNOVATION: '💡',
  EXCELLENCE: '🏆'
};

// Состояния пользователей
const userStates = new Map();
const userData = new Map();

// Главное меню клиентского бота
const mainMenu = {
  reply_markup: {
    keyboard: [
      [`${EMOJI.CREDIT} Кредиты`, `${EMOJI.BANK} Депозиты`],
      [`${EMOJI.CALCULATOR} Калькулятор`, `${EMOJI.PHONE} Связаться с менеджером`],
      [`${EMOJI.INFO} О компании`, `${EMOJI.WEBSITE} Наш сайт`],
      [`${EMOJI.QUESTION} Задать вопрос`, `${EMOJI.STAR} Наши услуги`]
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

// Депозитное меню
const depositMenu = {
  reply_markup: {
    keyboard: [
      [`${EMOJI.DEPOSIT} Рахмет депозит`, `${EMOJI.PREMIUM} Премиум депозит`],
      [`${EMOJI.TERM} Срочный депозит`, `${EMOJI.REFILL} Пополняемый`],
      [`${EMOJI.QUESTION} Задать вопрос`, `${EMOJI.BACK} Назад в меню`]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Меню услуг
const servicesMenu = {
  reply_markup: {
    keyboard: [
      [`${EMOJI.BRIEFCASE} Подготовка заявки`, `${EMOJI.SHIELD} Плохая кредитная история`],
      [`${EMOJI.CHART} Консультации по одобрению`, `${EMOJI.QUESTION} Задать вопрос`],
      [`${EMOJI.BACK} Назад в меню`]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Меню вопросов
const questionMenu = {
  reply_markup: {
    keyboard: [
      [`${EMOJI.APPLICATION} Подать заявку`, `${EMOJI.CALL} Позвонить`],
      [`${EMOJI.WHATSAPP} WhatsApp`, `${EMOJI.BACK} Назад в меню`]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Обработка команды /start
clientBot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  const userId = msg.from.id;
  
  // Сохраняем данные пользователя
  userData.set(userId, {
    firstName: firstName,
    username: msg.from.username,
    chatId: chatId,
    joinedAt: new Date()
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
${EMOJI.CREDIT} Рассказать о кредитах и депозитах
${EMOJI.CALCULATOR} Помочь рассчитать платежи
${EMOJI.BRIEFCASE} Показать наши услуги
${EMOJI.PHONE} Связать с менеджером
${EMOJI.QUESTION} Ответить на вопросы

${EMOJI.ROCKET} <b>Выберите интересующий раздел:</b>
  `;
  
  clientBot.sendMessage(chatId, welcomeMessage, mainMenu);
  
  // Уведомляем администраторов о новом пользователе
  notifyAdmins(`🆕 Новый пользователь бота:\n👤 ${firstName} (@${msg.from.username || 'без username'})\n🆔 ID: ${userId}`);
});

// Обработка текстовых сообщений
clientBot.on('message', (msg) => {
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
        creditMenu
      );
      break;
      
    case '🏦 Депозиты':
      userStates.set(userId, 'deposits');
      clientBot.sendMessage(chatId, 
        `🏦 Наши депозитные продукты:\n\nВыберите интересующий вас тип депозита для получения подробной информации:`,
        depositMenu
      );
      break;
      
    case '📊 Калькулятор':
      clientBot.sendMessage(chatId, 
        `🧮 Кредитный калькулятор:\n\nДля точного расчета вашего кредита перейдите на наш сайт. Там вы найдете удобный калькулятор с интерактивными слайдерами!\n\n🌐 Ссылка: ${WEBSITE_URL}/#credit-calculator`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '🧮 Открыть калькулятор', url: `${WEBSITE_URL}/#credit-calculator` }
            ]]
          }
        }
      );
      break;
      
    case '📞 Связаться с менеджером':
      userStates.set(userId, 'contact');
      clientBot.sendMessage(chatId, 
        `📞 Связь с менеджером:\n\nВыберите удобный способ связи:\n\n📱 Телефон: +7 (777) 123-45-67\n💬 WhatsApp: +7 (777) 123-45-67\n📧 Email: info@expensive-finance.com\n\n🕐 Работаем: 9:00 - 21:00 (ежедневно)`,
        questionMenu
      );
      break;
      
    case 'ℹ️ О компании':
      clientBot.sendMessage(chatId, 
        `🏢 О компании Expensive Finance:\n\n✅ Лицензированная финансовая организация\n✅ Работаем с 2018 года\n✅ Более 10,000 довольных клиентов\n✅ Одобрение кредита за 24 часа\n✅ Индивидуальный подход к каждому клиенту\n\n🎯 Наша миссия - помочь каждому получить необходимые финансовые услуги!\n\n🌐 Подробнее: ${WEBSITE_URL}/about`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '🌐 Подробнее на сайте', url: `${WEBSITE_URL}/about` }
            ]]
          }
        }
      );
      break;
      
    case '🌐 Наш сайт':
      clientBot.sendMessage(chatId, 
        `🌐 Добро пожаловать на наш сайт!\n\nТам вы найдете:\n• 📊 Кредитный калькулятор\n• 📋 Онлайн заявки\n• 📈 Актуальные ставки\n• 📞 Контактную информацию\n• 💡 Полезные статьи\n\nПереходите и изучайте наши услуги!`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '🌐 Открыть сайт', url: WEBSITE_URL }
            ]]
          }
        }
      );
      break;
      
    // Кредитные продукты
    case '🚀 Экспресс кредит':
      clientBot.sendMessage(chatId, 
        `🚀 Экспресс кредит:\n\n💰 Сумма: до 3,000,000 ₸\n⏰ Срок: до 36 месяцев\n📊 Ставка: от 13,10% годовых\n⚡ Одобрение: за 24 часа\n\n✅ Без справок о доходах\n✅ Онлайн заявка\n✅ Быстрое решение\n✅ Минимальный пакет документов\n\n💡 Хотите подать заявку или есть вопросы?`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: '📋 Подать заявку', url: `${WEBSITE_URL}/#application` }],
              [{ text: '🧮 Рассчитать платеж', url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: '❓ Задать вопрос', callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case '🏠 Ипотека':
      clientBot.sendMessage(chatId, 
        `🏠 Ипотечный кредит:\n\n💰 Сумма: до 50,000,000 ₸\n⏰ Срок: до 25 лет\n📊 Ставка: от 8,50% годовых\n🏡 Первоначальный взнос: от 20%\n\n✅ Низкая ставка\n✅ Долгосрочный период\n✅ Государственная поддержка\n✅ Страхование в подарок\n✅ Широкий выбор недвижимости\n\n💡 Интересует ипотека?`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: '📋 Подать заявку', url: `${WEBSITE_URL}/#application` }],
              [{ text: '🧮 Рассчитать платеж', url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: '❓ Задать вопрос', callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case '🚗 Автокредит':
      clientBot.sendMessage(chatId, 
        `🚗 Автокредит:\n\n💰 Сумма: до 15,000,000 ₸\n⏰ Срок: до 7 лет\n📊 Ставка: от 9,90% годовых\n🚙 Без первоначального взноса\n\n✅ Быстрое оформление\n✅ Страховка в подарок\n✅ Выгодные условия\n✅ Широкий выбор авто\n✅ Гибкие условия погашения\n\n💡 Готовы купить автомобиль?`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: '📋 Подать заявку', url: `${WEBSITE_URL}/#application` }],
              [{ text: '🧮 Рассчитать платеж', url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: '❓ Задать вопрос', callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case '💼 Бизнес кредит':
      clientBot.sendMessage(chatId, 
        `💼 Кредит для бизнеса:\n\n💰 Сумма: до 100,000,000 ₸\n⏰ Срок: до 5 лет\n📊 Ставка: от 12,50% годовых\n💼 Льготный период: до 6 месяцев\n\n✅ Без залога\n✅ Индивидуальный подход\n✅ Быстрое решение\n✅ Гибкие условия\n✅ Поддержка малого бизнеса\n\n💡 Развивайте бизнес с нами!`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: '📋 Подать заявку', url: `${WEBSITE_URL}/#application` }],
              [{ text: '🧮 Рассчитать платеж', url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: '❓ Задать вопрос', callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    // Депозитные продукты
    case '📈 Рахмет депозит':
      clientBot.sendMessage(chatId, 
        `📈 Рахмет депозит:\n\n💰 Минимальная сумма: 100,000 ₸\n⏰ Срок: 3, 6, 12 месяцев\n📊 Ставка: до 17,80% годовых\n💎 Пополняемый депозит\n\n✅ Высокий процент\n✅ Гибкие условия\n✅ Надежная защита\n✅ Ежемесячные выплаты\n✅ Возможность пополнения\n\n💡 Начните копить уже сегодня!`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: '📋 Открыть депозит', url: `${WEBSITE_URL}/#application` }],
              [{ text: '🧮 Рассчитать доход', url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: '❓ Задать вопрос', callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case '❓ Задать вопрос':
      userStates.set(userId, 'asking');
      clientBot.sendMessage(chatId, 
        `❓ Задайте ваш вопрос:\n\nНапишите ваш вопрос, и я передам его нашему менеджеру. Мы ответим в течение часа!\n\n💡 Примеры вопросов:\n• Какие документы нужны для кредита?\n• Какова минимальная сумма депозита?\n• Какие условия досрочного погашения?\n• Есть ли льготы для пенсионеров?`,
        {
          reply_markup: {
            keyboard: [['🔙 Отмена']],
            resize_keyboard: true,
            one_time_keyboard: true
          }
        }
      );
      break;
      
    case '🔙 Отмена':
      userStates.set(userId, 'main');
      clientBot.sendMessage(chatId, '🏠 Главное меню:', mainMenu);
      break;
      
    case '🔙 Назад в меню':
      userStates.set(userId, 'main');
      clientBot.sendMessage(chatId, '🏠 Главное меню:', mainMenu);
      break;
      
    case '📋 Подать заявку':
      clientBot.sendMessage(chatId, 
        `📋 Подача заявки:\n\nДля подачи заявки перейдите на наш сайт. Там вы найдете удобную форму с валидацией и быстрой обработкой.\n\n🌐 Ссылка: ${WEBSITE_URL}/#application`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '📋 Подать заявку', url: `${WEBSITE_URL}/#application` }
            ]]
          }
        }
      );
      break;
      
    case '📞 Позвонить':
      clientBot.sendMessage(chatId, 
        `📞 Позвонить нам:\n\n📱 Телефон: +7 (777) 123-45-67\n🕐 Работаем: 9:00 - 21:00 (ежедневно)\n\n💡 Наши менеджеры готовы ответить на все ваши вопросы!`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '📞 Позвонить', url: 'tel:+77771234567' }
            ]]
          }
        }
      );
      break;
      
    case '💬 WhatsApp':
      clientBot.sendMessage(chatId, 
        `💬 WhatsApp:\n\nНапишите нам в WhatsApp для быстрого общения:\n\n📱 +7 (777) 123-45-67\n\n💡 Мы отвечаем в WhatsApp в течение 15 минут!`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '💬 Написать в WhatsApp', url: 'https://wa.me/77771234567?text=Здравствуйте! Меня интересуют ваши финансовые услуги.' }
            ]]
          }
        }
      );
      break;
      
    default:
      // Если пользователь в режиме задавания вопросов
      if (userState === 'asking') {
        // Передаем вопрос менеджерам
        const questionMessage = `
❓ Новый вопрос от клиента:

👤 Клиент: ${user.firstName} (@${user.username || 'без username'})
🆔 ID: ${userId}
💬 Вопрос: ${text}
🕐 Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}

💡 Ответьте клиенту в личные сообщения или перезвоните.
        `;
        
        notifyAdmins(questionMessage);
        
        clientBot.sendMessage(chatId, 
          `✅ Ваш вопрос получен!\n\n💬 Вопрос: "${text}"\n\n📞 Наш менеджер ответит вам в течение часа.\n\n🕐 Время получения: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}`,
          mainMenu
        );
        
        userStates.set(userId, 'main');
      } else {
        // Если пользователь написал что-то неожиданное
        if (userState === 'credits') {
          clientBot.sendMessage(chatId, 'Выберите тип кредита из меню ниже:', creditMenu);
        } else if (userState === 'deposits') {
          clientBot.sendMessage(chatId, 'Выберите тип депозита из меню ниже:', depositMenu);
        } else if (userState === 'contact') {
          clientBot.sendMessage(chatId, 'Выберите способ связи из меню ниже:', questionMenu);
        } else {
          clientBot.sendMessage(chatId, 
            `🤔 Не понимаю ваш запрос. Используйте меню ниже или напишите /start для перезапуска.\n\n💡 Если у вас есть вопрос, нажмите "❓ Задать вопрос" в любом разделе.`,
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
      `❓ Задайте ваш вопрос:\n\nНапишите ваш вопрос, и я передам его нашему менеджеру. Мы ответим в течение часа!`,
      {
        reply_markup: {
          keyboard: [['🔙 Отмена']],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      }
    );
  }
});

// Функция уведомления администраторов
async function notifyAdmins(message) {
  try {
    await clientBot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Ошибка отправки уведомления администраторам:', error);
  }
}

// Обработка ошибок
clientBot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

clientBot.on('error', (error) => {
  console.error('Client Bot error:', error);
});

console.log('🤖 Клиентский Telegram Bot запущен и готов к работе!');
console.log('📱 Бот: @ExpensiveFinanceClientBot');
console.log('🌐 Сайт:', WEBSITE_URL);
console.log('👥 Админ группа:', ADMIN_CHAT_ID);

module.exports = clientBot;
