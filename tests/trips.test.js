const request = require('supertest');
const app = require('../src/app');

describe('Train Trip API', () => {
  const validAuthHeader = { Authorization: 'Bearer valid-test-token-12345' };
  
  describe('GET /trips', () => {
    test('should require authentication', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15');
      
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Authentication required');
    });

    test('should return 401 for invalid token format', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15')
        .set('Authorization', 'InvalidFormat token');
      
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid authentication format');
    });

    test('should return 401 for invalid token', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15')
        .set('Authorization', 'Bearer short');
      
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid token');
    });

    test('should return 400 for missing required parameters', async () => {
      const response = await request(app)
        .get('/trips')
        .set(validAuthHeader);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid query parameters');
      expect(response.body.details).toHaveLength(3); // origin, destination, date
    });

    test('should return 400 for invalid date format', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=invalid-date')
        .set(validAuthHeader);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid query parameters');
      expect(response.body.details.some(d => d.message.includes('Date must be in YYYY-MM-DD format'))).toBe(true);
    });

    test('should return trips between origin and destination', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15')
        .set(validAuthHeader);
      
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      
      // Verify each trip has required structure
      response.body.data.forEach(trip => {
        expect(trip).toHaveProperty('id');
        expect(trip).toHaveProperty('origin');
        expect(trip).toHaveProperty('destination');
        expect(trip).toHaveProperty('departure');
        expect(trip).toHaveProperty('arrival');
        expect(trip).toHaveProperty('train');
        expect(trip).toHaveProperty('amenities');
        expect(trip).toHaveProperty('stops');
        
        // Verify origin and destination match request
        expect(trip.origin.id).toBe('station_nyc');
        expect(trip.destination.id).toBe('station_bos');
      });
    });

    test('should include pagination information', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15&page=1&limit=2')
        .set(validAuthHeader);
      
      expect(response.status).toBe(200);
      expect(response.body.pagination).toHaveProperty('currentPage', 1);
      expect(response.body.pagination).toHaveProperty('totalPages');
      expect(response.body.pagination).toHaveProperty('totalItems');
      expect(response.body.pagination).toHaveProperty('itemsPerPage', 2);
      expect(response.body.pagination).toHaveProperty('hasNextPage');
      expect(response.body.pagination).toHaveProperty('hasPreviousPage', false);
    });

    test('should filter trips by bicycle availability', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15&bicycles=true')
        .set(validAuthHeader);
      
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      
      // All returned trips should allow bicycles
      response.body.data.forEach(trip => {
        expect(trip.amenities.bicycles).toBe(true);
      });
    });

    test('should filter trips by dog availability', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15&dogs=true')
        .set(validAuthHeader);
      
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      
      // All returned trips should allow dogs
      response.body.data.forEach(trip => {
        expect(trip.amenities.dogs).toBe(true);
      });
    });

    test('should filter trips by both bicycle and dog availability', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15&bicycles=true&dogs=true')
        .set(validAuthHeader);
      
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      
      // All returned trips should allow both bicycles and dogs
      response.body.data.forEach(trip => {
        expect(trip.amenities.bicycles).toBe(true);
        expect(trip.amenities.dogs).toBe(true);
      });
    });

    test('should return empty array for no matching trips', async () => {
      const response = await request(app)
        .get('/trips?origin=nonexistent&destination=station_bos&date=2024-01-15')
        .set(validAuthHeader);
      
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBe(0);
    });

    test('should include filters in response', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15&bicycles=true')
        .set(validAuthHeader);
      
      expect(response.status).toBe(200);
      expect(response.body.filters).toEqual({
        origin: 'station_nyc',
        destination: 'station_bos',
        date: '2024-01-15',
        bicycles: 'true'
      });
    });

    test('should validate page and limit parameters', async () => {
      const response = await request(app)
        .get('/trips?origin=station_nyc&destination=station_bos&date=2024-01-15&page=0&limit=101')
        .set(validAuthHeader);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid query parameters');
    });
  });

  describe('GET /health', () => {
    test('should return health status without authentication', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('404 handler', () => {
    test('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .set(validAuthHeader);
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Endpoint not found');
    });
  });
});