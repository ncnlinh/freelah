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
  data['userId'] = userId
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
        product.updateAttributes(data, {fields: ['name', 'description', 'location', 'status', 'expiryDate']})
          .then(callback);
      }
    })
    .catch(callError);
}
