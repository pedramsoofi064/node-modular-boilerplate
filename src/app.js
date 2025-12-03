const express = require('express');

const app = express();

const cors = require('cors');

require('dotenv').config();

// logger
const { requestLogger } = require('./plugins/logger');

// error handler
require('express-async-errors');

const {
  errorHandler,
  badJsonHandler,
  notFoundHandler,
  performanceLogger,
} = require('./middlewares');

// enable cors
app.use(cors());

// performance logger middleware
app.use(performanceLogger);

// app.use(requestLogger);

// parse json body
app.use(express.json());

// handle bad json format
app.use(badJsonHandler);

const normalizePort = require('./utils/normalize-port');
const port = normalizePort(process.env.PORT || '3000');
const swaggerDoc = require('./plugins/swagger')
swaggerDoc(app , port)


// load routes
require('./loaders/routes')(app);

// load and validate env variables
require('./loaders/config');

// handle 404 not found error
app.use(notFoundHandler);

// catch all errors
app.use(errorHandler);

module.exports = app;
