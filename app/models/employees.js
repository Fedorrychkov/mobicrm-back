const Sequelize = require('sequelize');
const db = require('../db/db');

const Employees = db.db.define('employees', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: Sequelize.INTEGER,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING(9999),
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    avatar: Sequelize.STRING(700),
    role: Sequelize.INTEGER,
    status: Sequelize.STRING,
    who_created: Sequelize.INTEGER,
    date_birthday: Sequelize.STRING,
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function resetData() { 
    db.db.sync({force: true}).then(() => {
        Employees.create({
            company_id: 1,
        });
    });
}

module.exports = {
    Employees,
}