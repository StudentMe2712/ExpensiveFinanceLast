# Правильная архитектура Prisma в проекте

## Принцип
- **Prisma находится ТОЛЬКО в корневой директории** (`/prisma/`)
- **Все компоненты подключаются к корневой Prisma** через относительные пути
- **Нет дублирования** Prisma схем

## Структура
```
expensive-finance/
├── prisma/                    # ← Единственная Prisma схема
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── node_modules/@prisma/client/  # ← Сгенерированный клиент
├── telegram-client-bot/
│   └── database.js            # ← require('../node_modules/@prisma/client')
└── src/                      # ← Основное приложение
```

## Подключение из подпроектов
```javascript
const { PrismaClient } = require('../node_modules/@prisma/client');
```

## Команды
- Генерация: `npx prisma generate` (из корня)
- Миграции: `npx prisma migrate dev` (из корня)
- Все компоненты используют одну схему