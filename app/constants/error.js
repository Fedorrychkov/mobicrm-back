'use strict';
/**
 * Client Errors
 */
module.exports.BAD_REQUEST = {
  status: 400,
  status_text: 'Bad Request'
};
module.exports.UNAUTHORIZED = {
  status: 401,
  status_text: 'Unauthorized'
};

/**
 * Server Errors
 */
module.exports.INTERNAL_ERROR = {
  status: 500,
  status_text: 'Internal Server Error'
};
