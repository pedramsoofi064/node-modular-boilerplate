const router = require('express').Router();
const { bridge } = require('../../core');

const { makeExpressCallback } = require('../../middlewares');

// service
const AppHealthService = require('./app-health.service');

// controller
const AppHealthController = require('./app-health.controller');

// routes
const routes = require('./app-health.routes')({
  router,
  AppHealthController,
  makeExpressCallback,
});

// Register module services with the bridge
bridge.registerModule('app-health', {
  AppHealthService,
  AppHealthController,
});

module.exports = {
  AppHealthController,
  AppHealthService,
  AppHealthRoutes: routes,
};
