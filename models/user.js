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
    }
  }
});


// All access to Users described here.
exports.createUser = function(data, callback) {
  User.create(data)
    .then(callback)
    .catch(callback);
}
