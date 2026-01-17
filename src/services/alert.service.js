const { v4: uuidv4 } = require('uuid');
const { mapAlerts, mapPrices, ALERT_STATUS } = require('../config/db');
const { handleError } = require('../utils/errorHandler');

/**
 * Create Alert Service
 * @param {object} objAlertData - Alert data with strCryptocurrency, numTargetPrice, strCondition
 * @returns {object} Created alert with id, cryptocurrency, targetPrice, condition, status, createdAt
 */
const createAlert = (objAlertData) => {
  try {
    const objAlert = {
      id: uuidv4(),
      cryptocurrency: objAlertData.strCryptocurrency.toLowerCase(),
      targetPrice: parseFloat(objAlertData.numTargetPrice),
      condition: objAlertData.strCondition,
      status: ALERT_STATUS.ACTIVE,
      createdAt: new Date().toISOString()
    };

    mapAlerts.set(objAlert.id, objAlert);
    return objAlert;
  } catch (objError) {
    console.error('Service Error:', objError);
    throw objError;
  }
};

/**
 * Get All Alerts Service
 * @returns {array} Array of alerts with currentPrice field added
 */
const getAlerts = () => {
  try {
    return Array.from(mapAlerts.values()).map(objAlert => ({
      ...objAlert,
      currentPrice: mapPrices.get(objAlert.cryptocurrency) || null
    }));
  } catch (objError) {
    console.error('Service Error:', objError);
    throw objError;
  }
};

/**
 * Delete Alert Service
 * @param {string} strId - Alert ID to delete
 * @returns {boolean} True if deleted successfully
 * @throws {Error} 404 error if alert not found
 */
const deleteAlert = (strId) => {
  try {
    if (!mapAlerts.has(strId)) {
      return {
        strMessage : "Not Found"
      }
    }
    mapAlerts.delete(strId);
    return {
        strMessage : "Deleted"
      }
  } catch (objError) {
    console.error('Service Error:', objError);
    throw objError;
  }
};

/**
 * Check Alerts Service - Monitors prices and triggers alerts
 * @returns {void} Logs triggered alerts to console
 */
const checkAlerts = () => {
  try {
    mapAlerts.forEach((objAlert) => {
      if (objAlert.status !== ALERT_STATUS.ACTIVE) return;

      const numCurrentPrice = mapPrices.get(objAlert.cryptocurrency);
      if (!numCurrentPrice) return;

      const boolShouldTrigger = objAlert.condition === 'above' 
        ? numCurrentPrice >= objAlert.targetPrice
        : numCurrentPrice <= objAlert.targetPrice;

      if (boolShouldTrigger) {
        objAlert.status = ALERT_STATUS.TRIGGERED;
        const strDirection = objAlert.condition === 'above' ? 'reached above' : 'dropped below';
        console.log(`🚨 ALERT TRIGGERED: ${objAlert.cryptocurrency.toUpperCase()} ${strDirection} $${objAlert.targetPrice} (current: $${numCurrentPrice})`);
      }
    });
  } catch (objError) {
    console.error('Service Error:', objError);
  }
};

module.exports = {
  createAlert,
  getAlerts,
  deleteAlert,
  checkAlerts
};