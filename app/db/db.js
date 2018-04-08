const Sequelize = require('sequelize');
const config = require('../../config/database.json');

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  charset: config.define.charset,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

db.sync();

module.exports = {
    db,
}