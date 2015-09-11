var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/product');

router.get('/', function(req, res) {
  Product.getAllProducts(
    function(products) {
      res.json(products);
    },function(error) {
      res.status(400).json(error);
    }
  );
});

module.exports = router;
