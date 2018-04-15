const Sequelize = require('sequelize');
const { db } = require('../db/db');
const mock = require('../../mocks/models/companies.json')

const Companies = db.define('companies', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    director_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    tags: Sequelize.STRING(999),
    address: Sequelize.STRING,
    status: Sequelize.STRING,
    avatar: Sequelize.STRING(700),
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function mockData() { 
    db.sync({force: true}).then(() => {
        mock.items.forEach(item => {
            Companies.create(item); 
        });
    });
}


module.exports = {
    Companies,
}
