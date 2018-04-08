const Sequelize = require('sequelize');
const db = require('../db/db');

const Companies = db.db.define('companies', {
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

function resetData() { 
    db.db.sync({force: true}).then(() => {
        Companies.create({
            director_id: 1,
            name: "Company 1"
        });
    });
}

module.exports = {
    Companies,
}