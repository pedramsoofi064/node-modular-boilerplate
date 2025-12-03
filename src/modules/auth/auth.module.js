const router = require('express').Router();
const { bridge } = require('../../core');

const {
  makeExpressCallback,
  makeValidatorCallback,
} = require('../../middlewares');

// validator
const AuthValidator = require('./auth.validator');

// service
const AuthService = require('./auth.service');

// controller
const AuthController = require('./auth.controller');

// routes
const routes = require('./auth.routes')({
  router,
  AuthController,
  AuthValidator,
  makeValidatorCallback,
  makeExpressCallback,
});

// Register module services with the bridge
bridge.registerModule('auth', {
  AuthService,
  AuthController,
  AuthValidator,
  JwtService: require('./jwt.service'),
});

module.exports = {
  AuthController,
  AuthService,
  AuthRoutes: routes,
};
