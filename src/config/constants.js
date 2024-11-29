const TRADING_CONFIG = {
  MIN_PROFIT_THRESHOLD: 0.001, // 0.1% minimum profit
  MAX_TRADE_AMOUNT: 1000, // Maximum USD trade amount
  PRICE_TOLERANCE: 0.002, // 0.2% price slippage tolerance
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // ms
};

const PAIRS = [
  'BTC/USD',
  'BTC/USDT',
  'ETH/USD',
  'ETH/USDT',
  'SOL/USD',
  'SOL/USDT',
  'XRP/USD',
  'XRP/USDT',
  'DOGE/USD',
  'DOGE/USDT'
];

module.exports = {
  TRADING_CONFIG,
  PAIRS
};