const Sequelize = require('sequelize');
const db = require('../db/db');
const mock = require('../../mocks/models/roles.json')

const Roles = db.db.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    status: Sequelize.STRING,
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function mockData() { 
    db.db.sync({force: true}).then(() => {
        mock.items.forEach(item => {
            Roles.create(item); 
        });
    });
}


module.exports = {
    Roles,
}