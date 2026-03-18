import dotenv from "dotenv";

dotenv.config();

const DEFAULT_WALLETS = [
  "zig1l9l6ztayaeservh407jgy5t0ek32rva5edsajn",
  "zig1r3wdrz2ufjcf80fekd7eeu434c238aekkzemst",
  "zig1l9l6ztayaeservh407jgy5t0ek32rva5edsajn"
] as const;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parsePositiveInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid ${name}: expected positive integer, got "${raw}"`);
  }
  return value;
}

function parsePositiveNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid ${name}: expected positive number, got "${raw}"`);
  }
  return value;
}

function parseBoolean(name: string, fallback: boolean): boolean {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }
  const normalized = raw.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }
  throw new Error(`Invalid ${name}: expected boolean, got "${raw}"`);
}

function normalizeWallets(wallets: string[]): Set<string> {
  const normalized = wallets
    .map((wallet) => wallet.trim().toLowerCase())
    .filter(Boolean);
  if (normalized.length === 0) {
    throw new Error("No monitored wallets configured");
  }
  return new Set(normalized);
}

function loadWallets(): Set<string> {
  const raw = process.env.MONITORED_WALLETS;
  if (!raw) {
    return normalizeWallets([...DEFAULT_WALLETS]);
  }
  return normalizeWallets(raw.split(","));
}

export interface AppConfig {
  wsUrl: string;
  monitoredWallets: Set<string>;
  thresholdZig: number;
  thresholdUzig: bigint;
  telegramToken: string;
  telegramChatId: string;
  enableTelegramPolling: boolean;
  minAlertIntervalMs: number;
  maxSeenTx: number;
  reconnectBaseDelayMs: number;
  reconnectMaxDelayMs: number;
}

export const config: AppConfig = {
  wsUrl: process.env.WS_URL?.trim() || "wss://zigchain-mainnet.zigscan.net/websocket",
  monitoredWallets: loadWallets(),
  thresholdZig: parsePositiveNumber("ALERT_THRESHOLD_ZIG", 50_000),
  thresholdUzig: BigInt(
    Math.floor(parsePositiveNumber("ALERT_THRESHOLD_ZIG", 50_000) * 1_000_000)
  ),
  telegramToken: requireEnv("TELEGRAM_BOT_TOKEN"),
  telegramChatId: requireEnv("TELEGRAM_CHAT_ID"),
  enableTelegramPolling: parseBoolean("ENABLE_TELEGRAM_POLLING", false),
  minAlertIntervalMs: parsePositiveInt("MIN_ALERT_INTERVAL_MS", 1_500),
  maxSeenTx: parsePositiveInt("MAX_SEEN_TX", 50_000),
  reconnectBaseDelayMs: parsePositiveInt("RECONNECT_BASE_DELAY_MS", 1_000),
  reconnectMaxDelayMs: parsePositiveInt("RECONNECT_MAX_DELAY_MS", 30_000)
};

