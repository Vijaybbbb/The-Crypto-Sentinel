const axios = require('axios');
const { COINGECKO_API } = require('../config/env');
const { mapAlerts, mapPrices } = require('../config/db');
const { handleError } = require('../utils/errorHandler');

/**
 * Fetch Cryptocurrency Prices Service
 * @returns {object} Price data from CoinGecko API
 */
const fetchPrices = async () => {
  try {
    const arrCryptocurrencies = [...new Set(Array.from(mapAlerts.values()).map(objAlert => objAlert.cryptocurrency))];
    
    if (arrCryptocurrencies.length === 0) return;

    const objResponse = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: arrCryptocurrencies.join(','),
        vs_currencies: 'usd'
      }
    });

    Object.entries(objResponse.data).forEach(([strCrypto, objData]) => {
      mapPrices.set(strCrypto, objData.usd);
    });

    return objResponse.data;
  } catch (objError) {
    console.error('Service Error:', objError);
    throw objError;
  }
};

module.exports = {
  fetchPrices
};