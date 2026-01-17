const objAlertService = require('../services/alert.service');
const { handleError: fnHandleError } = require('../utils/errorHandler');

/**
 * Create Alert Business Logic
 * @param {object} objAlertData - Alert data with strCryptocurrency, numTargetPrice, strCondition
 * @returns {object} Created alert object
 */
const createAlert = (objAlertData) => {
  try {
    return objAlertService.createAlert(objAlertData);
  } catch (objError) {
    fnHandleError(objError, 'Create Alert Business');
  }
};

/**
 * Get All Alerts Business Logic
 * @returns {array} Array of alerts with current prices
 */
const getAlerts = () => {
  try {
    return objAlertService.getAlerts();
  } catch (objError) {
    fnHandleError(objError, 'Get Alerts Business');
  }
};

/**
 * Delete Alert Business Logic
 * @param {string} strId - Alert ID to delete
 * @returns {boolean} Success status
 */
const deleteAlert = (strId) => {
  try {
    return objAlertService.deleteAlert(strId);
  } catch (objError) {
    fnHandleError(objError, 'Delete Alert Business');
  }
};

module.exports = {
  createAlert,
  getAlerts,
  deleteAlert
};