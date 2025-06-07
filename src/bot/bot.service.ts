import { Injectable, Logger } from '@nestjs/common';
import { Context } from 'telegraf';
import { InlineKeyboardMarkup, InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);
  
  // ==================== РАБОТА С ПОЛЬЗОВАТЕЛЯМИ ====================
  
  /**
   * Получает информацию о пользователе из контекста
   */
  getUserInfo(ctx: Context) {
    const user = ctx.from;
    return {
      id: user?.id,
      firstName: user?.first_name,
      lastName: user?.last_name,
      username: user?.username,
      languageCode: user?.language_code,
      isPremium: user?.is_premium || false,
    };
  }
  
  /**
   * Проверяет, является ли пользователь администратором
   */
  isAdmin(userId: number): boolean {
    const adminIds = process.env.ADMIN_IDS?.split(',').map(id => parseInt(id)) || [];
    return adminIds.includes(userId);
  }
  
  /**
   * Проверяет, есть ли у пользователя PRO подписка
   */
  async hasProSubscription(userId: number): Promise<boolean> {
    // Здесь должна быть логика проверки в базе данных
    // Пока возвращаем false для примера
    return false;
  }
  
  // ==================== ФОРМАТИРОВАНИЕ СООБЩЕНИЙ ====================
  
  /**
   * Форматирует приветственное сообщение
   */
  formatWelcomeMessage(userName?: string): string {
    const name = userName || 'Пользователь';
    return `👋 Добро пожаловать, ${name}!\n\nВыберите действие из меню ниже:`;
  }
  
  /**
   * Форматирует сообщение профиля
   */
  formatProfileMessage(userInfo: any): string {
    return `👤 Личный кабинет\n\n` +
      `👋 Имя: ${userInfo.firstName || 'Не указано'}\n` +
      `🆔 ID: ${userInfo.id}\n` +
      `📅 Регистрация: ${userInfo.registrationDate || 'сегодня'}\n` +
      `⭐ Статус: ${userInfo.isPro ? 'PRO' : 'Бесплатный'}\n` +
      `🎯 Очки: ${userInfo.points || 0}`;
  }
  
  /**
   * Форматирует сообщение о PRO подписке
   */
  formatProMessage(): string {
    return `⭐ PRO версия\n\n` +
      `Преимущества PRO:\n` +
      `✅ Безлимитные проекты\n` +
      `✅ Приоритетная поддержка\n` +
      `✅ Расширенная аналитика\n` +
      `✅ Доступ к бета-функциям\n\n` +
      `💰 Цена: 990₽/месяц`;
  }
  
  // ==================== УТИЛИТЫ ====================
  
  /**
   * Безопасная отправка сообщения
   */
  async sendMessage(ctx: Context, text: string, keyboard?: InlineKeyboardMarkup) {
    try {
      await ctx.reply(text, keyboard ? { reply_markup: keyboard } : undefined);
      this.logger.log(`Message sent to user ${ctx.from?.id}`);
    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`);
    }
  }
  
  /**
   * Безопасное редактирование сообщения
   */
  async editMessage(ctx: Context, text: string, keyboard?: InlineKeyboardMarkup) {
    try {
      await ctx.editMessageText(text, keyboard ? { reply_markup: keyboard } : undefined);
      this.logger.log(`Message edited for user ${ctx.from?.id}`);
    } catch (error) {
      this.logger.error(`Failed to edit message: ${error.message}`);
      // Если не удалось отредактировать, отправляем новое сообщение
      await this.sendMessage(ctx, text, keyboard);
    }
  }
  
  /**
   * Ответ на callback query
   */
  async answerCallback(ctx: Context, text?: string) {
    try {
      await ctx.answerCbQuery(text);
    } catch (error) {
      this.logger.error(`Failed to answer callback: ${error.message}`);
    }
  }
  
  /**
   * Логирование действий пользователя
   */
  logUserAction(userId: number, action: string, data?: any) {
    this.logger.log(`User ${userId} performed action: ${action}`, data);
  }
  
  // ==================== ВАЛИДАЦИЯ ====================
  
  /**
   * Проверяет валидность callback data
   */
  isValidCallback(callbackData: string): boolean {
    const validCallbacks = [
      'start_work', 'buy_pro', 'help', 'get_bonus',
      'create_team', 'profile', 'back_to_menu',
      'edit_profile', 'statistics', 'settings',
      'manual', 'support', 'faq', 'payment_pro'
    ];
    return validCallbacks.includes(callbackData);
  }
  
  /**
   * Санитизация пользовательского ввода
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Удаляем HTML теги
      .trim()
      .substring(0, 1000); // Ограничиваем длину
  }
  
  // ==================== СИСТЕМНЫЕ МЕТОДЫ ====================
  
  /**
   * Получение статистики бота
   */
  async getBotStats() {
    return {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      timestamp: new Date().toISOString(),
    };
  }
  
  /**
   * Проверка здоровья бота
   */
  async checkHealth(): Promise<boolean> {
    try {
      // Здесь можно добавить проверки:
      // - подключение к базе данных
      // - доступность внешних API
      // - проверка токена бота
      return true;
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`);
      return false;
    }
  }
  
  // ==================== РАБОТА С ФАЙЛАМИ/МЕДИА ====================
  
  /**
   * Обработка загруженных файлов
   */
  async handleFileUpload(ctx: Context) {
    if (ctx.message && 'document' in ctx.message) {
      const document = ctx.message.document;
      this.logger.log(`File uploaded: ${document.file_name}, size: ${document.file_size}`);
      
      // Здесь можно добавить логику обработки файлов
      return {
        fileId: document.file_id,
        fileName: document.file_name,
        fileSize: document.file_size,
      };
    }
    return null;
  }
  
  // ==================== УВЕДОМЛЕНИЯ ====================
  
  /**
   * Отправка уведомления администраторам
   */
  async notifyAdmins(message: string) {
    const adminIds = process.env.ADMIN_IDS?.split(',').map(id => parseInt(id)) || [];
    
    for (const adminId of adminIds) {
      try {
        // Здесь нужно использовать bot instance для отправки сообщения
        // await this.bot.telegram.sendMessage(adminId, `🔔 ${message}`);
        this.logger.log(`Notification sent to admin ${adminId}`);
      } catch (error) {
        this.logger.error(`Failed to notify admin ${adminId}: ${error.message}`);
      }
    }
  }
}