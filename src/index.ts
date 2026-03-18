import { config } from "./config";
import { TransferMonitor } from "./monitor";
import { TelegramService } from "./telegram";

async function main(): Promise<void> {
  const telegram = new TelegramService(
    config.telegramToken,
    config.telegramChatId,
    config.minAlertIntervalMs,
    config.enableTelegramPolling
  );
  const monitor = new TransferMonitor(config, telegram);

  const shutdown = (signal: NodeJS.Signals) => {
    console.log(`[app] Received ${signal}. Shutting down...`);
    monitor.stop();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  await telegram.sendStartupMessage();
  monitor.start();
}

main().catch((error) => {
  console.error("[app] Fatal error", error);
  process.exit(1);
});
