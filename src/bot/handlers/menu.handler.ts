import { Injectable } from '@nestjs/common';
import { Action, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { KeyboardService } from '../keyboards/keyboard.service';

@Injectable()
export class MenuHandler {
  constructor(private readonly keyboard: KeyboardService) {}
  @Action('back_to_menu')
  async onBackToMenu(@Ctx() ctx: Context) {
    await ctx.answerCbQuery('Возврат в меню');
    await ctx.reply('Главное меню', { reply_markup: this.keyboard.createMainMenu() });
  }
}