const KrakenClient = require('kraken-api');
const { TRADING_CONFIG } = require('../config/constants');
const logger = require('../utils/logger');

class KrakenService {
  constructor(apiKey, apiSecret) {
    this.client = new KrakenClient(apiKey, apiSecret);
  }

  async getTicker(pair) {
    try {
      const response = await this.client.api('Ticker', { pair });
      return {
        ask: parseFloat(response.result[pair].a[0]),
        bid: parseFloat(response.result[pair].b[0])
      };
    } catch (error) {
      logger.error(`Error fetching ticker for ${pair}:`, error);
      throw error;
    }
  }

  async executeOrder(pair, type, price, volume) {
    try {
      const order = await this.client.api('AddOrder', {
        pair,
        type,
        ordertype: 'limit',
        price,
        volume
      });
      logger.info(`Order executed: ${type} ${volume} ${pair} @ ${price}`);
      return order;
    } catch (error) {
      logger.error(`Error executing order:`, error);
      throw error;
    }
  }

  async getBalance() {
    try {
      const balance = await this.client.api('Balance');
      return balance.result;
    } catch (error) {
      logger.error('Error fetching balance:', error);
      throw error;
    }
  }
}

module.exports = KrakenService;