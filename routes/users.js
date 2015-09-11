var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/product');


/* GET users listing. */

router.post('/', function(req, res) {
  User.createUser(req.body, 
    function(user) {
      res.json(user);
    },
    function(error) {
      res.status(400).json(error);
    }
  );
});

router.get('/', function(req, res) {
  User.getAllUser(
    function(users) {
      res.json(users);
    },
    function(error) {
      res.status(400).json(error);
    }
  );
});

router.get('/:id', function(req, res) {
  User.getUserById(req.params.id, 
    function(user) {
      res.json(user);
    },
    function(error) {
      res.status(400).json(error);
    }
  );
});

router.put('/:id', function(req, res) {
  User.updateUser(req.params.id, req.body, 
    function(user) {
      res.json(user);
    },
    function(error) {
      res.status(400).json(error);
    }
  );
});

router.post('/:id/products', function(req, res) {
  Product.createProduct(req.params.id, req.body, 
    function(product) {
      res.json(product);
    },
    function(error) {
      res.status(400).json(error);
    }
  );
});

router.put('/:id/products/:productId', function(req, res) {
  Product.updateProduct(req.params.productId, req.body, 
    function(product) {
      res.json(product);
    },
    function(error) {
      res.status(400).json(error);
    }
  );
});

module.exports = router;
