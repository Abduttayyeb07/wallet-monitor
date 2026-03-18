import { AppConfig } from "./config";
import { TelegramService } from "./telegram";
import { TransferEvent, ZigWebSocketMonitor } from "./websocket";

export class TransferMonitor {
  private readonly config: AppConfig;
  private readonly telegram: TelegramService;
  private readonly wsMonitor: ZigWebSocketMonitor;
  private readonly seenTxHashes = new Set<string>();
  private readonly seenTxQueue: string[] = [];

  constructor(config: AppConfig, telegram: TelegramService) {
    this.config = config;
    this.telegram = telegram;
    this.wsMonitor = new ZigWebSocketMonitor({
      url: config.wsUrl,
      reconnectBaseDelayMs: config.reconnectBaseDelayMs,
      reconnectMaxDelayMs: config.reconnectMaxDelayMs,
      onTransfer: (event) => this.handleTransfer(event)
    });
  }

  start(): void {
    console.log(
      `[monitor] Starting. wallets=${this.config.monitoredWallets.size}, threshold=${this.config.thresholdZig} ZIG`
    );
    this.wsMonitor.start();
  }

  stop(): void {
    this.wsMonitor.stop();
  }

  private handleTransfer(event: TransferEvent): void {
    if (this.isAlreadySeen(event.txhash)) {
      return;
    }

    const sender = event.sender.toLowerCase();
    const recipient = event.recipient.toLowerCase();
    const isSenderMonitored = this.config.monitoredWallets.has(sender);
    const isRecipientMonitored = this.config.monitoredWallets.has(recipient);

    if (!isSenderMonitored && !isRecipientMonitored) {
      return;
    }

    if (event.amountUzig < this.config.thresholdUzig) {
      return;
    }

    this.rememberTx(event.txhash);
    const amountZig = formatZigFromUzig(event.amountUzig);

    if (isSenderMonitored) {
      this.telegram.enqueueAlert({
        wallet: event.sender,
        direction: "sent",
        amountZig,
        txhash: event.txhash
      });
    }

    if (isRecipientMonitored && recipient !== sender) {
      this.telegram.enqueueAlert({
        wallet: event.recipient,
        direction: "received",
        amountZig,
        txhash: event.txhash
      });
    }

    console.log(
      `[monitor] Matched tx ${event.txhash} ${event.sender} -> ${event.recipient} amount=${amountZig} ZIG`
    );
  }

  private isAlreadySeen(txhash: string): boolean {
    return this.seenTxHashes.has(txhash);
  }

  private rememberTx(txhash: string): void {
    this.seenTxHashes.add(txhash);
    this.seenTxQueue.push(txhash);
    if (this.seenTxQueue.length > this.config.maxSeenTx) {
      const oldest = this.seenTxQueue.shift();
      if (oldest) {
        this.seenTxHashes.delete(oldest);
      }
    }
  }
}

export function formatZigFromUzig(amountUzig: bigint): string {
  const whole = amountUzig / 1_000_000n;
  const fraction = amountUzig % 1_000_000n;
  if (fraction === 0n) {
    return whole.toString();
  }
  return `${whole}.${fraction.toString().padStart(6, "0").replace(/0+$/, "")}`;
}
