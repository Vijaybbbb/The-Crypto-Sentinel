const objAlertBusiness = require('../business/alert.business');

/**
 * Create Alert API
 * @route POST /alerts
 * @param {string} cryptocurrency - Cryptocurrency ID (e.g., "bitcoin")
 * @param {number} targetPrice - Target price for alert
 * @param {string} condition - "above" or "below"
 * @returns {object} Created alert with id, status, createdAt
 */
const createAlert = (req, res) => {
  try {
    const { cryptocurrency: strCryptocurrency, targetPrice: numTargetPrice, condition: strCondition = 'above' } = req.body;
    
    if (!strCryptocurrency || !numTargetPrice) {
      return res.status(400).json({ error: 'cryptocurrency and targetPrice are required' });
    }
    
    if (!['above', 'below'].includes(strCondition)) {
      return res.status(400).json({ error: 'condition must be "above" or "below"' });
    }
    
    const objAlert = objAlertBusiness.createAlert({ strCryptocurrency, numTargetPrice, strCondition });
    res.status(201).json(objAlert);
  } catch (objError) {
    console.error('Controller Error:', objError);
    res.status(objError.status || 500).json({ error: objError.message });
  }
};

/**
 * Get All Alerts API
 * @route GET /alerts
 * @returns {array} Array of alerts with current prices
 */
const getAlerts = (req, res) => {
  try {
    const arrAlertList = objAlertBusiness.getAlerts();
    res.json(arrAlertList);
  } catch (objError) {
    console.error('Controller Error:', objError);
    res.status(objError.status || 500).json({ error: objError.message });
  }
};

/**
 * Delete Alert API
 * @route DELETE /alerts/:id
 * @param {string} id - Alert ID to delete
 * @returns {void} 204 No Content on success
 */
const deleteAlert = (req, res) => {
  try {
    const { id: strId } = req.params;
    const objResult  = objAlertBusiness.deleteAlert(strId);
    res.status(201).json(objResult);
  } catch (objError) {
    console.error('Controller Error:', objError);
    res.status(objError.status || 500).json({ error: objError.message });
  }
};

module.exports = {
  createAlert,
  getAlerts,
  deleteAlert
};