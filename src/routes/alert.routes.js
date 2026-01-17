const express = require('express');
const alertController = require('../controllers/alert.controller');

const router = express.Router();
// create alert 
router.post('/alerts', alertController.createAlert);
// get all alerts
router.get('/alerts', alertController.getAlerts);
// delete alert
router.delete('/alerts/:id', alertController.deleteAlert);

module.exports = router;