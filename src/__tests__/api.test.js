const request = require('supertest');
const app = require('../app');
const { mapAlerts, mapPrices } = require('../config/db');

describe('Alert API Endpoints', () => {
  beforeEach(() => {
    mapAlerts.clear();
    mapPrices.clear();
  });

  describe('POST /alerts', () => {
    it('should create a new alert', async () => {
      const alertData = {
        cryptocurrency: 'bitcoin',
        targetPrice: 50000,
        condition: 'above'
      };

      const response = await request(app)
        .post('/alerts')
        .send(alertData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.cryptocurrency).toBe('bitcoin');
      expect(response.body.targetPrice).toBe(50000);
      expect(response.body.condition).toBe('above');
      expect(response.body.status).toBe('ACTIVE');
    });

    it('should return 400 for missing cryptocurrency', async () => {
      const alertData = {
        targetPrice: 50000,
        condition: 'above'
      };

      const response = await request(app)
        .post('/alerts')
        .send(alertData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid condition', async () => {
      const alertData = {
        cryptocurrency: 'bitcoin',
        targetPrice: 50000,
        condition: 'invalid'
      };

      const response = await request(app)
        .post('/alerts')
        .send(alertData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /alerts', () => {
    it('should return empty array when no alerts', async () => {
      const response = await request(app)
        .get('/alerts')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all alerts', async () => {
      await request(app)
        .post('/alerts')
        .send({
          cryptocurrency: 'bitcoin',
          targetPrice: 50000,
          condition: 'above'
        });

      const response = await request(app)
        .get('/alerts')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('id');
    });
  });

  describe('DELETE /alerts/:id', () => {
    it('should delete an existing alert', async () => {
      const createResponse = await request(app)
        .post('/alerts')
        .send({
          cryptocurrency: 'bitcoin',
          targetPrice: 50000,
          condition: 'above'
        });

      const alertId = createResponse.body.id;

      await request(app)
        .delete(`/alerts/${alertId}`)
        .expect(204);

      const getResponse = await request(app)
        .get('/alerts')
        .expect(200);

      expect(getResponse.body).toHaveLength(0);
    });

    it('should return 404 for non-existent alert', async () => {
      const response = await request(app)
        .delete('/alerts/non-existent-id')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});