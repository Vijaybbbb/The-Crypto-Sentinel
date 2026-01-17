const { mapAlerts, mapPrices, ALERT_STATUS } = require('../config/db');
const { createAlert, getAlerts, deleteAlert, checkAlerts } = require('../services/alert.service');

describe('Alert Service', () => {
  beforeEach(() => {
    mapAlerts.clear();
    mapPrices.clear();
  });

  describe('createAlert', () => {
    it('should create alert with correct properties', () => {
      const alertData = {
        strCryptocurrency: 'bitcoin',
        numTargetPrice: 50000,
        strCondition: 'above'
      };

      const alert = createAlert(alertData);

      expect(alert).toHaveProperty('id');
      expect(alert.cryptocurrency).toBe('bitcoin');
      expect(alert.targetPrice).toBe(50000);
      expect(alert.condition).toBe('above');
      expect(alert.status).toBe(ALERT_STATUS.ACTIVE);
    });

    it('should store alert in mapAlerts', () => {
      const alertData = {
        strCryptocurrency: 'ethereum',
        numTargetPrice: 3000,
        strCondition: 'below'
      };

      const alert = createAlert(alertData);
      
      expect(mapAlerts.has(alert.id)).toBe(true);
    });
  });

  describe('getAlerts', () => {
    it('should return empty array when no alerts', () => {
      const alerts = getAlerts();
      expect(alerts).toEqual([]);
    });

    it('should return alerts with current prices', () => {
      const alert = createAlert({
        strCryptocurrency: 'bitcoin',
        numTargetPrice: 50000,
        strCondition: 'above'
      });

      mapPrices.set('bitcoin', 45000);

      const alerts = getAlerts();
      
      expect(alerts).toHaveLength(1);
      expect(alerts[0].currentPrice).toBe(45000);
    });
  });

  describe('deleteAlert', () => {
    it('should delete existing alert', () => {
      const alert = createAlert({
        strCryptocurrency: 'bitcoin',
        numTargetPrice: 50000,
        strCondition: 'above'
      });

      const result = deleteAlert(alert.id);
      
      expect(result).toBe(true);
      expect(mapAlerts.has(alert.id)).toBe(false);
    });

    it('should throw error for non-existent alert', () => {
      expect(() => {
        deleteAlert('non-existent-id');
      }).toThrow('Alert not found');
    });
  });

  describe('checkAlerts', () => {
    it('should trigger alert when price above target', () => {
      const alert = createAlert({
        strCryptocurrency: 'bitcoin',
        numTargetPrice: 50000,
        strCondition: 'above'
      });

      mapPrices.set('bitcoin', 55000);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      checkAlerts();
      
      expect(mapAlerts.get(alert.id).status).toBe(ALERT_STATUS.TRIGGERED);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('ALERT TRIGGERED')
      );
      
      consoleSpy.mockRestore();
    });

    it('should trigger alert when price below target', () => {
      const alert = createAlert({
        strCryptocurrency: 'bitcoin',
        numTargetPrice: 50000,
        strCondition: 'below'
      });

      mapPrices.set('bitcoin', 45000);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      checkAlerts();
      
      expect(mapAlerts.get(alert.id).status).toBe(ALERT_STATUS.TRIGGERED);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('dropped below')
      );
      
      consoleSpy.mockRestore();
    });

    it('should not trigger when condition not met', () => {
      const alert = createAlert({
        strCryptocurrency: 'bitcoin',
        numTargetPrice: 50000,
        strCondition: 'above'
      });

      mapPrices.set('bitcoin', 45000);
      
      checkAlerts();
      
      expect(mapAlerts.get(alert.id).status).toBe(ALERT_STATUS.ACTIVE);
    });
  });
});