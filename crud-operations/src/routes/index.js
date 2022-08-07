const products = require('./products');

const defineRoutes = (router) => {
  router.use('/products', products);
};

module.exports = defineRoutes;
