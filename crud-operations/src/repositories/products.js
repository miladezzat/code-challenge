const { productsModel } = require('../models');

const productRepository = {
  /**
   *
   * @param {Object} queries
   * @param {Number} queries.limit
   * @param {Number} queries.page
   *
   * @returns {Promise<Array<Object>>}
   */
  list(queries) {
    const { limit, page } = queries;

    return productsModel.find({})
      .skip(page * limit - limit)
      .limit(limit)
      .lean();
  },

  /**
   * @returns {Promise<Number>}
   */
  count() {
    return productsModel.countDocuments({});
  },

  /**
   * @param {Object} productInfo
   * º
   * @returns {Promise<Object>}
   */
  create(productInfo) {
    return productsModel.create(productInfo);
  },

  /**
   * @param {String} productId
   * @param {Object} productInfo
   * º
   * @returns {Promise<Object>}
   */
  updateById(productId, productInfo) {
    return productsModel.findOneAndUpdate({ _id: productId }, { $set: productInfo }, { new: true, lean: true });
  },

  /**
   * @param {String} productId
   *
   * @returns {Promise<Object>}
   */
  deleteById(productId) {
    return productsModel.deleteOne({ _id: productId });
  },
};

module.exports = productRepository;
