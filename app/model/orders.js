const Sequelize = require('sequelize');
const db = require('../db/db');

const Orders = db.db.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: Sequelize.INTEGER,
    customer_id: Sequelize.INTEGER,
    address: Sequelize.STRING,
    longitude: Sequelize.STRING,
    latitude: Sequelize.STRING,
    description: Sequelize.STRING(9999),
    avatar: Sequelize.STRING(700),
    status: Sequelize.STRING,
    who_created: Sequelize.INTEGER,
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function resetData() { 
    db.db.sync({force: true}).then(() => {
        Orders.create({
            company_id: 1,
            customer_id: 1,
        });
    });
}

module.exports = {
    Orders,
}