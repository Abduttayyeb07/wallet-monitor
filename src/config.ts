import dotenv from "dotenv";

dotenv.config();

const DEFAULT_WALLETS = [
  "zig120m322z5mcgs8p097rypps3weqpwgq0rmtl3ct",
  "zig12dxqlvccndj447q86sax67senmy65csnmvvjur",
  "zig138tn9ljugg0gumc3k4elqjzeen7r42qf7kmz59",
  "zig1455xp0cwksuug8jclrajrt3x0yzf6v08dpx0nf",
  "zig14p687ueasdhrxyc0vgu86n7470kxnzhspcmhus",
  "zig14xt6rat7rll779nqdqy7qv0enssx4fgpu9y4pe",
  "zig14xxzrncx7r4zey6exmak9ppqqagfdujljwyljl",
  "zig15puvm095n6yq6e6ws4hfs89qcly4armt6ev5sl",
  "zig16nwjxpdvjzltql09j2d5wvcmja5lnjhs7m72y4",
  "zig17anlcxku73zwq468jkjunelju92au44du854h7",
  "zig17xpfvakm2amg962yls6f84z3kell8c5l3nxjf4",
  "zig18q2xjsj5rc8tluglpvd7zqx4e99jc7qlxsa7ww",
  "zig18slm0etzj57x96a0sevdhlr7v6v0zwfzxmwr9n",
  "zig1933cypv70v5j3rzmfcz0ya0te0zmepjpkf5dcn",
  "zig1a7y2x8vsgulvhx7selwng9hth00jdnkrhkp2r9",
  "zig1aaaqsnx88957hvh54ks5sv3tdxec5kyhhdjdvr",
  "zig1aacv6z00qyysq3fv72xgf484qfagkw23ghjpzl",
  "zig1amrltcghgrqwxlg5umd4qpj8twrse8dew4nrqa",
  "zig1avu9gxlc7gxmdqzk49kystw27yes2wlzsh0afv",
  "zig1c0e5dukkcxyeqrz4e6j98h8s7hy87nn9x4rjth",
  "zig1ce7vn3s59sht5vtz9kt0sjhc4k4e0yxhqc34sd",
  "zig1cth0e2yqsd5xlph73mk8dl53w0kqpfgnp7k386",
  "zig1ctj0ndjdtj9493x5tvs59528cnpn0agqqpkxaf",
  "zig1da6krwdm9ng0d93t008p0jv8e53grskkpasapk",
  "zig1dv55mqcn5cljl7pgqfejhwhzj2hyy66htmqem4",
  "zig1edjjq0km2al4q5qpnew7phd9yvnkktjvk0hmv5",
  "zig1epmfuv96tkllcch64ncx99ay94aywu04c2e2k2",
  "zig1esk9drwgyc4jaku0pvnyu5avjau448apg443tm",
  "zig1fckundc8na396r03fvmvxzvkh9zxh224k5g06w",
  "zig1fdp9wxu48n6hsk87xa9j7ftmjc5kvj85023mv2",
  "zig1fml2sdps6dj0aqfrhtq9zekkzvkts84cnjsw9p",
  "zig1fz572e3xw8xtwfmq7yplqadzskzzs8knpfflmw",
  "zig1h22mlckxtzsqa32uk4pzn3jkq7du5nc92fyc2u",
  "zig1hdq87rzf327fwz8rw9rnmchj7qa3uxrpxds2fw",
  "zig1jaqflv24n5lre2wt5sx08qlu5c5aly2gcyvf90",
  "zig1jdfqfqnmrtujrv3srlenxemxpetaljemcqcxs8",
  "zig1jrmtyf4pxc8q05aymtcgj62td6hpzgpgre55dr",
  "zig1juja9x3m564sedt8yvcwvyw9wct5t2jgyrj5su",
  "zig1kcfer5zj8l95d65uv28qzj678sqn8djj2mh6wf",
  "zig1l9l6ztayaeservh407jgy5t0ek32rva5edsajn",
  "zig1lg0uwmkkjergwypwgq20lx7j07j75ac6945wjm",
  "zig1ltvxkkqhr86gkvs2f2vmffvlqav4lr3dtezadp",
  "zig1lun7zgw50p8f67p0lpcr5crfwmgqa6jfwh6mud",
  "zig1n75g6fl6rar2n53xk7krcedq88kat9le3xrurn",
  "zig1nv878hq9e7g2nv3nvkscgshjq5rk9t7zjz0ezz",
  "zig1nze0a0f9uggrpk4t7veru5t2dj2vaztru3yngg",
  "zig1pjzecuxkz0a8uj9v2qmgjtqstl4gmz0f7scyg8",
  "zig1pkwpk2h0x8vvv8yxqllqmzhw2tnvc4t07wcw78",
  "zig1q4fnkxwexxgh2qa26dxczwrjk4eteaugs0v9al",
  "zig1qmy242fasznk3q5mvqzew0af9c6xz2zf09zrau",
  "zig1qw5nglhmhgq8qzhjpv9sgj3gugsrjvpdt5qq6c",
  "zig1r3wdrz2ufjcf80fekd7eeu434c238aekkzemst",
  "zig1rnfwsgvq34cpqmyfqmzktyxm5sy85wchkwk7uy",
  "zig1thhys33kv83c96u0rr9aghwepyahqxz6s75yrk",
  "zig1tm9hckgnq23f03f8ts00eazwdr2fw6x7yy5elk",
  "zig1tnevdamxc0djlxd7fxfu5kmdq73th46gc2ah0y",
  "zig1tx59jm0xr99hl206j7aw66jns22apdt20nrqnc",
  "zig1ue2gteqp0cvh4ptvwp6smwkfehdjc3gexhrpg6",
  "zig1uvhmu70jr3yf2273r4z3clsguly0c6hjzd8l7e",
  "zig1w3jge85dfgg2c3qcstn0jxu57j4x7dtc9x8luu",
  "zig1xsa0u535w9lalxj3h9e5xde8jnacfk52wyerxd",
  "zig1y275wmmukxyqdhumwk05pa6xjkfku66rtqfslp",
  "zig1yahhr05ff677ywyd0zkrjwv86gyuqutuydgg9q",
  "zig1yl6hdjhmkf37639730gffanpzndzdpmh04nm4t",
  "zig1z423zj22sjdfl2jck2p0wdz42fz0qa79fm9mcd",
  "zig1zln33lgl9wch37y4amwg7e9z7zm0t0ytlxcerh",
  "zig1zm00h4n9vsfs6m5ld9ha2nwnqkt4gn8v3fe46q"
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

