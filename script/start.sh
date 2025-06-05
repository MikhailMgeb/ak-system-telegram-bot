#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Запуск Telegram бота для редактирования фото${NC}"

# Проверяем наличие .env файла
if [ ! -f .env ]; then
    echo -e "${RED}❌ Файл .env не найден!${NC}"
    echo -e "${YELLOW}📝 Создайте файл .env на основе .env.example${NC}"
    echo -e "${YELLOW}cp .env.example .env${NC}"
    exit 1
fi

# Проверяем переменные окружения
source .env

if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    echo -e "${RED}❌ TELEGRAM_BOT_TOKEN не установлен в .env${NC}"
    exit 1
fi

if [ -z "$WESHOP_API_KEY" ]; then
    echo -e "${RED}❌ WESHOP_API_KEY не установлен в .env${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Переменные окружения настроены${NC}"

# Устанавливаем зависимости если нужно
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Устанавливаем зависимости...${NC}"
    npm install
fi

# Запускаем в режиме разработки
echo -e "${GREEN}🏁 Запускаем бота в режиме разработки...${NC}"
npm run start:dev