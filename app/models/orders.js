const Sequelize = require('sequelize');
const db = require('../db/db');
const mock = require('../../mocks/models/orders.json')

const Orders = db.db.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: Sequelize.INTEGER,
    customer_id: Sequelize.INTEGER,
    address: Sequelize.STRING(300),
    longitude: Sequelize.STRING,
    latitude: Sequelize.STRING,
    description: Sequelize.STRING(400),
    status: Sequelize.STRING,
    who_created: Sequelize.INTEGER,
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function mockData() { 
    db.db.sync({force: true}).then(() => {
        mock.items.forEach(item => {
            Orders.create(item); 
        });
    });
}


module.exports = {
    Orders,
}