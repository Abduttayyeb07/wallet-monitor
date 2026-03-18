declare module "node-telegram-bot-api" {
  interface TelegramChat {
    id: number;
  }

  interface TelegramMessage {
    chat: TelegramChat;
    text?: string;
  }

  interface TelegramBotOptions {
    polling?: boolean;
  }

  interface SendMessageOptions {
    disable_web_page_preview?: boolean;
  }

  export default class TelegramBot {
    constructor(token: string, options?: TelegramBotOptions);
    onText(
      regexp: RegExp,
      callback: (msg: TelegramMessage, match: RegExpExecArray | null) => void | Promise<void>
    ): void;
    sendMessage(
      chatId: string | number,
      text: string,
      options?: SendMessageOptions
    ): Promise<unknown>;
  }
}
