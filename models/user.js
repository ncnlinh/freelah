'use strict';

var Sequelize = require('sequelize');
var helper = require('../helper');

var User = helper.getDatabase().define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  fullName: {
    type: Sequelize.STRING,
  },
  point: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  phoneNumber: {
    type: Sequelize.INTEGER,
  }
}, {
  classMethods: {
    associate: function(models) {
      // associations can be defined here
      User.hasMany(models.Product)
    }
  }
});


// All access to Users described here.
exports.createUser = function(data, callback) {
  User.create(data)
    .then(callback)
    .catch(callback);
}

exports.getAllUser = function(callback) {
  User.all({attributes: ['id', 'username']})
    .then(callback)
    .catch(callback);
}

exports.getUserById = function(userId, callback) {
  User.findById(userId)
    .then(callback);
}

exports.updateUser = function(userId, data, callback) {
  User.findById(userId)
    .then(function(user) {
      if (user == null) {
        callback;
      } else {
        user.updateAttributes(data, {fields: ['email', 'fullName', 'point', 'phoneNumber']})
          .then(callback);
      }
    });
}
