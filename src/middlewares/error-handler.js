const {
  UniqueConstraintError,
  ValidationError,
  AggregateError,
} = require('sequelize');
const logger = require('../plugins/logger');
const { APIError } = require('../utils/api-errors');
const constants = require('../constants');

/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 */
module.exports = (error, req, res, _next) => {
  logger.error(error);

  // catch api error
  if (error instanceof APIError) {
    return res.status(error.status).send({
      error: {
        code: error.status,
        message: error.message,
      },
    });
  }

  // catch db error
  if (error instanceof UniqueConstraintError) {
    return res.status(400).send({
      error: {
        code: 400,
        message: `${constants.ERROR_MESSAGES.DUPLICATE_PREFIX}${error.parent.constraint}`,
      },
    });
  }
  if (error instanceof ValidationError) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.message,
      },
    });
  }
  if (error instanceof AggregateError) {
    const firstErrorMessage =
      error.errors[0]?.message || constants.ERROR_MESSAGES.UNKNOWN;
    return res.status(400).send({
      error: {
        code: 400,
        message: firstErrorMessage,
      },
    });
  }

  // connect all errors
  return res.status(500).send({
    error: {
      code: 500,
      message: constants.ERROR_MESSAGES.SOMETHING_WENT_WRONG,
    },
  });
};
