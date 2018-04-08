const Sequelize = require('sequelize');
const db = require('../db/db');

const Customers = db.db.define('customers', {
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

function resetData() { 
    db.db.sync({force: true}).then(() => {
        Customers.create({
            company_id: 1,
        });
    });
}


module.exports = {
    Customers,
}