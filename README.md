# Node Express Modular API

A production-ready RESTful API built with Node.js, Express.js, and Sequelize. This project demonstrates a scalable, modular architecture with comprehensive features including authentication, validation, error handling, logging, testing, and API documentation.

## 🚀 Features

- **Modular Architecture**: Clean, organized codebase with separation of concerns
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Request Validation**: Robust validation using Joi and AJV
- **Error Handling**: Centralized error handling with custom error classes
- **Database**: PostgreSQL with Sequelize ORM
- **Logging**: Comprehensive logging with Winston
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Testing**: Unit tests with Jest and E2E tests with Cypress
- **Code Quality**: ESLint and Prettier for code formatting
- **Graceful Shutdown**: Proper resource cleanup on server shutdown
- **Environment Configuration**: Flexible configuration management with node-config
- **CORS**: Cross-Origin Resource Sharing enabled
- **Health Checks**: Built-in health check endpoints

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm, yarn, or pnpm

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/node-express-modular-api.git
cd node-express-modular-api
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
# Server Configuration
PORT=3000
NODE_ENV=development
NODE_CONFIG_DIR=./src/config

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

# JWT Configuration
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRES_IN=15d
REFRESH_TOKEN_EXPIRES_IN=30d
```

5. Run database migrations:
```bash
npm run migrate
```

## 🏃 Running the Application

### Development Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Production Mode
```bash
NODE_ENV=production npm start
```

## 📚 API Documentation

Once the server is running, access the interactive API documentation at:
- Swagger UI: `http://localhost:3000/api-docs`
- API JSON: `http://localhost:3000/docs.json`

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Unit Tests with Coverage
```bash
npm run coverage
```

### E2E Tests
```bash
# Open Cypress Test Runner
npm run cy:open

# Run Cypress tests headlessly
npm run cy:run
```

## 📁 Project Structure

```
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/                # Configuration files
│   │   ├── default.yaml
│   │   ├── development.yaml
│   │   ├── production.yaml
│   │   └── test.yaml
│   ├── db/
│   │   └── models/            # Sequelize models
│   │       ├── index.js
│   │       └── User.js
│   ├── loaders/               # Application loaders
│   │   ├── config.js
│   │   ├── routes.js
│   │   └── index.js
│   ├── middlewares/           # Express middlewares
│   │   ├── auth.js
│   │   ├── authorize.js
│   │   ├── error-handler.js
│   │   └── ...
│   ├── core/                  # Core functionality
│   │   ├── bridge.js          # Module Bridge (Service Locator)
│   │   └── index.js
│   ├── modules/               # Feature modules
│   │   ├── auth/              # Authentication module
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.validator.js
│   │   │   └── jwt.service.js
│   │   ├── user/              # User module
│   │   └── app-health/        # Health check module
│   ├── plugins/               # Plugin utilities
│   │   ├── logger/
│   │   └── swagger/
│   └── utils/                 # Utility functions
│       ├── api-errors.js
│       ├── graceful-shutdown.js
│       └── ...
├── tests/
│   ├── unit/                  # Unit tests
│   └── cypress/               # E2E tests
│       └── e2e/
├── .gitignore
├── jest.config.js
├── cypress.config.js
├── package.json
└── README.md
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Login to get an access token:
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "phone": "your_phone_number",
  "password": "your_password"
}
```

2. Include the token in subsequent requests:
```bash
Authorization: Bearer <your_access_token>
```

## 🏗️ Architecture

### Modular Design
Each feature is organized as a self-contained module with:
- **Controller**: Handles HTTP requests and responses
- **Service**: Contains business logic
- **Routes**: Defines API endpoints
- **Validator**: Validates request data
- **Module**: Exports all module components

### Module Bridge Pattern
The application uses a **Bridge/Service Locator pattern** for inter-module communication:
- **Decoupled Communication**: Modules communicate through a central bridge instead of direct imports
- **Dependency Injection**: Easy to swap implementations for testing
- **Event System**: Built-in pub/sub for module events
- **Service Discovery**: Centralized registry of all module services

**Example Usage:**
```javascript
// Instead of direct import:
// const AuthService = require('../auth/auth.service');

// Use the bridge:
const { bridge } = require('../../core');
const AuthService = bridge.get('auth', 'AuthService');
const result = await AuthService.doLogin({ phone, password });
```

See `src/core/README.md` for detailed documentation.

### Middleware Stack
1. CORS handling
2. Request logging (optional)
3. JSON body parsing
4. Bad JSON error handling
5. Route handlers
6. 404 handler
7. Global error handler

### Error Handling
Custom error classes for different HTTP status codes:
- `BadRequestError` (400)
- `UnauthorizedError` (401)
- `ForbiddenError` (403)
- `NotFoundError` (404)
- `ValidationError` (400)
- `InternalServerError` (500)
- And more...

## 🔧 Configuration

Configuration is managed using `node-config` with environment-specific files:
- `default.yaml`: Base configuration
- `development.yaml`: Development overrides
- `production.yaml`: Production overrides
- `test.yaml`: Test environment overrides

Environment variables can override any configuration value through `custom-environment-variables.yaml`.

## 📝 Code Quality

### Linting
```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Pre-commit Hooks
Husky is configured to run linting and tests before each commit.

## 🗄️ Database

### Migrations
```bash
# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:undo
```

## 🚢 Deployment

### Environment Variables
Ensure all required environment variables are set in your production environment.

### Health Check
The API includes a health check endpoint:
```bash
GET /health
```

Returns the status of the application and database connection.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Pedram Soofi**

## 🙏 Acknowledgments

- Express.js community
- Sequelize ORM
- All open-source contributors

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ using Node.js and Express.js
