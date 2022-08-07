const express = require('express');

const router = new express.Router();
const productsCtrl = require('../controllers/products');

router.get('/', (req, res) => productsCtrl.listProducts(req, res));

router.post('/', (req, res) => productsCtrl.createNewProduct(req, res));

router.patch('/:id', (req, res) => productsCtrl.updateTheProductById(req, res));

router.delete('/:id', (req, res) => productsCtrl.deleteTheProductById(req, res));

module.exports = router;
