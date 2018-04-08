const Sequelize = require('sequelize');
const db = require('../db/db');
const mock = require('../../mocks/models/directors.json')

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

function mockData() { 
    db.db.sync({force: true}).then(() => {
        mock.items.forEach(item => {
            Directors.create(item); 
        });
    });
}


module.exports = {
    Directors,
}