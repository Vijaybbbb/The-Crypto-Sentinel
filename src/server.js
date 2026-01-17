const { PORT } = require('./config/env');
const { startPriceMonitoring: fnStartPriceMonitoring } = require('./jobs/priceMonitor.job');
const objApp = require('./app');

objApp.listen(PORT, () => {
  console.log(`Crypto Sentinel API running on port ${PORT}`);
  fnStartPriceMonitoring();
});