# Kraken Arbitrage Bot

An automated cryptocurrency arbitrage trading bot for the Kraken exchange that identifies and executes profitable trading opportunities between USD and USDT pairs.

## Features

- **Real-time Price Monitoring**: Continuously tracks price differences between USD and USDT trading pairs
- **Smart Arbitrage Detection**: Identifies profitable opportunities considering fees and slippage
- **Risk Management**: Implements sophisticated risk controls and position sizing
- **Automated Trading**: Executes trades automatically when profitable opportunities arise
- **Comprehensive Logging**: Detailed logging system for monitoring and analysis
- **Error Handling**: Robust error handling and automatic recovery mechanisms

## Supported Trading Pairs

- BTC/USD - BTC/USDT
- ETH/USD - ETH/USDT
- SOL/USD - SOL/USDT
- XRP/USD - XRP/USDT
- DOGE/USD - DOGE/USDT

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Kraken API credentials

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kraken-arbitrage-bot.git
cd kraken-arbitrage-bot
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your Kraken API credentials:
```env
KRAKEN_API_KEY=your_api_key_here
KRAKEN_API_SECRET=your_api_secret_here
```

## Configuration

The bot's behavior can be customized through the `src/config/constants.js` file:

- `MIN_PROFIT_THRESHOLD`: Minimum profit percentage to execute trades (default: 0.1%)
- `MAX_TRADE_AMOUNT`: Maximum trade size in USD (default: 1000)
- `PRICE_TOLERANCE`: Maximum allowed price slippage (default: 0.2%)
- `RETRY_ATTEMPTS`: Number of retry attempts for failed operations
- `RETRY_DELAY`: Delay between retry attempts in milliseconds

## Usage

Start the bot:
```bash
npm start
```

Run tests:
```bash
npm test
```

## Project Structure

```
├── src/
│   ├── config/
│   │   └── constants.js     # Configuration constants
│   ├── services/
│   │   ├── krakenService.js # Kraken API integration
│   │   └── arbitrageService.js # Arbitrage logic
│   ├── utils/
│   │   ├── logger.js        # Logging utility
│   │   └── riskManager.js   # Risk management
│   └── index.js             # Application entry point
├── .env                     # Environment variables
├── package.json
└── README.md
```

## How It Works

1. **Price Monitoring**
   - Continuously fetches real-time prices for configured trading pairs
   - Calculates price differences between USD and USDT pairs

2. **Opportunity Detection**
   - Analyzes price differences to identify profitable trades
   - Considers trading fees and potential slippage
   - Validates opportunities against minimum profit threshold

3. **Risk Assessment**
   - Evaluates market conditions and liquidity
   - Checks position sizes against risk limits
   - Monitors daily profit/loss metrics

4. **Trade Execution**
   - Verifies prices before execution
   - Places synchronized buy/sell orders
   - Implements retry mechanism for failed operations

## Logging

The bot maintains two log files:
- `combined.log`: All log entries
- `error.log`: Error-level logs only

Logs include:
- Trade opportunities detected
- Executed trades
- Error messages
- System status updates

## Risk Management

The bot implements several risk management features:
- Maximum trade size limits
- Daily loss limits
- Price slippage protection
- Automatic trading suspension on excessive losses

## Error Handling

- Automatic retry for failed API calls
- Graceful error recovery
- Detailed error logging
- System state monitoring

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- API keys should be kept secure and never committed to version control
- Use environment variables for sensitive configuration
- Implement IP whitelisting on Kraken API keys
- Regular security audits recommended

## Disclaimer

This bot is provided for educational purposes only. Cryptocurrency trading carries significant risks. Use at your own risk. The authors are not responsible for any financial losses incurred while using this software.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.