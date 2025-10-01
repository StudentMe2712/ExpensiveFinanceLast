# Полная система Expensive Finance настроена и запущена

## Архитектура системы

### 🤖 Боты
1. **Основной бот** (`@ExpensiveFinanceBot`)
   - Токен: `8275935313:AAEJ6O8HN_6r6X-XRzzRpuWwb8jC883yn8o`
   - Назначение: Получение заявок с сайта в группу разработчиков
   - Группа разработчиков: `-1002971250513`

2. **Клиентский бот** (`@ExpensiveFinanceClientbot`)
   - Токен: `7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI`
   - Назначение: Общение с клиентами, ответы на вопросы
   - Интеграция: Кнопка в footer сайта

### 🌐 Сайт (Next.js)
- URL: `http://localhost:3000`
- Функции:
  - Форма заявок → отправка в группу разработчиков
  - Кнопка "Задать вопрос боту" в footer
  - Кредитный калькулятор
  - Информация о компании

### 🗄️ База данных (Prisma + PostgreSQL)
- Схема: `prisma/schema.prisma`
- Клиент: Один в корне проекта
- Таблицы: `Application`, `User`, `BotMessage`

## Команды запуска

### Запуск всех сервисов одновременно:
```bash
npm run start:all
```

### Запуск отдельных сервисов:
```bash
npm run start:main-bot    # Основной бот
npm run start:client-bot # Клиентский бот
npm run dev             # Сайт
```

## Интеграция

### Заявки с сайта → Группа разработчиков
- Форма на сайте → API `/api/applications` → Telegram группа
- Сохранение в БД + уведомление в группу

### Клиенты → Клиентский бот
- Кнопка в footer сайта → `https://t.me/ExpensiveFinanceClientbot`
- Общение с ботом по вопросам компании

## Статус системы
- ✅ Все сервисы запущены
- ✅ Боты работают
- ✅ Сайт доступен (localhost:3000)
- ✅ База данных подключена
- ✅ Интеграция настроена

## Файлы системы
- `start-all.js` - Скрипт запуска всех сервисов
- `telegram-bot/index.js` - Основной бот
- `telegram-client-bot/enhanced-bot.js` - Клиентский бот
- `src/app/api/applications/route.ts` - API для заявок
- `src/components/Footer.tsx` - Footer с кнопкой бота