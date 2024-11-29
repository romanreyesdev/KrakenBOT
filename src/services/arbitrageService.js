const Decimal = require('decimal.js');
const { TRADING_CONFIG } = require('../config/constants');
const logger = require('../utils/logger');

class ArbitrageService {
  constructor(krakenService) {
    this.krakenService = krakenService;
  }

  async findArbitrageOpportunities(pairs) {
    const opportunities = [];
    
    for (const pair of pairs) {
      try {
        const ticker = await this.krakenService.getTicker(pair);
        const spread = new Decimal(ticker.bid).minus(ticker.ask);
        const potentialProfit = spread.times(TRADING_CONFIG.MAX_TRADE_AMOUNT);
        
        if (potentialProfit.greaterThan(TRADING_CONFIG.MIN_PROFIT_THRESHOLD)) {
          opportunities.push({
            pair,
            spread: spread.toNumber(),
            profit: potentialProfit.toNumber(),
            timestamp: new Date(),
            askPrice: ticker.ask,
            bidPrice: ticker.bid
          });
        }
      } catch (error) {
        logger.error(`Error analyzing ${pair}:`, error);
      }
    }
    
    return opportunities;
  }

  async executeArbitrage(opportunity) {
    try {
      // Verify prices haven't moved significantly
      const currentTicker = await this.krakenService.getTicker(opportunity.pair);
      const priceDeviation = Math.abs(
        (currentTicker.ask - opportunity.askPrice) / opportunity.askPrice
      );

      if (priceDeviation > TRADING_CONFIG.PRICE_TOLERANCE) {
        logger.warn('Price moved too much, aborting arbitrage');
        return false;
      }

      // Execute trades
      const buyOrder = await this.krakenService.executeOrder(
        opportunity.pair,
        'buy',
        opportunity.askPrice,
        TRADING_CONFIG.MAX_TRADE_AMOUNT / opportunity.askPrice
      );

      const sellOrder = await this.krakenService.executeOrder(
        opportunity.pair,
        'sell',
        opportunity.bidPrice,
        TRADING_CONFIG.MAX_TRADE_AMOUNT / opportunity.bidPrice
      );

      return { buyOrder, sellOrder };
    } catch (error) {
      logger.error('Error executing arbitrage:', error);
      throw error;
    }
  }
}

module.exports = ArbitrageService;