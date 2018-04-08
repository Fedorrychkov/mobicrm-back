const Sequelize = require('sequelize');
const { db } = require('../db/db');
const mock = require('../../mocks/models/customers.json')

const Customers = db.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: Sequelize.INTEGER,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    avatar: Sequelize.STRING(700),
    status: Sequelize.STRING,
    date_birthday: Sequelize.STRING,
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function mockData() { 
    db.sync({force: true}).then(() => {
        mock.items.forEach(item => {
            Customers.create(item); 
        });
    });
}


module.exports = {
    Customers,
}