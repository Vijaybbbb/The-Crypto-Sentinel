const objPriceBusiness = require('../business/price.business');
const { checkAlerts: fnCheckAlerts } = require('../services/alert.service');
const { PRICE_CHECK_INTERVAL } = require('../config/env');

const startPriceMonitoring = () => {
  try {
    const fnMonitorPrices = async () => {
      try {
        await objPriceBusiness.fetchPrices();
        fnCheckAlerts();
      } catch (objError) {
        console.error('Price Monitor Error:', objError);
      }
    };

    setInterval(fnMonitorPrices, PRICE_CHECK_INTERVAL);
    console.log(`Price monitoring started - checking every ${PRICE_CHECK_INTERVAL / 1000} seconds`);
  } catch (objError) {
    console.error('Start Price Monitoring Error:', objError);
  }
};

module.exports = {
  startPriceMonitoring
};