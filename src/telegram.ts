import TelegramBot from "node-telegram-bot-api";

export interface TelegramAlert {
  wallet: string;
  direction: "sent" | "received";
  amountZig: string;
  txhash: string;
}

export class TelegramService {
  private readonly bot: TelegramBot;
  private readonly chatId: string;
  private readonly minIntervalMs: number;
  private readonly queue: TelegramAlert[] = [];
  private lastSentAt = 0;
  private isDraining = false;
  private isRestartingPolling = false;

  constructor(
    token: string,
    chatId: string,
    minIntervalMs: number,
    enablePolling: boolean
  ) {
    this.bot = new TelegramBot(token, { polling: enablePolling });
    this.chatId = chatId;
    this.minIntervalMs = minIntervalMs;
    if (enablePolling) {
      this.registerStartHandler();
      this.registerPollingErrorHandler();
      console.log("[telegram] Polling enabled (/start handler active)");
    } else {
      console.log("[telegram] Polling disabled (/start handler inactive)");
    }
  }

  enqueueAlert(alert: TelegramAlert): void {
    this.queue.push(alert);
    void this.drainQueue();
  }

  async sendStartupMessage(): Promise<void> {
    try {
      await this.bot.sendMessage(
        this.chatId,
        "Wallet monitor bot started and connected.",
        { disable_web_page_preview: true }
      );
      console.log("[telegram] Startup message sent");
    } catch (error) {
      console.error(
        "[telegram] Could not send startup message. Ensure TELEGRAM_CHAT_ID is correct and open chat with bot via /start.",
        error
      );
    }
  }

  // node-telegram-bot-api stops polling for good after an EFATAL error, so restart it with backoff.
  private registerPollingErrorHandler(): void {
    this.bot.on("polling_error", (error: Error & { code?: string }) => {
      console.error(`[telegram] polling_error ${error.code ?? ""} ${error.message}`);
      if (error.code === "EFATAL") {
        void this.restartPolling();
      }
    });
  }

  private async restartPolling(): Promise<void> {
    if (this.isRestartingPolling) {
      return;
    }
    this.isRestartingPolling = true;
    let delayMs = 5_000;
    try {
      for (;;) {
        try {
          await this.bot.stopPolling();
        } catch {
          // already stopped
        }
        await delay(delayMs);
        try {
          await this.bot.startPolling();
          console.log("[telegram] Polling restarted");
          return;
        } catch (error) {
          console.error("[telegram] Polling restart failed, retrying", error);
          delayMs = Math.min(delayMs * 2, 60_000);
        }
      }
    } finally {
      this.isRestartingPolling = false;
    }
  }

  private registerStartHandler(): void {
    this.bot.onText(/^\/start(?:\s+.*)?$/, async (msg) => {
      const startedChatId = msg.chat.id.toString();
      const isConfiguredChat = startedChatId === this.chatId;
      const text = isConfiguredChat
        ? [
            "Wallet monitor bot is active.",
            `Chat ID: ${startedChatId}`,
            "You will receive large-transfer alerts in this chat."
          ].join("\n")
        : [
            "Bot connected, but this chat is not the configured alert target.",
            `This chat ID: ${startedChatId}`,
            `Configured TELEGRAM_CHAT_ID: ${this.chatId}`,
            "Set TELEGRAM_CHAT_ID to this chat ID if you want alerts here."
          ].join("\n");

      try {
        await this.bot.sendMessage(msg.chat.id, text, {
          disable_web_page_preview: true
        });
      } catch (error) {
        console.error("[telegram] Failed to respond to /start", error);
      }
    });
  }

  private async drainQueue(): Promise<void> {
    if (this.isDraining) {
      return;
    }
    this.isDraining = true;

    try {
      while (this.queue.length > 0) {
        const now = Date.now();
        const waitMs = Math.max(0, this.minIntervalMs - (now - this.lastSentAt));
        if (waitMs > 0) {
          await delay(waitMs);
        }

        const next = this.queue.shift();
        if (!next) {
          continue;
        }

        const text = formatAlertMessage(next);
        try {
          await this.bot.sendMessage(this.chatId, text, {
            disable_web_page_preview: true
          });
          this.lastSentAt = Date.now();
          console.log(`[telegram] Alert sent for tx ${next.txhash}`);
        } catch (error) {
          console.error("[telegram] Failed to send alert", error);
        }
      }
    } finally {
      this.isDraining = false;
    }
  }
}

function formatAlertMessage(alert: TelegramAlert): string {
  return [
    "Large ZIG Transfer",
    `Wallet: ${alert.wallet}`,
    `Direction: ${alert.direction}`,
    `Amount: ${alert.amountZig} ZIG`,
    `Tx: https://www.zigscan.org/tx/${alert.txhash}`
  ].join("\n");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
