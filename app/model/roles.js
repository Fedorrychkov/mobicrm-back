const Sequelize = require('sequelize');
const db = require('../db/db');

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

function resetData() { 
    db.db.sync({force: true}).then(() => {
        Roles.create({
        });
    });
}
module.exports = {
    Roles,
}