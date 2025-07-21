
# Express API Server - Generated from OpenAPI Spec

A complete Express.js API server generated from the Swagger Petstore OpenAPI 3.0 specification.

## 🚀 Features

- **Complete Express.js API server** with all endpoints from Swagger Petstore
- **OpenAPI 3.0 validation** using express-openapi-validator
- **Interactive Swagger UI** documentation
- **Structured architecture** with controllers and services
- **RESTful endpoints** with proper HTTP status codes
- **Mock implementations** ready for business logic integration

## 📋 API Endpoints

### Pet Management
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

### User Management
- `POST /api/v3/user` - Create user
- `POST /api/v3/user/createWithList` - Create list of users with given input array
- `GET /api/v3/user/login` - Log user into the system
- `POST /api/v3/user/logout` - Log out current logged in user session
- `GET /api/v3/user/{username}` - Get user by username
- `PUT /api/v3/user/{username}` - Update user
- `DELETE /api/v3/user/{username}` - Delete user

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 14.0.0
- npm >= 6.0.0

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the API:**
   - API Documentation: http://localhost:8080/api-docs/
   - OpenAPI Spec: http://localhost:8080/openapi
   - Example endpoint: http://localhost:8080/api/v3/pet/findByStatus?status=available

## 📁 Project Structure

```
├── api/                    # OpenAPI specification files
│   └── openapi.yaml       # Main OpenAPI 3.0 specification
├── controllers/           # Request handlers
│   ├── Controller.js      # Base controller with common logic
│   ├── PetController.js   # Pet-related endpoints
│   ├── StoreController.js # Store-related endpoints
│   └── UserController.js  # User-related endpoints
├── services/              # Business logic layer
│   ├── Service.js         # Base service utilities
│   ├── PetService.js      # Pet business logic
│   ├── StoreService.js    # Store business logic
│   └── UserService.js     # User business logic
├── utils/                 # Utility modules
│   └── openapiRouter.js   # OpenAPI routing logic
├── config.js              # Server configuration
├── expressServer.js       # Express server setup
├── index.js               # Application entry point
├── logger.js              # Winston logger configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

Server configuration can be modified in `config.js`:

- **Port**: Default 8080
- **OpenAPI Spec**: `api/openapi.yaml`
- **Upload Directory**: `uploaded_files/`
- **CORS**: Enabled for all origins

## 🧪 Testing

The server includes mock implementations for all endpoints. Each endpoint returns:
- **200 OK** with sample data for successful requests
- **400/404/422** for validation errors and not found cases
- Request validation against the OpenAPI schema

### Sample API Calls

```bash
# Get pets by status
curl "http://localhost:8080/api/v3/pet/findByStatus?status=available"

# Get store inventory
curl "http://localhost:8080/api/v3/store/inventory"

# Create a new pet (with proper JSON)
curl -X POST "http://localhost:8080/api/v3/pet" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "doggie",
    "photoUrls": ["https://example.com/photo.jpg"],
    "status": "available"
  }'
```

## 📚 API Documentation

- **Interactive Swagger UI**: Visit http://localhost:8080/api-docs/ for full API documentation
- **OpenAPI Spec**: Download the spec from http://localhost:8080/openapi
- **Postman Collection**: Import the OpenAPI spec into Postman for testing

## 🔐 Security

The API includes security configurations for:
- OAuth2 authentication (petstore_auth)
- API key authentication
- Request validation and sanitization

## 🚦 Development

### Adding Business Logic

1. **Controllers**: Handle HTTP requests and responses in `controllers/`
2. **Services**: Implement business logic in `services/`
3. **Models**: Define data models based on OpenAPI schemas

### Customization

The generated code is designed to be customized:
- Controllers extract request parameters and delegate to services
- Services contain placeholder implementations ready for your business logic
- The OpenAPI spec can be modified and regenerated as needed

## 📝 Scripts

- `npm start` - Start the production server
- `npm run prestart` - Install dependencies (runs automatically)

## 🤝 Generated from OpenAPI

This server was generated using OpenAPI Generator from the official Swagger Petstore specification:
- **Source**: https://github.com/swagger-api/swagger-petstore
- **Generator**: nodejs-express-server
- **OpenAPI Version**: 3.0.4

The generated code follows OpenAPI best practices and is ready for production use with custom business logic implementation.
