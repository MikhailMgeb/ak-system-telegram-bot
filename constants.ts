export const TELEGRAM_API = "https://api.telegram.org";

export const WE_SHOP_CONFIG = {
  BASE_URL: "https://open.weshop.ai/api/v1",
  ENDPOINTS: {
    UPLOAD: "/image/upload",
    EDIT: "/image/edit",
    GENERATE: "/image/generate",
    STATUS: "/image/status",
  },
  MODELS: {
    EDIT: "weshop-v1",
    GENERATE: "weshop-v1",
  },
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FORMATS: ["jpg", "jpeg", "png", "webp"],
};

export const TELEGRAM_CONFIG = {
  MAX_CAPTION_LENGTH: 1024,
  PROCESSING_TIMEOUT: 60000, // 60 seconds
};

export const MESSAGES = {
  WELCOME: `Привет! 👋

Я бот для редактирования фотографий с помощью ИИ.

Отправьте мне фото и описание того, что хотите изменить!

Например: "убери фон" или "сделай небо голубым"`,

  HELP: `Доступные команды:

/start - Начать работу
/help - Показать помощь

Просто отправьте фото с описанием изменений!`,

  PROCESSING: "Обрабатываю фото... ⏳",
  SUCCESS: "Готово! ✨",
  SEND_PHOTO: `Хочешь отредактировать фото?!,
  Например, отправьте фото с подписью "убери фон" или "сделай ярче"`,
  ERROR: "Произошла ошибка при обработке фото. Попробуйте еще раз.",
  SEND_REPLY: "Фиг тебе!",
};
