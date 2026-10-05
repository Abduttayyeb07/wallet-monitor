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
    on(event: "polling_error", listener: (error: Error) => void): this;
    startPolling(options?: { restart?: boolean }): Promise<unknown>;
    stopPolling(options?: { cancel?: boolean }): Promise<unknown>;
    sendMessage(
      chatId: string | number,
      text: string,
      options?: SendMessageOptions
    ): Promise<unknown>;
  }
}
