require('dotenv').config();
const KrakenService = require('./services/krakenService');
const ArbitrageService = require('./services/arbitrageService');
const RiskManager = require('./utils/riskManager');
const logger = require('./utils/logger');
const { PAIRS } = require('./config/constants');

async function main() {
  try {
    const krakenService = new KrakenService(
      process.env.KRAKEN_API_KEY,
      process.env.KRAKEN_API_SECRET
    );
    
    const arbitrageService = new ArbitrageService(krakenService);
    const riskManager = new RiskManager();

    logger.info('Starting arbitrage bot...');

    // Main trading loop
    setInterval(async () => {
      try {
        const opportunities = await arbitrageService.findArbitrageOpportunities(PAIRS);
        
        for (const opportunity of opportunities) {
          if (riskManager.assessRisk(opportunity)) {
            logger.info('Executing arbitrage opportunity:', opportunity);
            const result = await arbitrageService.executeArbitrage(opportunity);
            
            if (result) {
              const profit = opportunity.profit;
              riskManager.updateMetrics(profit);
              logger.info(`Arbitrage executed successfully. Profit: ${profit}`);
            }
          }
        }
      } catch (error) {
        logger.error('Error in main loop:', error);
      }
    }, 1000); // Check every second

    // Reset risk metrics daily
    setInterval(() => {
      riskManager.resetDaily();
      logger.info('Daily risk metrics reset');
    }, 24 * 60 * 60 * 1000);

  } catch (error) {
    logger.error('Fatal error:', error);
    process.exit(1);
  }
}

main().catch(console.error);