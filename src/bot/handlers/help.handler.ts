import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { Markup } from 'telegraf';

@Injectable()
export class StartHandler {
  async handle(ctx: Context) {
    const firstName = ctx.from?.first_name || 'друг';
    
    await ctx.reply(
      `Привет, ${firstName}! 👋\n\nДобро пожаловать в нашего Telegram-бота. Ниже доступное меню 👇`,
      Markup.keyboard([['📋 Меню', '👤 Профиль'], ['ℹ️ Помощь']])
        .resize()
        .oneTime()
    );
  }
}