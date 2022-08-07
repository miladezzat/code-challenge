const { errors: { BadRequestError }, ajv: { SchemaValidator } } = require('@sakneen/api-utils');

/**
 * Parses the error provided by ajv to our agreed upon structure
 *
 * @param {Array<Object>} ajvError
 *
 * @returns Object
 */
const parseAjvError = (ajvError) => {
  const fieldErrorMessageMap = new Map();

  ajvError.forEach((error) => {
    // get the ajv keyword that causes validation errors
    const { keyword } = error;
    let field; let message;

    // Depending on the keyword,the message or actual field name will be in a different path in the error object
    switch (keyword) {
      case 'oneOf':
      case 'anyOf': {
        field = 'schema';
        message = 'The provided data does not match any of our schemas';
        break;
      }

      case 'required': {
        field = error.params.missingProperty;
        message = 'This field is required';
        break;
      }

      default: {
        // Remove the slash from field name
        field = error.instancePath.replace('/', '');
        message = error.message;
      }
    }

    if (field && !fieldErrorMessageMap.has(field)) {
      fieldErrorMessageMap.set(field, message);
    }
  });

  // Return the map in form of an object
  return Object.fromEntries(fieldErrorMessageMap);
};

const validation = async (data, schema = {}) => {
  try {
    return await new SchemaValidator([schema]).validate(data);
  } catch (error) {
    if (error.details) {
      return { error: parseAjvError(error.details) };
    }

    throw new BadRequestError('Data Validation Error', { error });
  }
};
module.exports = validation;
