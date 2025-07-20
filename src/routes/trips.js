const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/tripsController');

// GET /trips - Retrieve train trips between origin and destination
router.get('/', tripsController.getTrips);

module.exports = router;