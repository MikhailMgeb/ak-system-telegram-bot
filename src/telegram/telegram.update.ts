import { TelegramService } from "@/telegram/telegram.service";
import { Injectable } from "@nestjs/common";
import { Ctx, Hears, Help, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { MESSAGES } from "../../constants";

@Update()
@Injectable()
export class TelegramUpdate {
  constructor(private readonly telegramService: TelegramService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(MESSAGES.WELCOME);
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply(MESSAGES.HELP);
  }

  @On("text")
  async handleText(@Ctx() ctx: Context) {
    const message = ctx.message as any;

    if (message.text.startsWith("/")) {
      return;
    }

    await ctx.reply(MESSAGES.SEND_PHOTO);
  }

  @Hears("да")
  async onYes(@Ctx() ctx: Context) {
    await ctx.reply("Фиг тебе!");
  }
}
