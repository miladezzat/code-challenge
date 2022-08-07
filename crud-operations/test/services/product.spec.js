const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { describe, it } = require('mocha');
const sinon = require('sinon');
const productsService = require('../../src/services/product');
const productRepository = require('../../src/repositories/products');

const { expect } = chai;

describe('products Service', () => {
  describe('list products', () => {
    const sandbox = sinon.createSandbox();

    before(() => {
      sandbox.stub(productRepository, 'list')
        .withArgs({ limit: 10, page: 1 })
        .returns([
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
          {
            _id: '',
            name: '',
            quantity: '',
          },
        ])
        .withArgs({ limit: 1, page: 2 })
        .returns([
          {
            _id: '',
            name: '',
            quantity: '',
          },
        ]);

      sandbox.stub(productRepository, 'count').returns(11);
    });

    after(() => {
      sandbox.restore();
    });

    it('should list products in case of default queries', async () => {
      const result = await productsService.listAllProducts({ limit: 10, page: 1 });

      expect(result.data).length(10);
      expect(result.pagination.pages).to.eq(2);
      expect(result.pagination.totalCount).to.eq(11);
    });

    it('should list products in case of page = 2 and limit = 5', async () => {
      const result = await productsService.listAllProducts({ limit: 1, page: 2 });

      expect(result.data).length(1);
      expect(result.pagination.pages).to.eq(11);
      expect(result.pagination.totalCount).to.eq(11);
    });
  });

  describe('update The Product By Id', () => {
    const sandbox = sinon.createSandbox();

    before(() => {
      sandbox.stub(productRepository, 'updateById')
        .withArgs(1, { name: 'test', quantity: 2 })
        .returns({
          _id: 1,
          name: 'test',
          quantity: 2,
        })
        .withArgs(2, { name: 'test2', quantity: 4 })
        .returns(null);
    });

    after(() => {
      sandbox.restore();
    });

    it('should list products in case of default queries', async () => {
      const updatedProduct = await productsService.updateTheProductById(1, { name: 'test', quantity: 2 });

      expect(updatedProduct._id).to.eq(1);
      expect(updatedProduct.name).to.eq('test');
      expect(updatedProduct.quantity).to.eq(2);
    });

    it('should list products in case of page = 2 and limit = 5', async () => {
      await expect(productsService.updateTheProductById(2, { name: 'test2', quantity: 4 })).to.be.rejectedWith('TheProductNotExist');
    });
  });
});
