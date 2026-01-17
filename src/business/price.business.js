const objPriceService = require('../services/price.service');
const { handleError: fnHandleError } = require('../utils/errorHandler');

/**
 * Fetch Cryptocurrency Prices Business Logic
 * @returns {object} Price data from CoinGecko API
 */
const fetchPrices = async () => {
  try {
    return await objPriceService.fetchPrices();
  } catch (objError) {
    fnHandleError(objError, 'Fetch Prices Business');
  }
};

module.exports = {
  fetchPrices
};