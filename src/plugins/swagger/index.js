const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../../../package.json');
const logger = require('../logger');
const authMiddleWare = require('../../middlewares/auth')
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Express Modular API',
      description: 'A production-ready RESTful API with authentication, validation, and comprehensive documentation',
      version
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          schema: 'bearer',
          bearerFormat: 'JWT '
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/loaders/routes.js', './src/modules/**/*.routes.js']
};

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Express API with Swagger',
//       version: '1.0.0',
//       description: 'This is a simple CRUD API application made with Express and documented with Swagger',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//   },
//   apis: ['./src/loaders/routes.js', './src/modules/**/*.routes.js']
// };

const swaggerSpec = swaggerJsDoc(options);

module.exports = (app, port) => {

  app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('docs.json', (req, res) => {
    res.setHeader('content-type', 'application/json');
    res.send(swaggerSpec);
  });

  logger.info(`API document are available on  http://localhost:${port}/api-docs`)
};
