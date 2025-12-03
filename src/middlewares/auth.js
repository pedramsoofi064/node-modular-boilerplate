const JwtService = require('../modules/auth/jwt.service');
const { UnauthorizedError } = require('../utils/api-errors');
const constants = require('../constants');

/**
 *
 * @param header
 */
const decodeToken = async (header) => {
  if (!header) {
    throw new UnauthorizedError('Authorization header missing');
  }
  const token = header.replace(constants.AUTH.BEARER_PREFIX, '');
  const payload = await JwtService.verifyJWT({ token });
  return payload;
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async (req, res, next) => {
  const { method, path } = req;
  if (
    method === constants.HTTP_METHODS.OPTIONS ||
    ['/api/v1/auth/login'].includes(path)
  ) {
    return next();
  }
  req.context = await decodeToken(
    req.header(constants.HTTP_HEADERS.AUTHORIZATION) ||
      req.header(constants.HTTP_HEADERS.AUTHORIZATION_LOWER)
  );
  return next();
};
