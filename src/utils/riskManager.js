const logger = require('./logger');
const { TRADING_CONFIG } = require('../config/constants');

class RiskManager {
  constructor() {
    this.dailyLoss = 0;
    this.dailyProfit = 0;
    this.tradingEnabled = true;
  }

  assessRisk(opportunity) {
    if (!this.tradingEnabled) {
      return false;
    }

    // Check if potential loss exceeds daily limit
    if (this.dailyLoss > TRADING_CONFIG.MAX_DAILY_LOSS) {
      logger.warn('Daily loss limit exceeded, trading disabled');
      this.tradingEnabled = false;
      return false;
    }

    // Validate opportunity size
    if (opportunity.profit < TRADING_CONFIG.MIN_PROFIT_THRESHOLD) {
      return false;
    }

    return true;
  }

  updateMetrics(profit) {
    if (profit < 0) {
      this.dailyLoss += Math.abs(profit);
    } else {
      this.dailyProfit += profit;
    }
  }

  resetDaily() {
    this.dailyLoss = 0;
    this.dailyProfit = 0;
    this.tradingEnabled = true;
  }
}

module.exports = RiskManager;