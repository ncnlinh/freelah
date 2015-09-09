var Sequelize = require('sequelize');
var YAML = require('yamljs');

var config = YAML.load('config.yml');

exports.getDatabase = function() {
  return new Sequelize (
    config['db']['db_name'],
    config['db']['username'],
    config['db']['password'], {
      host: config['db']['host'],
      dialect: 'mysql'
  });
}
