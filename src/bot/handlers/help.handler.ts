import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { KeyboardService } from '../keyboards/keyboard.service';

@Injectable()
export class HelpHandler {
  constructor(private readonly keyboard: KeyboardService) {}
  async handle(ctx: Context) {
    const firstName = ctx.from?.first_name || 'друг';
    
    await ctx.reply(
      `Привет, ${firstName}! 👋\n\nДобро пожаловать в нашего Telegram-бота. Ниже доступное меню 👇`,
      { reply_markup: this.keyboard.createHelpMenu() }
    );
  }
}