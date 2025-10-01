# Vercel Deployment Configuration

## Переменные окружения для Vercel

После успешного деплоя на Vercel необходимо настроить переменные окружения в панели управления Vercel:

### 1. Перейдите в настройки проекта
- Откройте проект в Vercel Dashboard
- Перейдите в Settings → Environment Variables

### 2. Добавьте следующие переменные:

#### База данных
```
DATABASE_URL=postgresql://neondb_owner:npg_2NCTrVw3RPaj@ep-dark-tooth-adac7ukk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### Telegram Bot Configuration
```
TELEGRAM_BOT_TOKEN=8275935313:AAEJ6O8HN_6r6X-XRzzRpuWwb8jC883yn8o
TELEGRAM_CHAT_ID=549168650
TELEGRAM_CLIENT_BOT_TOKEN=7062627252:AAHhocIpcumSYXFne2Qjrf6ZZJhmHdmdEJI
```

#### WhatsApp Bot Configuration
```
WHATSAPP_SESSION_PATH=./whatsapp-sessions
WHATSAPP_ADMIN_PHONE=+77771234567
WHATSAPP_CLIENT_PHONE=+77771234568
```

#### Next.js Configuration
```
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=https://expensive-finance-last-ieap.vercel.app
```

#### JWT Configuration
```
JWT_SECRET=your-jwt-secret-key-here-change-in-production
```

#### Email Configuration (опционально)
```
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
ADMIN_EMAIL=
```

### 3. Настройка окружений
Установите переменные для всех окружений:
- **Production** - для продакшена
- **Preview** - для preview веток
- **Development** - для локальной разработки

### 4. Пересборка проекта
После добавления переменных:
- Перейдите в Deployments
- Нажмите "Redeploy" на последнем деплое
- Или сделайте новый коммит для автоматической пересборки

## Проверка работоспособности

### 1. Проверьте основные страницы:
- Главная: `https://expensive-finance-last-ieap.vercel.app`
- О компании: `https://expensive-finance-last-ieap.vercel.app/about`
- Услуги: `https://expensive-finance-last-ieap.vercel.app/services`
- Админ-панель: `https://expensive-finance-last-ieap.vercel.app/admin`

### 2. Проверьте API endpoints:
- Заявки: `https://expensive-finance-last-ieap.vercel.app/api/applications`
- Аутентификация: `https://expensive-finance-last-ieap.vercel.app/api/auth/me`
- WhatsApp: `https://expensive-finance-last-ieap.vercel.app/api/whatsapp`

### 3. Проверьте локализацию:
- Русский: `https://expensive-finance-last-ieap.vercel.app/?lang=ru`
- Казахский: `https://expensive-finance-last-ieap.vercel.app/?lang=kk`

## Возможные проблемы

### 1. Ошибки базы данных
- Убедитесь, что DATABASE_URL корректный
- Проверьте подключение к Neon PostgreSQL
- Убедитесь, что миграции применены

### 2. Ошибки аутентификации
- Проверьте NEXTAUTH_SECRET и JWT_SECRET
- Убедитесь, что NEXTAUTH_URL соответствует домену Vercel

### 3. Ошибки ботов
- Telegram боты работают независимо от Vercel
- WhatsApp боты требуют локального запуска
- API endpoints для уведомлений работают через Vercel

## Мониторинг

### 1. Логи Vercel
- Перейдите в Functions → View Function Logs
- Проверьте ошибки в реальном времени

### 2. Аналитика
- Используйте Vercel Analytics для отслеживания производительности
- Настройте мониторинг ошибок

### 3. Домен
- Настройте кастомный домен в Settings → Domains
- Обновите переменные окружения с новым доменом

## Безопасность

### 1. Секретные ключи
- Никогда не коммитьте секретные ключи в код
- Используйте только Environment Variables в Vercel
- Регулярно обновляйте секретные ключи

### 2. Доступы
- Ограничьте доступ к админ-панели
- Используйте сильные пароли для JWT_SECRET
- Настройте HTTPS (автоматически в Vercel)

## Поддержка

При возникновении проблем:
1. Проверьте логи в Vercel Dashboard
2. Убедитесь в правильности переменных окружения
3. Проверьте подключение к базе данных
4. Обратитесь к документации Vercel
5. Создайте issue в GitHub репозитории
