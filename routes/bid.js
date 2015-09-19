var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/product');
var Activity = require('../models/activity');
var helper = require('../helper');

router.post('/', function(req, res) {
  Product.getProductById(req.body.prodId,
    function(product) {
      if (product == null) {
        res.status(400).json({message: 'Product not found!'});
        return;
      }
      User.getUserById(req.body.buyerId, 
        function(user) {
          if (user == null) {
            res.status(400).json({message:'Cannot find buyer\'s info!'});    
          } else if (req.body.biddingPoint == null || req.body.biddingPoint == 0) {
            res.status(400).json({message:'Please specify a greater-than-0 bidding point!'});    
          } else if (req.body.biddingPoint > user.point + (product.highestBid*(product.buyerId==user.id))) {
            res.status(400).json({message:'You dont have enough point!'});    
          } else if (product.status != 'bidding') {
            res.status(400).json({message:'The product is '+product.status});  
          } else if (product.expiryDate == 0) {
            newBid(user, product, req.body.biddingPoint, function() {
              sell(product);
            });
            res.json({message:'Bidding successful!'});
          } else if (product.highestBid >= req.body.biddingPoint) {
            res.status(400).json({message:'Your bid should be higher than current highest bid.'});    
          } else {
            var temp = product.highestBid;
            var previousId = product.buyerId;

            newBid(user, product, req.body.biddingPoint, function() {
              returnPoint(previousId, temp, product)
            });
            res.json({message:'Bidding successful!'});
          }
        },
        function(err) {
          res.status(400).json(err);    
        }
      );
    },
    function(err) {
      res.status(400).json(err);
    });
});

function sell(product) {
  product.status = product.highestBid == 0 ? 'expired' : 'given';
  product.save();

  Activity.create('Congrats! You won the product ['+product.name+']!', product.buyerId, product.id);
  Activity.create('Your ['+product.name+'] has been given!', "hello", product.userId, product.id);
}

function returnPoint(userId, point, product) {
  console.log(userId);
  console.log(point);
  User.getUserById(userId, 
    function(user) {
      user.point += point;
      user.save();
      Activity.create('Bidding failed on ['+product.name+']!', "You bidding is failed on [" + product.name + "]. You get " + point +" points back.",
        user.id, product.id);
    },
    function(err) {
      console.log(err);
    });
}

function newBid(user, product, newBid, next) {
  console.log(newBid);
  product.buyerId = user.id;
  product.highestBid = newBid;
  product.save()
    .then(function(product){
      console.log('product updated!');
      user.point -= newBid;
      user.save()
        .then(function(user){
          console.log('user updated!');
          Activity.create('New bidding on ['+product.name+']', 
            "You have just bidded ["+product.name+"] for "+newBid+" points.",
            user.id, product.id, function() {
              next();
            });
        })
        .catch(function(err) {console.log(err);});
    })
    .catch(function(err) {console.log(err);});
}

module.exports = router;