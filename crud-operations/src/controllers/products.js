const HttpStatus = require('http-status-codes');
const validationMiddleware = require('../helpers/validation');
const productsValidator = require('../validations/products');
const productsService = require('../services/product');
const ErrorManagement = require('../helpers/errorManagement');

module.exports = {
  async listProducts(req, res) {
    try {
      const { error } = await validationMiddleware({ query: req.query }, productsValidator.listProductsValidator);

      if (error) {
        return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send({ data: error });
      }

      const result = await productsService.listAllProducts(req.query);

      return res.status(HttpStatus.StatusCodes.OK).send(result);
    } catch (e) {
      return ErrorManagement.handle(req, res, e, 'Error While Listing Products');
    }
  },

  async createNewProduct(req, res) {
    try {
      const { error } = await validationMiddleware({ body: req.body }, productsValidator.createProductValidator);

      if (error) {
        return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send({ data: error });
      }

      const productInfo = await productsService.createNewProduct(req.body);

      return res.status(HttpStatus.StatusCodes.OK).send({ data: productInfo });
    } catch (e) {
      return ErrorManagement.handle(req, res, e, 'Error While Creating A New Product');
    }
  },

  async updateTheProductById(req, res) {
    try {
      const { error } = await validationMiddleware({ params: req.params, body: req.body }, productsValidator.updateProductValidator);

      if (error) {
        return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send({ data: error });
      }

      const productInfoAfterUpdate = await productsService.updateTheProductById(req.params.id, req.body);

      return res.status(HttpStatus.StatusCodes.OK).send({ data: productInfoAfterUpdate });
    } catch (e) {
      return ErrorManagement.handle(req, res, e, 'Error While Updating The Product');
    }
  },

  async deleteTheProductById(req, res) {
    try {
      const { error } = await validationMiddleware({ params: req.params }, productsValidator.deleteProductValidator);

      if (error) {
        return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send({ data: error });
      }

      await productsService.deleteTheProductById(req.params.id);

      return res.status(HttpStatus.StatusCodes.NO_CONTENT).end();
    } catch (e) {
      return ErrorManagement.handle(req, res, e, 'Error While Deleting The Product');
    }
  },
};
