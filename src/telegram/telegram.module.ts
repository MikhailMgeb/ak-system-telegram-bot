import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramUpdate } from "./telegram.update";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>("TELEGRAM_BOT_TOKEN"),
      }),
    }),
  ],
  providers: [TelegramUpdate, TelegramUpdate],
})
export class TelegramModule {}
