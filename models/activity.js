var Sequelize = require('sequelize');
var helper = require('../helper');

var Activity = helper.getDatabase().define('Product', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  message: {
    allowNull: false,
    type: Sequelize.STRING
  },
  productId: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  highestBid: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  classMethods: {
    associate: function(models) {
      // associations can be defined here
      Activity.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
});


// All access to Activities described here.

}
