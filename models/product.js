'use strict';

var Sequelize = require('sequelize');
var helper = require('../helper');

var Product = helper.getDatabase().define('Product', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  imgUrls: {
    type: Sequelize.TEXT
  },
  description: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('available', 'bidding', 'expired', 'given'),
    defaultValue: 'available'
  },
  location: {
    allowNull: false,
    type: Sequelize.STRING
  },
  expiryDate: {
    type: Sequelize.DATE
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  classMethods: {
    associate: function(models) {
      // associations can be defined here
      Product.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
});


// All access to Users described here.
exports.createProduct = function(userId, data, callback, callError) {
  data['userId'] = userId;

  if (data['images'] != null) {
    data['imgUrls'] = "";

    var arr = data['images'].split(' ');
    arr.forEach(function(image) {
      if (image.length > 0) {
        data['imgUrls'] += ' images/' + helper.saveImage('product-' + userId + '-' + Math.round(Math.random() * 10000000), image);
      }
    });
    console.log("ZZ");
  }

  Product.create(data)
    .then(callback)
    .catch(callError);
}

exports.getAllProducts = function(callback, callError) {
  Product.all()
    .then(callback)
    .catch(callError);
}

exports.getProductById = function(id, callback, callError) {
  Product.findById(id)
    .then(callback)
    .catch(callError);
}

exports.updateProduct = function(id, data, callback, callError) {
  Product.findById(id)
    .then(function(product) {
      if (product == null) {
        callback;
      } else {
        if (data.images != null) {
          data.imgUrls = "";

          data.images.split(" ").map(function(image) {
            if (image.length > 0) {
              var rando = Math.round(Math.random() * 10000000);
              data.imgUrls += ' images/' + helper.saveImage('product-' + product.userId + '-' + rando, image);
            }
          });
        }

        product.updateAttributes(data, {fields: ['name', 'description', 'location', 'status', 'expiryDate', 'imgUrls']})
          .then(callback);
      }
    })
    .catch(callError);
}
