const Boom = require('@hapi/boom');
const productsRepository = require('../repositories/products');

module.exports = {
  async listAllProducts(queries) {
    const { limit } = queries;

    const [productsList, productsCount] = await Promise.all([
      productsRepository.list(queries),
      productsRepository.count(),
    ]);

    return {
      data: productsList,
      pagination: {
        totalCount: productsCount,
        pages: Math.ceil(productsCount / limit),
      },
    };
  },

  createNewProduct(payload) {
    return productsRepository.create(payload);
  },

  async updateTheProductById(productId, payload) {
    const updatedProduct = await productsRepository.updateById(productId, payload);

    if (!updatedProduct) {
      throw Boom.badRequest('TheProductNotExist');
    }

    return updatedProduct;
  },

  async deleteTheProductById(productId) {
    const result = await productsRepository.deleteById(productId);

    if (!result.deletedCount) {
      throw Boom.badRequest('TheProductNotExist');
    }
  },
};
