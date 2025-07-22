# Express.js Petstore API

A TypeScript Express.js API implementation generated from the [Swagger Petstore OpenAPI 3.0 specification](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml).

## Features

- ✅ **OpenAPI 3.0 Compliance**: Fully implements the Swagger Petstore specification
- ✅ **TypeScript**: Type-safe implementation with strict TypeScript configuration
- ✅ **Express.js**: Built on Express.js with modern middleware
- ✅ **API Documentation**: Interactive Swagger UI at `/docs`
- ✅ **Testing**: Comprehensive test suite with Vitest
- ✅ **Error Handling**: Centralized error handling with proper HTTP status codes
- ✅ **CORS Support**: Cross-origin resource sharing enabled
- ✅ **Request Logging**: Built-in request/response logging

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd coding-agent-poc

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

### Development

```bash
# Start in development mode with hot reload
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## API Endpoints

The API implements the following endpoint groups:

### Pet Management
- `POST /api/v3/pet` - Add a new pet
- `PUT /api/v3/pet` - Update an existing pet
- `GET /api/v3/pet/findByStatus` - Find pets by status
- `GET /api/v3/pet/findByTags` - Find pets by tags
- `GET /api/v3/pet/{petId}` - Find pet by ID
- `POST /api/v3/pet/{petId}` - Update pet with form data
- `DELETE /api/v3/pet/{petId}` - Delete a pet
- `POST /api/v3/pet/{petId}/uploadImage` - Upload pet image

### Store Management
- `GET /api/v3/store/inventory` - Get pet inventories by status
- `POST /api/v3/store/order` - Place an order for a pet
- `GET /api/v3/store/order/{orderId}` - Find purchase order by ID
- `DELETE /api/v3/store/order/{orderId}` - Delete purchase order by ID

### User Management
- `POST /api/v3/user` - Create user
- `POST /api/v3/user/createWithArray` - Create list of users with array input
- `POST /api/v3/user/createWithList` - Create list of users with list input
- `GET /api/v3/user/login` - Logs user into the system
- `GET /api/v3/user/logout` - Logs out current logged in user session
- `GET /api/v3/user/{username}` - Get user by username
- `PUT /api/v3/user/{username}` - Update user
- `DELETE /api/v3/user/{username}` - Delete user

## API Documentation

Once the server is running, you can access:

- **Interactive API Documentation**: http://localhost:3000/docs
- **OpenAPI Specification**: http://localhost:3000/openapi.yaml
- **Server Info**: http://localhost:3000/

## Project Structure

```
src/
├── controllers/          # Request handlers
│   ├── petController.ts
│   ├── storeController.ts
│   └── userController.ts
├── services/            # Business logic
│   ├── petService.ts
│   ├── storeService.ts
│   └── userService.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── middleware/          # Express middleware
│   ├── errorHandler.ts
│   └── index.ts
├── routes/              # Route definitions
│   ├── petRoutes.ts
│   ├── storeRoutes.ts
│   ├── userRoutes.ts
│   └── index.ts
├── tests/               # Test files
│   ├── petService.test.ts
│   ├── storeService.test.ts
│   └── userService.test.ts
└── server.ts            # Main server file
```

## Testing

The project includes comprehensive tests for all services:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test -- --watch
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)

### TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- ESM modules with `"type": "module"`

## Error Handling

The API implements centralized error handling with:
- Consistent error response format
- Proper HTTP status codes
- Request logging
- Error stack traces in development

## Development Guidelines

This project follows the coding standards defined in `.github/copilot-instructions.md`:

- Modern TypeScript with ES2022+ features
- Async/await over promises/callbacks
- Functional programming patterns
- Type safety (no `any` types)
- ESM import/export syntax
- Comprehensive error handling

## License

MIT License