# WalletMonitor

Real-time Zigchain wallet transfer monitor that sends Telegram alerts when large ZIG transfers are detected on monitored wallets.

## How It Works

- Connects to the Zigchain blockchain via WebSocket
- Watches for transfers involving configured wallet addresses
- Filters by a minimum ZIG amount threshold
- Sends alerts to a Telegram chat with transaction details
- Auto-reconnects with exponential backoff if the WebSocket drops

## Configuration

Create a `.env` file in the project root:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
WS_URL=wss://zigchain-mainnet.zigscan.net/ws
ALERT_THRESHOLD_ZIG=10
MIN_ALERT_INTERVAL_MS=1500
MAX_SEEN_TX=10
RECONNECT_BASE_DELAY_MS=1000
RECONNECT_MAX_DELAY_MS=30000
MONITORED_WALLETS=zig1abc...,zig1def...
ENABLE_TELEGRAM_POLLING=true
```

| Variable | Description | Default |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Telegram Bot API token (required) | — |
| `TELEGRAM_CHAT_ID` | Telegram chat ID for alerts (required) | — |
| `WS_URL` | Zigchain WebSocket endpoint | `wss://zigchain-mainnet.zigscan.net/websocket` |
| `ALERT_THRESHOLD_ZIG` | Minimum ZIG amount to trigger alert | `50000` |
| `MIN_ALERT_INTERVAL_MS` | Rate limit between Telegram messages (ms) | `1500` |
| `MAX_SEEN_TX` | Rolling window of seen tx hashes to avoid duplicates | `50000` |
| `RECONNECT_BASE_DELAY_MS` | Initial reconnection delay | `1000` |
| `RECONNECT_MAX_DELAY_MS` | Maximum reconnection delay | `30000` |
| `MONITORED_WALLETS` | Comma-separated wallet addresses to monitor | Built-in defaults |
| `ENABLE_TELEGRAM_POLLING` | Enable Telegram bot polling (`/start` handler) | `false` |

## Running with Docker Compose

```bash
docker compose up -d --build
```

View logs:

```bash
docker compose logs -f
```

Stop:

```bash
docker compose down
```

## Running with Docker

```bash
docker build -t wallet-monitor .
docker run -d --name wallet-monitor --env-file .env --restart unless-stopped wallet-monitor
```

## Running Locally

```bash
npm install
npm run build
npm start
```

Or with ts-node for development:

```bash
npm install
npm run dev
```
