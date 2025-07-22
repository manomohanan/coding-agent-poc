# Train Trip API

A RESTful API for retrieving train trips between origin and destination stations.

## Features

- 🚆 Retrieve all available trips between specified stations
- 🔒 OAuth2 authentication required
- 📅 Filter trips by date
- 🚲 Optional bicycle availability filtering
- 🐕 Optional dog-friendly filtering
- 📄 Pagination support
- ✅ Comprehensive input validation
- 🛡️ Security middleware (Helmet, CORS)

## API Endpoints

### GET /trips

Retrieve train trips between origin and destination stations.

**Authentication:** Required (Bearer token)

**Query Parameters:**
- `origin` (required): Origin station ID
- `destination` (required): Destination station ID  
- `date` (required): Trip date in YYYY-MM-DD format (ISO 8601)
- `page` (optional): Page number for pagination (default: 1, min: 1)
- `limit` (optional): Items per page (default: 100, min: 1, max: 100)
- `bicycles` (optional): Filter by bicycle availability ("true" or "false")
- `dogs` (optional): Filter by dog-friendly trips ("true" or "false")

**Example Request:**
```bash
curl -H "Authorization: Bearer your-token" \
  "http://localhost:3000/trips?origin=station_nyc&destination=station_bos&date=2024-01-15&bicycles=true&dogs=true&page=1&limit=10"
```

**Example Response:**
```json
{
  "data": [
    {
      "id": "trip_001",
      "origin": {
        "id": "station_nyc",
        "name": "New York Central",
        "timezone": "America/New_York"
      },
      "destination": {
        "id": "station_bos", 
        "name": "Boston South",
        "timezone": "America/New_York"
      },
      "departure": {
        "scheduled": "2024-01-15T08:00:00-05:00",
        "actual": "2024-01-15T08:02:00-05:00"
      },
      "arrival": {
        "scheduled": "2024-01-15T12:30:00-05:00",
        "actual": null
      },
      "duration": "4h 30m",
      "train": {
        "number": "NE001",
        "type": "High Speed"
      },
      "amenities": {
        "bicycles": true,
        "dogs": true,
        "wifi": true,
        "food": true
      },
      "stops": [
        {
          "id": "station_nyc",
          "name": "New York Central",
          "arrival": null,
          "departure": "08:00:00"
        },
        {
          "id": "station_hfd",
          "name": "Hartford", 
          "arrival": "10:15:00",
          "departure": "10:18:00"
        },
        {
          "id": "station_bos",
          "name": "Boston South",
          "arrival": "12:30:00",
          "departure": null
        }
      ]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "itemsPerPage": 100,
    "hasNextPage": false,
    "hasPreviousPage": false
  },
  "filters": {
    "origin": "station_nyc",
    "destination": "station_bos", 
    "date": "2024-01-15",
    "bicycles": "true",
    "dogs": "true"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /health

Health check endpoint (no authentication required).

**Example Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. For development with auto-reload:
```bash
npm run dev
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Authentication

The API uses Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer your-token-here
```

For testing purposes, any token with length >= 10 characters will be accepted.

## Error Responses

The API returns appropriate HTTP status codes with error details:

**400 Bad Request:**
```json
{
  "error": "Invalid query parameters",
  "details": [
    {
      "field": "origin",
      "message": "Origin station ID is required"
    }
  ]
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required",
  "message": "Authorization header is missing"
}
```

**404 Not Found:**
```json
{
  "error": "Endpoint not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "message": "Something went wrong!"
}
```

## Project Structure

```
src/
├── app.js              # Main application
├── controllers/        # Route controllers
├── middleware/         # Custom middleware
├── routes/            # Route definitions
└── services/          # Business logic
tests/                 # Test files
```