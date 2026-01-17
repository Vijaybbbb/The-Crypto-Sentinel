// In-memory storage using Maps
const mapAlerts = new Map();
const mapPrices = new Map();

// Alert statuses
const ALERT_STATUS = {
  ACTIVE: 'ACTIVE',
  TRIGGERED: 'TRIGGERED'
};

module.exports = {
  mapAlerts,
  mapPrices,
  ALERT_STATUS
};