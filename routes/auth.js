var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/product');

router.get('/', function(req, res) {
  User.getToken(req.query.username, req.query.password,
    function(user) {
      res.json(user);
    },function(error) {
      res.status(400).json(error);
    }
  );
});

module.exports = router;
