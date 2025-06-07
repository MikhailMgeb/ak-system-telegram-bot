import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  Action,
  Command,
  Message,
  InlineQuery
} from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Injectable, Logger } from '@nestjs/common';

// Импорт сервисов и обработчиков
import { BotService } from './bot.service';
import { StartHandler } from './handlers/start.handler';
// import { ProfileHandler } from './handlers/profile.handler';
import { HelpHandler } from './handlers/help.handler';
import { MenuHandler } from './handlers/menu.handler';
// import { PaymentHandler } from './handlers/payment.handler';
// import { BonusHandler } from './handlers/bonus.handler';
// import { TeamHandler } from './handlers/team.handler';

@Update()
@Injectable()
export class BotUpdate {
  private readonly logger = new Logger(BotUpdate.name);
  
  constructor(
    private readonly botService: BotService,
    private readonly startHandler: StartHandler,
    // private readonly profileHandler: ProfileHandler,
    private readonly helpHandler: HelpHandler,
    private readonly menuHandler: MenuHandler,
    // private readonly paymentHandler: PaymentHandler,
    // private readonly bonusHandler: BonusHandler,
    // private readonly teamHandler: TeamHandler,
  ) {}
  
  // ==================== КОМАНДЫ ====================
  
  /**
   * Обработка команды /start
   */
  @Start()
  async onStart(@Ctx() ctx: Context) {
    this.logger.log(`User ${ctx.from?.id} started the bot`);
    await this.startHandler.handle(ctx);
  }
  
  /**
   * Обработка команды /help
   */
  @Help()
  async onHelp(@Ctx() ctx: Context) {
    this.logger.log(`User ${ctx.from?.id} requested help`);
    await this.helpHandler.handle(ctx);
  }

  /**
   * Обработка команды /menu
   */
  @Command('menu')
  async onMenu(@Ctx() ctx: Context) {
    this.logger.log(`User ${ctx.from?.id} requested menu`);
    await this.menuHandler.onBackToMenu(ctx);
  }

  // /**
  //  * Обработка команды /profile
  //  */
  // @Command('profile')
  // async onProfile(@Ctx() ctx: Context) {
  //   this.logger.log(`User ${ctx.from?.id} requested profile`);
  //   await this.profileHandler.showProfile(ctx);
  // }
  //
  // /**
  //  * Административная команда /admin (только для админов)
  //  */
  // @Command('admin')
  // async onAdmin(@Ctx() ctx: Context) {
  //   const userId = ctx.from?.id;
  //   if (!userId || !this.botService.isAdmin(userId)) {
  //     await ctx.reply('❌ У вас нет прав администратора');
  //     return;
  //   }
  //
  //   const stats = await this.botService.getBotStats();
  //   await ctx.reply(
  //     `🔧 Админ панель\n\n` +
  //     `⏱️ Время работы: ${Math.floor(stats.uptime / 60)} мин\n` +
  //     `💾 Память: ${Math.round(stats.memoryUsage.used / 1024 / 1024)} MB\n` +
  //     `📅 Время: ${stats.timestamp}`
  //   );
  // }
  //
  // // ==================== CALLBACK QUERIES (нажатия кнопок) ====================
  //
  /**
   * Главное меню
   */
  @Action('back_to_menu')
  async onBackToMenu(@Ctx() ctx: Context) {
    await this.botService.answerCallback(ctx);
    await this.menuHandler.onBackToMenu(ctx);
  }

  /**
  //  * Начать работу
  //  */
  @Action('start_work')
  async onStartWork(@Ctx() ctx: Context) {
    await this.botService.answerCallback(ctx);
    await this.botService.editMessage(
      ctx,
      '🚀 Начинаем работу!\n\nВыберите тип задачи:',
      {
        inline_keyboard: [
          [
            { text: '📝 Создать проект', callback_data: 'create_project' },
            { text: '📂 Открыть проект', callback_data: 'open_project' }
          ],
          [
            { text: '📊 Аналитика', callback_data: 'analytics' }
          ],
          [
            { text: '← Назад в меню', callback_data: 'back_to_menu' }
          ]
        ]
      }
    );
  }

  // /**
  //  * Покупка PRO
  //  */
  // @Action('buy_pro')
  // async onBuyPro(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.paymentHandler.showProInfo(ctx);
  // }
  //
  // /**
  //  * Помощь
  //  */
  // @Action('help')
  // async onHelpAction(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.helpHandler.handle(ctx);
  // }
  //
  // /**
  //  * Получить бонус
  //  */
  // @Action('get_bonus')
  // async onGetBonus(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.bonusHandler.showBonusMenu(ctx);
  // }
  //
  // /**
  //  * Создать команду
  //  */
  // @Action('create_team')
  // async onCreateTeam(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.teamHandler.showTeamMenu(ctx);
  // }
  //
  // /**
  //  * Личный кабинет
  //  */
  // @Action('profile')
  // async onProfileAction(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.profileHandler.showProfile(ctx);
  // }
  //
  // // ==================== ВЛОЖЕННЫЕ ДЕЙСТВИЯ ====================
  //
  // /**
  //  * Создание проекта
  //  */
  // @Action('create_project')
  // async onCreateProject(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.botService.editMessage(
  //     ctx,
  //     '📝 Создание нового проекта\n\nВведите название проекта:'
  //   );
  //
  //   // Устанавливаем состояние ожидания ввода названия
  //   // В реальном проекте это должно сохраняться в базе данных или Redis
  // }
  //
  // /**
  //  * Редактирование профиля
  //  */
  // @Action('edit_profile')
  // async onEditProfile(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.profileHandler.showEditMenu(ctx);
  // }
  //
  // /**
  //  * Статистика
  //  */
  // @Action('statistics')
  // async onStatistics(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.profileHandler.showStatistics(ctx);
  // }
  //
  // /**
  //  * Настройки
  //  */
  // @Action('settings')
  // async onSettings(@Ctx() ctx: Context) {
  //   await this.botService.answerCallback(ctx);
  //   await this.profileHandler.showSettings(ctx);
  // }
  //
  // // ==================== ОБРАБОТКА СООБЩЕНИЙ ====================
  //
  // /**
  //  * Обработка текстовых сообщений
  //  */
  // @On('text')
  // async onText(@Ctx() ctx: Context, @Message('text') text: string) {
  //   const userId = ctx.from?.id;
  //   this.logger.log(`User ${userId} sent text: ${text}`);
  //
  //   // Простые текстовые команды
  //   switch (text.toLowerCase()) {
  //     case 'меню':
  //     case 'menu':
  //       await this.menuHandler.showMainMenu(ctx);
  //       break;
  //
  //     case 'профиль':
  //     case 'profile':
  //       await this.profileHandler.showProfile(ctx);
  //       break;
  //
  //     case 'помощь':
  //     case 'help':
  //       await this.helpHandler.handle(ctx);
  //       break;
  //
  //     default:
  //       // Обработка произвольного текста
  //       await this.handleCustomText(ctx, text);
  //   }
  // }
  //
  // /**
  //  * Обработка голосовых сообщений
  //  */
  // @On('voice')
  // async onVoice(@Ctx() ctx: Context) {
  //   await ctx.reply('🎤 Голосовые сообщения пока не поддерживаются');
  // }
  //
  // /**
  //  * Обработка фотографий
  //  */
  @On('photo')
  async onPhoto(@Ctx() ctx: Context) {
    const photos = ctx.message && 'photo' in ctx.message ? ctx.message.photo : [];
    if (photos.length > 0) {
      await ctx.reply('📸 Спасибо за фото! Обработка изображений в разработке.');
    }
  }
  //
  // /**
  //  * Обработка документов
  //  */
  // @On('document')
  // async onDocument(@Ctx() ctx: Context) {
  //   const fileInfo = await this.botService.handleFileUpload(ctx);
  //   if (fileInfo) {
  //     await ctx.reply(
  //       `📁 Файл получен!\n\n` +
  //       `📄 Название: ${fileInfo.fileName}\n` +
  //       `📏 Размер: ${Math.round((fileInfo.fileSize || 0) / 1024)} KB`
  //     );
  //   }
  // }
  //
  // // ==================== INLINE QUERIES ====================
  //
  // /**
  //  * Обработка inline запросов
  //  */
  // @InlineQuery()
  // async onInlineQuery(@Ctx() ctx: Context) {
  //   const query = ctx.inlineQuery?.query || '';
  //
  //   const results = [
  //     {
  //       type: 'article' as const,
  //       id: '1',
  //       title: 'Главное меню',
  //       description: 'Показать главное меню бота',
  //       input_message_content: {
  //         message_text: 'Открываю главное меню...'
  //       }
  //     }
  //   ];
  //
  //   await ctx.answerInlineQuery(results);
  // }
  //
  // // ==================== ОБРАБОТКА ОШИБОК ====================
  //
  // /**
  //  * Обработка неизвестных callback queries
  //  */
  // @Action(/.*/)
  // async onUnknownAction(@Ctx() ctx: Context) {
  //   const callbackData = ctx.callbackQuery && 'data' in ctx.callbackQuery
  //     ? ctx.callbackQuery.data
  //     : 'unknown';
  //
  //   this.logger.warn(`Unknown callback: ${callbackData} from user ${ctx.from?.id}`);
  //
  //   await this.botService.answerCallback(ctx, 'Неизвестная команда');
  //   await this.menuHandler.showMainMenu(ctx);
  // }
  //
  // // ==================== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ====================
  //
  // /**
  //  * Обработка произвольного текста
  //  */
  // private async handleCustomText(ctx: Context, text: string) {
  //   const sanitizedText = this.botService.sanitizeInput(text);
  //
  //   // Здесь можно добавить обработку состояний пользователя
  //   // Например, если пользователь вводит название проекта
  //
  //   // По умолчанию предлагаем меню
  //   await ctx.reply(
  //     `Получил сообщение: "${sanitizedText}"\n\n` +
  //     `Используйте команды или кнопки меню для навигации.`,
  //     { reply_markup: this.botService.createMainMenu() }
  //   );
  // }
  //
  // /**
  //  * Middleware для логирования всех обновлений
  //  */
  // async logUpdate(ctx: Context, next: () => Promise<void>) {
  //   const userId = ctx.from?.id;
  //   const updateType = ctx.updateType;
  //
  //   this.logger.log(`Update received: ${updateType} from user ${userId}`);
  //
  //   try {
  //     await next();
  //   } catch (error) {
  //     this.logger.error(`Error processing update: ${error.message}`, error.stack);
  //
  //     // Отправляем сообщение об ошибке пользователю
  //     try {
  //       await ctx.reply('❌ Произошла ошибка. Попробуйте позже или обратитесь в поддержку.');
  //     } catch (sendError) {
  //       this.logger.error(`Failed to send error message: ${sendError.message}`);
  //     }
  //   }
  // }
}