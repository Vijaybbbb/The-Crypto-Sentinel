const alertBusiness = require('../business/alert.business');
const alertService = require('../services/alert.service');

jest.mock('../services/alert.service');

describe('Alert Business Layer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAlert', () => {
    it('should call alert service createAlert', () => {
      const alertData = {
        strCryptocurrency: 'bitcoin',
        numTargetPrice: 50000,
        strCondition: 'above'
      };

      const mockAlert = { id: '123', ...alertData };
      alertService.createAlert.mockReturnValue(mockAlert);

      const result = alertBusiness.createAlert(alertData);

      expect(alertService.createAlert).toHaveBeenCalledWith(alertData);
      expect(result).toEqual(mockAlert);
    });
  });

  describe('getAlerts', () => {
    it('should call alert service getAlerts', () => {
      const mockAlerts = [{ id: '123', cryptocurrency: 'bitcoin' }];
      alertService.getAlerts.mockReturnValue(mockAlerts);

      const result = alertBusiness.getAlerts();

      expect(alertService.getAlerts).toHaveBeenCalled();
      expect(result).toEqual(mockAlerts);
    });
  });

  describe('deleteAlert', () => {
    it('should call alert service deleteAlert', () => {
      const alertId = '123';
      alertService.deleteAlert.mockReturnValue(true);

      const result = alertBusiness.deleteAlert(alertId);

      expect(alertService.deleteAlert).toHaveBeenCalledWith(alertId);
      expect(result).toBe(true);
    });
  });
});