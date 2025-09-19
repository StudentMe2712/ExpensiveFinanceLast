const TelegramBot = require('node-telegram-bot-api');

// Конфигурация
const CLIENT_BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN || '7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI';
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://expensive-finance.vercel.app';
const ADMIN_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1002971250513';

// Создание клиентского бота
const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: true });

// Эмодзи для красивого оформления
const EMOJI = {
  MONEY: '💰', BANK: '🏦', CALCULATOR: '📊', PHONE: '📞', INFO: 'ℹ️', WEBSITE: '🌐',
  CREDIT: '🚀', MORTGAGE: '🏠', CAR: '🚗', BUSINESS: '💼', DEPOSIT: '📈', PREMIUM: '💎',
  TERM: '📅', REFILL: '🔄', QUESTION: '❓', BACK: '🔙', APPLICATION: '📋', CALL: '📞',
  WHATSAPP: '💬', EMAIL: '📧', SUCCESS: '✅', CLOCK: '⏰', SHIELD: '🛡️', USERS: '👥',
  ARROW: '➡️', STAR: '⭐', FIRE: '🔥', GIFT: '🎁', CHECK: '✅', WARNING: '⚠️',
  HEART: '❤️', DIAMOND: '💎', TROPHY: '🏆', ROCKET: '🚀', LIGHTNING: '⚡', TARGET: '🎯',
  MAGIC: '✨', CROWN: '👑', MEDAL: '🏅', GEM: '💎', SPARKLES: '✨', PARTY: '🎉',
  THUMBS_UP: '👍', HANDSHAKE: '🤝', BRIEFCASE: '💼', CHART: '📈', TRENDING: '📊',
  GROWTH: '📈', SECURITY: '🔒', FAST: '⚡', QUALITY: '⭐', SUPPORT: '🤝', EXPERT: '👨‍💼',
  TEAM: '👥', EXPERIENCE: '🎯', GUARANTEE: '🛡️', SPEED: '⚡', RELIABILITY: '🔒',
  INNOVATION: '💡', EXCELLENCE: '🏆', MONEY_BAG: '💰', BANK_CARD: '💳', HOUSE: '🏠',
  CAR_KEY: '🔑', BUSINESS_SUIT: '👔', GROWTH_CHART: '📊', SECURE_SHIELD: '🛡️'
};

// Состояния пользователей
const userStates = new Map();
const userData = new Map();

// Главное меню
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
  
  clientBot.sendMessage(chatId, welcomeMessage, { parse_mode: 'HTML', ...mainMenu });
  
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
        { parse_mode: 'HTML', ...creditMenu }
      );
      break;
      
    case `${EMOJI.BANK} Депозиты`:
      userStates.set(userId, 'deposits');
      clientBot.sendMessage(chatId, 
        `${EMOJI.BANK} <b>Наши депозитные продукты</b>\n\n${EMOJI.SPARKLES} Выберите интересующий вас тип депозита для получения подробной информации:\n\n${EMOJI.DIAMOND} <b>До 17,80% годовых!</b>`,
        { parse_mode: 'HTML', ...depositMenu }
      );
      break;
      
    case `${EMOJI.CALCULATOR} Калькулятор`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.CALCULATOR} <b>Кредитный калькулятор</b>\n\n${EMOJI.SPARKLES} Для точного расчета вашего кредита перейдите на наш сайт. Там вы найдете удобный калькулятор с интерактивными слайдерами!\n\n${EMOJI.WEBSITE} Ссылка: ${WEBSITE_URL}/#credit-calculator`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[
              { text: `${EMOJI.CALCULATOR} Открыть калькулятор`, url: `${WEBSITE_URL}/#credit-calculator` }
            ]]
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
        `${EMOJI.WEBSITE} <b>Добро пожаловать на наш сайт!</b>\n\n${EMOJI.SPARKLES} Там вы найдете:\n${EMOJI.CALCULATOR} Кредитный калькулятор\n${EMOJI.APPLICATION} Онлайн заявки\n${EMOJI.CHART} Актуальные ставки\n${EMOJI.PHONE} Контактную информацию\n${EMOJI.LIGHTBULB} Полезные статьи\n\n${EMOJI.ROCKET} Переходите и изучайте наши услуги!`,
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
      
    case `${EMOJI.STAR} Наши услуги`:
      userStates.set(userId, 'services');
      clientBot.sendMessage(chatId, 
        `${EMOJI.STAR} <b>Наши услуги</b>\n\n${EMOJI.SPARKLES} Полный спектр услуг для решения ваших финансовых вопросов. Мы работаем с любыми ситуациями и находим оптимальные решения.\n\n${EMOJI.ROCKET} Выберите интересующую услугу:`,
        { parse_mode: 'HTML', ...servicesMenu }
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
      
    // Депозитные продукты
    case `${EMOJI.DEPOSIT} Рахмет депозит`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.DEPOSIT} <b>Рахмет депозит</b>\n\n${EMOJI.MONEY_BAG} Минимальная сумма: 100,000 ₸\n${EMOJI.CLOCK} Срок: 3, 6, 12 месяцев\n${EMOJI.CHART} Ставка: до 17,80% годовых\n${EMOJI.DIAMOND} Пополняемый депозит\n\n${EMOJI.SUCCESS} Высокий процент\n${EMOJI.SUCCESS} Гибкие условия\n${EMOJI.SUCCESS} Надежная защита\n${EMOJI.SUCCESS} Ежемесячные выплаты\n${EMOJI.SUCCESS} Возможность пополнения\n\n${EMOJI.SPARKLES} Начните копить уже сегодня!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${EMOJI.APPLICATION} Открыть депозит`, url: `${WEBSITE_URL}/#application` }],
              [{ text: `${EMOJI.CALCULATOR} Рассчитать доход`, url: `${WEBSITE_URL}/#credit-calculator` }],
              [{ text: `${EMOJI.QUESTION} Задать вопрос`, callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    // Услуги
    case `${EMOJI.BRIEFCASE} Подготовка заявки`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.BRIEFCASE} <b>Подготовка заявки для банков</b>\n\n${EMOJI.SPARKLES} Помогаем правильно оформить все необходимые документы и заявки для максимальных шансов на одобрение.\n\n${EMOJI.SUCCESS} Анализ кредитной истории\n${EMOJI.SUCCESS} Подготовка справок о доходах\n${EMOJI.SUCCESS} Оформление заявки в банк\n${EMOJI.SUCCESS} Сопровождение процесса\n\n${EMOJI.EXPERT} Наши эксперты знают все тонкости банковских требований!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${EMOJI.APPLICATION} Заказать услугу`, url: `${WEBSITE_URL}/#application` }],
              [{ text: `${EMOJI.QUESTION} Задать вопрос`, callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case `${EMOJI.SHIELD} Плохая кредитная история`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.SHIELD} <b>Помощь клиентам с плохой кредитной историей</b>\n\n${EMOJI.SPARKLES} Специализируемся на работе с клиентами, у которых есть проблемы с кредитной историей.\n\n${EMOJI.SUCCESS} Восстановление кредитной истории\n${EMOJI.SUCCESS} Поиск банков с мягкими условиями\n${EMOJI.SUCCESS} Реструктуризация долгов\n${EMOJI.SUCCESS} Консультации по улучшению КИ\n\n${EMOJI.HEART} Мы верим, что каждый заслуживает второго шанса!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${EMOJI.APPLICATION} Заказать услугу`, url: `${WEBSITE_URL}/#application` }],
              [{ text: `${EMOJI.QUESTION} Задать вопрос`, callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case `${EMOJI.CHART} Консультации по одобрению`:
      clientBot.sendMessage(chatId, 
        `${EMOJI.CHART} <b>Консультации по повышению шансов на одобрение</b>\n\n${EMOJI.SPARKLES} Даём профессиональные советы по улучшению финансового положения и увеличению вероятности одобрения.\n\n${EMOJI.SUCCESS} Анализ финансового состояния\n${EMOJI.SUCCESS} Рекомендации по улучшению КИ\n${EMOJI.SUCCESS} Выбор оптимальных условий\n${EMOJI.SUCCESS} Стратегия подачи заявок\n\n${EMOJI.TARGET} Наша цель - ваш успех!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${EMOJI.APPLICATION} Заказать консультацию`, url: `${WEBSITE_URL}/#application` }],
              [{ text: `${EMOJI.QUESTION} Задать вопрос`, callback_data: 'ask_question' }]
            ]
          }
        }
      );
      break;
      
    case `${EMOJI.QUESTION} Задать вопрос`:
      userStates.set(userId, 'asking');
      clientBot.sendMessage(chatId, 
        `${EMOJI.QUESTION} <b>Задайте ваш вопрос</b>\n\n${EMOJI.SPARKLES} Напишите ваш вопрос, и я передам его нашему менеджеру. Мы ответим в течение часа!\n\n${EMOJI.LIGHTBULB} <b>Примеры вопросов:</b>\n${EMOJI.ARROW} Какие документы нужны для кредита?\n${EMOJI.ARROW} Какова минимальная сумма депозита?\n${EMOJI.ARROW} Какие условия досрочного погашения?\n${EMOJI.ARROW} Есть ли льготы для пенсионеров?`,
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
      // Если пользователь в режиме задавания вопросов
      if (userState === 'asking') {
        // Передаем вопрос менеджерам
        const questionMessage = `
${EMOJI.QUESTION} <b>Новый вопрос от клиента:</b>

${EMOJI.USER} <b>Клиент:</b> ${user.firstName} (@${user.username || 'без username'})
${EMOJI.ID} <b>ID:</b> ${userId}
${EMOJI.CHAT} <b>Вопрос:</b> ${text}
${EMOJI.CLOCK} <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}

${EMOJI.LIGHTBULB} Ответьте клиенту в личные сообщения или перезвоните.
        `;
        
        notifyAdmins(questionMessage);
        
        clientBot.sendMessage(chatId, 
          `${EMOJI.SUCCESS} <b>Ваш вопрос получен!</b>\n\n${EMOJI.CHAT} Вопрос: "${text}"\n\n${EMOJI.EXPERT} Наш менеджер ответит вам в течение часа.\n\n${EMOJI.CLOCK} Время получения: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}`,
          { parse_mode: 'HTML', ...mainMenu }
        );
        
        userStates.set(userId, 'main');
      } else {
        // Если пользователь написал что-то неожиданное
        if (userState === 'credits') {
          clientBot.sendMessage(chatId, `${EMOJI.CREDIT} Выберите тип кредита из меню ниже:`, creditMenu);
        } else if (userState === 'deposits') {
          clientBot.sendMessage(chatId, `${EMOJI.BANK} Выберите тип депозита из меню ниже:`, depositMenu);
        } else if (userState === 'services') {
          clientBot.sendMessage(chatId, `${EMOJI.STAR} Выберите услугу из меню ниже:`, servicesMenu);
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

console.log('🤖 Улучшенный клиентский Telegram Bot запущен и готов к работе!');
console.log('📱 Бот: @ExpensiveFinanceClientbot');
console.log('🌐 Сайт:', WEBSITE_URL);
console.log('👥 Админ группа:', ADMIN_CHAT_ID);

module.exports = clientBot;
