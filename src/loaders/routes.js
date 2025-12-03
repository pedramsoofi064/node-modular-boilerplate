// Routes
const { API_PREFIX } = require('config');
const { AuthRoutes } = require('../modules/auth/auth.module');
const { AppHealthRoutes } = require('../modules/app-health/app-health.module');

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/health',
    route: AppHealthRoutes,
  },
];

/**
 * Register routes with the app
 * @param {object} app - The Express app object
 */
module.exports = (app) => {
  routes.forEach(({ path, route, excludeAPIPrefix }) => {
    const routePath = excludeAPIPrefix ? path : API_PREFIX + path;
    app.use(routePath, route);
  });
};
