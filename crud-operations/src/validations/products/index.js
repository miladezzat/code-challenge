const listProductsValidationSchema = require('./list');
const createProductValidationSchema = require('./create');
const updateProductValidatorValidationSchema = require('./update');
const deleteProductValidationSchema = require('./delete');

module.exports = {
  listProductsValidator: listProductsValidationSchema,
  createProductValidator: createProductValidationSchema,
  updateProductValidator: updateProductValidatorValidationSchema,
  deleteProductValidator: deleteProductValidationSchema,
};
