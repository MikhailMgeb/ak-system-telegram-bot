import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class KeyboardService {
  createMainMenu(): InlineKeyboardMarkup {
    return {
      inline_keyboard: [
        [{ text: '📁 начать работу', callback_data: 'start_work' }],
        [{ text: '😊 купить PRO', callback_data: 'buy_pro' }],
        [{ text: '🆘 помощь', callback_data: 'help' }],
        [{ text: '🎁 получить бонус', callback_data: 'get_bonus' }],
        [{ text: '⚙️ создать команду', callback_data: 'create_team' }],
        [{ text: '👤 личный кабинет', callback_data: 'profile' }],
      ],
    };
  }
  
  createProfileMenu(): InlineKeyboardMarkup {
    return {
      inline_keyboard: [
        [
          { text: '✏️ Редактировать', callback_data: 'edit_profile' },
          { text: '📊 Статистика', callback_data: 'statistics' },
        ],
        [{ text: '⚙️ Настройки', callback_data: 'settings' }],
        [{ text: '← Назад в меню', callback_data: 'back_to_menu' }],
      ],
    };
  }
  
  createHelpMenu(): InlineKeyboardMarkup {
    return {
      inline_keyboard: [
        [
          { text: '📖 Руководство', callback_data: 'manual' },
          { text: '💬 Поддержка', callback_data: 'support' },
        ],
        [{ text: '❓ FAQ', callback_data: 'faq' }],
        [{ text: '← Назад в меню', callback_data: 'back_to_menu' }],
      ],
    };
  }
  
  createBackButton(): InlineKeyboardMarkup {
    return {
      inline_keyboard: [[{ text: '← Назад в меню', callback_data: 'back_to_menu' }]],
    };
  }
  
  createProMenu(): InlineKeyboardMarkup {
    return {
      inline_keyboard: [
        [{ text: '💳 Оплатить 990₽', callback_data: 'payment_pro' }],
        [{ text: '🎁 Попробовать бесплатно', callback_data: 'trial_pro' }],
        [{ text: '← Назад в меню', callback_data: 'back_to_menu' }],
      ],
    };
  }
}
