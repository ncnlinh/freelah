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
  var token = req.headers.authorization;
  User.getUserById(req.params.id, 
    function(user) {
      if (user.basicAuth == token) {
        res.json(user);
      } else {
        res.json({
          id: user.id,
          username: user.username,
          fullName: user.fullName
        });
      }
    },
    function(error) {
      res.status(400).json(error);
    }
  );
});

router.put('/:id', function(req, res) {
  var token = req.headers.authorization;
  User.getUserById(req.params.id, 
    function(user) {
      if (user == null) {
        res.status(400).json({message: 'User not found!'});
      } else if (user.basicAuth != token) {
        res.status(401).json({message: 'Bad authorization!'});
      } else {
        User.updateUser(req.params.id, req.body, 
          function(user) {
            res.json(user);
          },
          function(error) {
            res.status(400).json(error);
          }
        );
      }
    },
    function(error) {
      res.status(400).json(error);
    })
});

router.post('/:id/products', function(req, res) {
  var token = req.headers.authorization;

  console.log(req.body);

  User.getUserById(req.params.id, 
    function(user) {
      if (user == null) {
        res.status(400).json({message: 'User not found!'});
      } else if (user.basicAuth != token) {
        res.status(401).json({message: 'Bad authorization!'});
      } else {
        Product.createProduct(req.params.id, req.body, 
          function(product) {
            res.json(product);
          },
          function(error) {
            res.status(400).json(error);
          }
        );        
      }
    }, 
    function(error) {
      res.status(400).json(error);
    }
  );
});

router.put('/:id/products/:productId', function(req, res) {
    var token = req.headers.authorization;
  User.getUserById(req.params.id, 
    function(user) {
      if (user == null) {
        res.status(400).json({message: 'User not found!'});
      } else if (user.basicAuth != token) {
        res.status(401).json({message: 'Bad authorization!'});
      } else {
        Product.updateProduct(req.params.productId, req.body, 
          function(product) {
            res.json(product);
          },
          function(error) {
            res.status(400).json(error);
          }
        );    
      }
    }, 
    function(error) {
      res.status(400).json(error);
    }
  );
});

router.get('/:id/products/:productId', function(req, res) {
  Product.getProductById(req.params.productId, 
    function(product) {
      res.json(product);
    },
    function(error) {
      res.status(400).json(error);
    }
  );
});

module.exports = router;
