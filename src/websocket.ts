import WebSocket from "ws";

export interface TransferEvent {
  sender: string;
  recipient: string;
  denom: string;
  amountUzig: bigint;
  txhash: string;
}

export interface WebSocketMonitorOptions {
  url: string;
  reconnectBaseDelayMs: number;
  reconnectMaxDelayMs: number;
  onTransfer: (event: TransferEvent) => void;
}

type JsonObject = Record<string, unknown>;

export class ZigWebSocketMonitor {
  private readonly options: WebSocketMonitorOptions;
  private readonly seenFeedback = new Set<string>();
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isStopped = false;

  constructor(options: WebSocketMonitorOptions) {
    this.options = options;
  }

  start(): void {
    this.isStopped = false;
    this.connect();
  }

  stop(): void {
    this.isStopped = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.close();
      this.socket = null;
    }
  }

  private connect(): void {
    if (this.isStopped) {
      return;
    }
    console.log(`[ws] Connecting to ${this.options.url}`);
    const ws = new WebSocket(this.options.url);
    this.socket = ws;

    ws.on("open", () => {
      console.log("[ws] Connected");
      this.reconnectAttempts = 0;
      this.subscribeToTransactionSend(ws);
    });

    ws.on("message", (raw) => {
      const parsed = parseJson(raw.toString());
      if (!parsed) {
        return;
      }
      this.logSubscriptionFeedback(parsed);
      const transfers = extractTransferEvents(parsed);
      for (const transfer of transfers) {
        this.options.onTransfer(transfer);
      }
    });

    ws.on("error", (error) => {
      console.error("[ws] Error", error);
    });

    ws.on("close", (code, reason) => {
      console.warn(`[ws] Closed (code=${code}, reason=${reason.toString()})`);
      this.socket = null;
      this.scheduleReconnect();
    });
  }

  private subscribeToTransactionSend(ws: WebSocket): void {
    const messages: JsonObject[] = [
      {
        jsonrpc: "2.0",
        id: "tx-send-query",
        method: "subscribe",
        params: { query: "tm.event='Tx' AND message.action='send'" }
      },
      {
        jsonrpc: "2.0",
        id: "tx-query",
        method: "subscribe",
        params: { query: "tm.event='Tx'" }
      },
      { method: "subscribe", params: { stream: "tx.send" } },
      { method: "subscribe", params: { event: "tx.send" } },
      { action: "subscribe", topic: "tx.send" },
      { method: "subscribe", params: { stream: "transaction.send" } },
      { method: "subscribe", params: { event: "transaction.send" } },
      { action: "subscribe", topic: "transaction.send" }
    ];

    for (const payload of messages) {
      try {
        ws.send(JSON.stringify(payload));
        console.log(`[ws] subscribe -> ${JSON.stringify(payload)}`);
      } catch (error) {
        console.error("[ws] Failed to send subscribe message", error);
      }
    }
    console.log("[ws] Subscription requested for tx.send");
  }

  private logSubscriptionFeedback(payload: JsonObject): void {
    const hasError = Object.prototype.hasOwnProperty.call(payload, "error");
    const id = typeof payload.id === "string" ? payload.id : undefined;
    const payloadString = JSON.stringify(payload);

    if (hasError) {
      const cacheKey = `err:${payloadString}`;
      if (!this.seenFeedback.has(cacheKey)) {
        this.seenFeedback.add(cacheKey);
        console.error(`[ws] subscription error: ${payloadString}`);
      }
      return;
    }

    if (id !== "tx-send-query" && id !== "tx-query") {
      return;
    }

    const result = payload.result;
    const isAckObject =
      !!result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      Object.keys(result as JsonObject).length === 0;

    if (!isAckObject) {
      return;
    }

    const cacheKey = `ack:${id}`;
    if (this.seenFeedback.has(cacheKey)) {
      return;
    }
    this.seenFeedback.add(cacheKey);
    console.log(`[ws] subscription acknowledged for ${id}`);
  }

  private scheduleReconnect(): void {
    if (this.isStopped) {
      return;
    }
    const delayMs = Math.min(
      this.options.reconnectMaxDelayMs,
      this.options.reconnectBaseDelayMs * 2 ** this.reconnectAttempts
    );
    this.reconnectAttempts += 1;
    console.log(`[ws] Reconnecting in ${delayMs}ms`);
    this.reconnectTimer = setTimeout(() => this.connect(), delayMs);
  }
}

function parseJson(raw: string): JsonObject | null {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as JsonObject;
    }
    return null;
  } catch {
    return null;
  }
}

function extractTransferEvents(payload: JsonObject): TransferEvent[] {
  const events: TransferEvent[] = [];
  walkObject(payload, undefined, events);
  return events;
}

function walkObject(
  node: unknown,
  inheritedTxhash: string | undefined,
  output: TransferEvent[]
): void {
  if (!node || typeof node !== "object") {
    return;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      walkObject(item, inheritedTxhash, output);
    }
    return;
  }

  const obj = node as JsonObject;
  const txhash = pickTxhash(obj) || inheritedTxhash;
  const transfer = parseTransferFromObject(obj, txhash);
  if (transfer) {
    output.push(transfer);
  }

  for (const value of Object.values(obj)) {
    walkObject(value, txhash, output);
  }
}

function parseTransferFromObject(
  obj: JsonObject,
  txhashHint?: string
): TransferEvent | null {
  const sender = pickString(obj, ["sender", "from", "from_address"]);
  const recipient = pickString(obj, ["recipient", "receiver", "to", "to_address"]);
  const txhash = pickTxhash(obj) || txhashHint;

  if (!sender || !recipient || !txhash) {
    return null;
  }

  const amountAndDenom = pickAmountAndDenom(obj);
  if (!amountAndDenom) {
    return null;
  }

  const denom = amountAndDenom.denom.toLowerCase();
  if (denom !== "uzig") {
    return null;
  }

  return {
    sender,
    recipient,
    txhash,
    denom,
    amountUzig: amountAndDenom.amount
  };
}

function pickAmountAndDenom(
  obj: JsonObject
): { amount: bigint; denom: string } | null {
  const denom = pickString(obj, ["denom"]);
  const amountRaw = obj.amount;

  if (denom && typeof amountRaw === "string" && /^\d+$/.test(amountRaw)) {
    return { amount: BigInt(amountRaw), denom };
  }

  if (denom && typeof amountRaw === "number" && Number.isFinite(amountRaw)) {
    return { amount: BigInt(Math.floor(amountRaw)), denom };
  }

  if (typeof amountRaw === "string") {
    const compact = amountRaw.match(/^(\d+)([a-zA-Z/]+)$/);
    if (compact) {
      return { amount: BigInt(compact[1]), denom: compact[2] };
    }
  }

  if (amountRaw && typeof amountRaw === "object" && !Array.isArray(amountRaw)) {
    const amountObj = amountRaw as JsonObject;
    const nestedAmount = pickString(amountObj, ["amount"]);
    const nestedDenom = pickString(amountObj, ["denom"]);
    if (nestedAmount && nestedDenom && /^\d+$/.test(nestedAmount)) {
      return { amount: BigInt(nestedAmount), denom: nestedDenom };
    }
  }

  if (Array.isArray(amountRaw)) {
    for (const coin of amountRaw) {
      if (!coin || typeof coin !== "object") {
        continue;
      }
      const coinObj = coin as JsonObject;
      const coinDenom = pickString(coinObj, ["denom"]);
      const coinAmount = pickString(coinObj, ["amount"]);
      if (coinDenom && coinAmount && /^\d+$/.test(coinAmount)) {
        return { amount: BigInt(coinAmount), denom: coinDenom };
      }
    }
  }

  const coins = obj.coins;
  if (Array.isArray(coins)) {
    for (const coin of coins) {
      if (!coin || typeof coin !== "object") {
        continue;
      }
      const coinObj = coin as JsonObject;
      const coinDenom = pickString(coinObj, ["denom"]);
      const coinAmount = pickString(coinObj, ["amount"]);
      if (coinDenom && coinAmount && /^\d+$/.test(coinAmount)) {
        return { amount: BigInt(coinAmount), denom: coinDenom };
      }
    }
  }

  return null;
}

function pickTxhash(obj: JsonObject): string | undefined {
  return pickString(obj, ["txhash", "txHash", "tx_hash", "hash", "transactionHash"]);
}

function pickString(obj: JsonObject, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}


