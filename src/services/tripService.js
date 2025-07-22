// Mock train trip data
const mockTrips = [
  {
    id: 'trip_001',
    origin: {
      id: 'station_nyc',
      name: 'New York Central',
      timezone: 'America/New_York'
    },
    destination: {
      id: 'station_bos',
      name: 'Boston South',
      timezone: 'America/New_York'
    },
    departure: {
      scheduled: '2024-01-15T08:00:00-05:00',
      actual: '2024-01-15T08:02:00-05:00'
    },
    arrival: {
      scheduled: '2024-01-15T12:30:00-05:00',
      actual: null
    },
    duration: '4h 30m',
    train: {
      number: 'NE001',
      type: 'High Speed'
    },
    amenities: {
      bicycles: true,
      dogs: true,
      wifi: true,
      food: true
    },
    stops: [
      { id: 'station_nyc', name: 'New York Central', arrival: null, departure: '08:00:00' },
      { id: 'station_hfd', name: 'Hartford', arrival: '10:15:00', departure: '10:18:00' },
      { id: 'station_bos', name: 'Boston South', arrival: '12:30:00', departure: null }
    ]
  },
  {
    id: 'trip_002',
    origin: {
      id: 'station_nyc',
      name: 'New York Central',
      timezone: 'America/New_York'
    },
    destination: {
      id: 'station_bos',
      name: 'Boston South',
      timezone: 'America/New_York'
    },
    departure: {
      scheduled: '2024-01-15T14:30:00-05:00',
      actual: null
    },
    arrival: {
      scheduled: '2024-01-15T19:15:00-05:00',
      actual: null
    },
    duration: '4h 45m',
    train: {
      number: 'NE003',
      type: 'Regional'
    },
    amenities: {
      bicycles: false,
      dogs: true,
      wifi: true,
      food: false
    },
    stops: [
      { id: 'station_nyc', name: 'New York Central', arrival: null, departure: '14:30:00' },
      { id: 'station_hfd', name: 'Hartford', arrival: '16:45:00', departure: '16:48:00' },
      { id: 'station_spr', name: 'Springfield', arrival: '17:30:00', departure: '17:33:00' },
      { id: 'station_bos', name: 'Boston South', arrival: '19:15:00', departure: null }
    ]
  },
  {
    id: 'trip_003',
    origin: {
      id: 'station_nyc',
      name: 'New York Central',
      timezone: 'America/New_York'
    },
    destination: {
      id: 'station_bos',
      name: 'Boston South',
      timezone: 'America/New_York'
    },
    departure: {
      scheduled: '2024-01-15T18:00:00-05:00',
      actual: null
    },
    arrival: {
      scheduled: '2024-01-15T22:30:00-05:00',
      actual: null
    },
    duration: '4h 30m',
    train: {
      number: 'NE005',
      type: 'Express'
    },
    amenities: {
      bicycles: true,
      dogs: false,
      wifi: true,
      food: true
    },
    stops: [
      { id: 'station_nyc', name: 'New York Central', arrival: null, departure: '18:00:00' },
      { id: 'station_bos', name: 'Boston South', arrival: '22:30:00', departure: null }
    ]
  },
  {
    id: 'trip_004',
    origin: {
      id: 'station_bos',
      name: 'Boston South',
      timezone: 'America/New_York'
    },
    destination: {
      id: 'station_nyc',
      name: 'New York Central',
      timezone: 'America/New_York'
    },
    departure: {
      scheduled: '2024-01-15T09:00:00-05:00',
      actual: '2024-01-15T09:05:00-05:00'
    },
    arrival: {
      scheduled: '2024-01-15T13:30:00-05:00',
      actual: null
    },
    duration: '4h 30m',
    train: {
      number: 'NE002',
      type: 'High Speed'
    },
    amenities: {
      bicycles: true,
      dogs: true,
      wifi: true,
      food: true
    },
    stops: [
      { id: 'station_bos', name: 'Boston South', arrival: null, departure: '09:00:00' },
      { id: 'station_hfd', name: 'Hartford', arrival: '11:15:00', departure: '11:18:00' },
      { id: 'station_nyc', name: 'New York Central', arrival: '13:30:00', departure: null }
    ]
  }
];

class TripService {
  getAllTrips() {
    return mockTrips;
  }

  findTrips(filters) {
    let filteredTrips = [...mockTrips];

    // Filter by origin
    if (filters.origin) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.origin.id === filters.origin
      );
    }

    // Filter by destination
    if (filters.destination) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.destination.id === filters.destination
      );
    }

    // Filter by date (assuming date format is YYYY-MM-DD)
    if (filters.date) {
      filteredTrips = filteredTrips.filter(trip => {
        const tripDate = trip.departure.scheduled.split('T')[0];
        return tripDate === filters.date;
      });
    }

    // Filter by bicycle availability
    if (filters.bicycles === 'true') {
      filteredTrips = filteredTrips.filter(trip => 
        trip.amenities.bicycles === true
      );
    }

    // Filter by dog availability
    if (filters.dogs === 'true') {
      filteredTrips = filteredTrips.filter(trip => 
        trip.amenities.dogs === true
      );
    }

    return filteredTrips;
  }

  paginateTrips(trips, page = 1, limit = 100) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      trips: trips.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(trips.length / limit),
        totalItems: trips.length,
        itemsPerPage: limit,
        hasNextPage: endIndex < trips.length,
        hasPreviousPage: page > 1
      }
    };
  }
}

module.exports = new TripService();