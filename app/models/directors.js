const Sequelize = require('sequelize');
const db = require('../db/db');

const Directors = db.db.define('directors', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING(9999),
    email: Sequelize.STRING,
    avatar: Sequelize.STRING(700),
    status: Sequelize.STRING,
    date_birthday: Sequelize.STRING,
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function resetData() { 
    db.db.sync({force: true}).then(() => {
        Directors.create({
        first_name: "Fedor",
        last_name: "Rychkov",
        login: "fedorrychkov",
        email: "fedorrychkov@ya.ru", 
        });
    });
}

module.exports = {
    Directors,
}