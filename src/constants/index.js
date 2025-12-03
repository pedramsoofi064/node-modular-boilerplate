/**
 * Global Application Constants
 * Centralized constants used across the entire application
 */

module.exports = {
  // HTTP Methods
  HTTP_METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
  },

  // HTTP Headers
  HTTP_HEADERS: {
    AUTHORIZATION: 'Authorization',
    AUTHORIZATION_LOWER: 'authorization',
    CONTENT_TYPE: 'Content-Type',
  },

  // Authorization
  AUTH: {
    BEARER_PREFIX: 'Bearer ',
  },

  // Content Types
  CONTENT_TYPES: {
    JSON: 'application/json',
  },

  // Status Values
  STATUS: {
    UP: 'up',
    DOWN: 'down',
  },

  // Common Error Messages
  ERROR_MESSAGES: {
    UNKNOWN: 'Unknown error',
    SOMETHING_WENT_WRONG: 'Something went wrong!',
    DUPLICATE_PREFIX: 'duplicate_',
  },
};
