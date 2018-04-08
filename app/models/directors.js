const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const { db } = require('../db/db');
const mock = require('../../mocks/models/directors.json')

const Directors = db.define('directors', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    email: Sequelize.STRING,
    avatar: Sequelize.STRING,
    status: Sequelize.STRING,
    date_birthday: Sequelize.STRING,
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function mockData() { 
    db.sync({force: true}).then(() => {
        mock.items.forEach(item => {
            Directors.create(item); 
        });
    });
}

// mockData()
module.exports = {
    Directors,
}
