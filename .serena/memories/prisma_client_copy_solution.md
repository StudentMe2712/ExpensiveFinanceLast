# Решение проблемы Prisma client для подпроектов

## Проблема
Ошибка: `@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.`

## Решение
Скопировать сгенерированный Prisma client из корневой директории в подпроект:

```bash
# Из директории подпроекта
xcopy ..\node_modules\.prisma node_modules\.prisma /E /I /Y
```

## Архитектура
- Prisma схема: только в корневой директории
- Prisma client: генерируется в корневой директории
- Подпроекты: используют скопированный client
- Подключение: `require('../node_modules/@prisma/client')`

## Результат
Все подпроекты (telegram-client-bot, etc.) работают с единой Prisma схемой через скопированный client.