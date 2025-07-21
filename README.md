# Petstore Express API

Express.js APIs generated from the [Swagger Petstore OpenAPI 3.0 specification](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml).

## Overview

This project provides a fully functional Express.js server implementation of the Swagger Petstore API. The server code was automatically generated using the OpenAPI Generator tool, providing:

- **RESTful API endpoints** for managing pets, store orders, and users
- **OpenAPI validation** using express-openapi-validator
- **Swagger UI** for interactive API documentation
- **Structured controller and service layers** for easy customization

## Quick Start

### Prerequisites
- Node.js >= 10.6
- npm >= 6.10.0

### Installation & Running

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

The server will start on port 8080.

## API Documentation

Once the server is running, you can access:

- **Swagger UI**: http://localhost:8080/api-docs/
- **OpenAPI Spec**: http://localhost:8080/openapi

## API Endpoints

All API endpoints are prefixed with `/api/v3` and include:

### Pet Operations
- `POST /api/v3/pet` - Add a new pet to the store
- `PUT /api/v3/pet` - Update an existing pet
- `GET /api/v3/pet/findByStatus` - Find pets by status
- `GET /api/v3/pet/findByTags` - Find pets by tags
- `GET /api/v3/pet/{petId}` - Find pet by ID
- `POST /api/v3/pet/{petId}` - Update a pet with form data
- `DELETE /api/v3/pet/{petId}` - Delete a pet
- `POST /api/v3/pet/{petId}/uploadImage` - Upload an image

### Store Operations
- `GET /api/v3/store/inventory` - Returns pet inventories by status
- `POST /api/v3/store/order` - Place an order for a pet
- `GET /api/v3/store/order/{orderId}` - Find purchase order by ID
- `DELETE /api/v3/store/order/{orderId}` - Delete purchase order by ID

### User Operations
- `POST /api/v3/user` - Create user
- `POST /api/v3/user/createWithList` - Create list of users with given input array
- `GET /api/v3/user/login` - Log user into the system
- `POST /api/v3/user/logout` - Log out current logged in user session
- `GET /api/v3/user/{username}` - Get user by username
- `PUT /api/v3/user/{username}` - Update user
- `DELETE /api/v3/user/{username}` - Delete user

## Example Usage

### Find pets by status:
```bash
curl -X GET "http://localhost:8080/api/v3/pet/findByStatus?status=available" \
  -H "accept: application/json"
```

### Get pet by ID:
```bash
curl -X GET "http://localhost:8080/api/v3/pet/1" \
  -H "accept: application/json"
```

### Add a new pet:
```bash
curl -X POST "http://localhost:8080/api/v3/pet" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fluffy",
    "status": "available",
    "photoUrls": ["https://example.com/photo.jpg"]
  }'
```

## Project Structure

```
src/
├── api/
│   ├── openapi.yaml          # OpenAPI specification
│   └── petstore-openapi.yaml # Original spec file
├── controllers/              # Request handlers
│   ├── Controller.js         # Base controller logic
│   ├── PetController.js      # Pet endpoints
│   ├── StoreController.js    # Store endpoints
│   └── UserController.js     # User endpoints
├── services/                 # Business logic
│   ├── Service.js            # Base service utilities
│   ├── PetService.js         # Pet business logic
│   ├── StoreService.js       # Store business logic
│   └── UserService.js        # User business logic
├── utils/
│   └── openapiRouter.js      # OpenAPI routing utilities
├── config.js                 # Server configuration
├── expressServer.js          # Express server setup
├── index.js                  # Application entry point
└── logger.js                 # Logging configuration
```

## Generated Code Notes

This server was generated using OpenAPI Generator with the `nodejs-express-server` generator. The generated code includes:

- **Validation**: All requests are validated against the OpenAPI schema
- **Mock responses**: Default implementations return the request parameters
- **Extensible structure**: Easy to replace mock implementations with real business logic
- **Security**: Authentication endpoints are marked and require proper security implementation

## Customization

To add real business logic:

1. Modify the service files in `src/services/` to implement actual data operations
2. Update the controller logic in `src/controllers/` if needed
3. Add database connections and models as required
4. Implement authentication and authorization logic

## Security

Some endpoints require authentication (marked with security requirements in the OpenAPI spec). Currently, these return authentication errors until proper security handlers are implemented.

## License

Apache 2.0