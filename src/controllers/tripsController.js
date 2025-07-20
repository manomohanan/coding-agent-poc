const Joi = require('joi');
const tripService = require('../services/tripService');

// Validation schema for trip query parameters
const tripQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(100),
  origin: Joi.string().required().messages({
    'string.empty': 'Origin station ID is required',
    'any.required': 'Origin station ID is required'
  }),
  destination: Joi.string().required().messages({
    'string.empty': 'Destination station ID is required',
    'any.required': 'Destination station ID is required'
  }),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    'string.pattern.base': 'Date must be in YYYY-MM-DD format',
    'any.required': 'Trip date is required'
  }),
  bicycles: Joi.string().valid('true', 'false').optional(),
  dogs: Joi.string().valid('true', 'false').optional()
});

class TripsController {
  async getTrips(req, res) {
    try {
      // Validate query parameters
      const { error, value: validatedQuery } = tripQuerySchema.validate(req.query, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true
      });

      if (error) {
        const errorMessages = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }));
        
        return res.status(400).json({
          error: 'Invalid query parameters',
          details: errorMessages
        });
      }

      // Extract validated parameters
      const { page, limit, origin, destination, date, bicycles, dogs } = validatedQuery;

      // Find trips based on filters
      const filteredTrips = tripService.findTrips({
        origin,
        destination,
        date,
        bicycles,
        dogs
      });

      // Apply pagination
      const result = tripService.paginateTrips(filteredTrips, page, limit);

      // Response format
      const response = {
        data: result.trips,
        pagination: result.pagination,
        filters: {
          origin,
          destination,
          date,
          ...(bicycles && { bicycles }),
          ...(dogs && { dogs })
        },
        timestamp: new Date().toISOString()
      };

      res.status(200).json(response);

    } catch (error) {
      console.error('Error in getTrips:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to retrieve trips'
      });
    }
  }
}

module.exports = new TripsController();