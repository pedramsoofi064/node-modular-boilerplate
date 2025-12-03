const logger = require('../plugins/logger');

/**
 * Performance logger middleware
 * Logs the time taken for each request to complete
 * @param {ExpressRequest} req - Express request object
 * @param {ExpressResponse} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Function} - Express middleware function
 */
module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      `Request to ${req.method} ${req.originalUrl} took ${duration}ms - Status: ${res.statusCode}`
    );
  });

  return next();
};
