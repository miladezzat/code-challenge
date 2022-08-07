const _ = require('lodash');
const Boom = require('@hapi/boom');
const errorsConstants = require('../constants/errors');
const logger = require('./logger');

/**
 * @class ErrorManagement
 */
class ErrorManagement {
  /**
   * @class errorManagement
   * @method unExpectError
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   * @param {object} error
   * @param {String} actionName
   *
   */
  handle(req, res, error, actionName) {
    try {
      const locale = _.get(req, 'locale.language', 'ar-SA');

      if (Boom.isBoom(error)) {
        const { statusCode } = error.output.payload;
        const errorMessage = _.get(errorsConstants.messages, error.output.payload.message);

        if (_.isFunction(errorMessage)) {
          const { data } = error;
          const localizedErrorMessage = errorMessage(data)[locale.includes('ar') ? 'ar' : 'en'];

          return res.status(statusCode).send({ message: localizedErrorMessage });
        }

        const localizedErrorMessage = errorMessage[locale.includes('ar') ? 'ar' : 'en'];

        return res.status(statusCode).send({ message: localizedErrorMessage });
      }

      return logger.error(req, actionName, error);
    } catch (e) {
      return logger.error(req, actionName, error);
    }
  }
}

module.exports = new ErrorManagement();
