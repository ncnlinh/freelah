var express = require('express');
var router = express.Router();
var User = require('../models/user');

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
  User.getUserById(res.params.id, function(user) {
    res.json(user);
  });
});

router.put('/:id', function(req, res) {
  User.updateUser(res.params.id, res.body, function(user) {
    res.json(user);
  });
})

module.exports = router;
