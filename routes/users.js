var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/product');


/* GET users listing. */

router.post('/', function(req, res) {
  User.createUser(req.body, function(user) {
    res.json(user);
  });
});

router.get('/', function(req, res) {
  User.getAllUser(function(users) {
    res.json(users);
  });
});

router.get('/:id', function(req, res) {
  User.getUserById(req.params.id, function(user) {
    res.json(user);
  });
});

router.put('/:id', function(req, res) {
  User.updateUser(req.params.id, req.body, function(user) {
    res.json(user);
  });
});

router.post('/:id/products', function(req, res) {
  Product.createProduct(req.params.id, req.body, function(product) {
    res.json(product);
  });
});

router.put('/:id/products/:productId', function(req, res) {
  Product.updateProduct(req.params.productId, req.body, function(product) {
    res.json(product);
  });
});

module.exports = router;
