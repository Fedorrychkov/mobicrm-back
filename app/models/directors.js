const Sequelize = require('sequelize'),
      { db }    = require('../db/db'),
      mock      = require('../../mocks/models/directors.json');

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

const hasUser = async (login, password) => {
    res = await Directors.findOne({where: {login: login, password: password}});
    return res;
}

const hasLogin = async (login) => {
    res = await Directors.findOne({where: {login: login}});
    return res;
}

const hasEmail = async (email) => {
    res = await Directors.findOne({where: {email: email}});
    return res;
}

const createPassAndSaltHas = async (password) => {
    const salt = await crypto.randomBytes(128).toString('base64');
    const passHash = await crypto.pbkdf2Sync(password, salt, 1, 128, 'sha256').toString('base64');
    return { salt, passHash };
}

const checkPassword = async (login, password, salt) => {
    const user = await Directors.findOne({where: {login: login}});
    const passHash = await crypto.pbkdf2Sync(password, salt || user.salt, 1, 128, 'sha256').toString('base64');
    return passHash == user.password;
}

module.exports = {
    Directors,
    createPassAndSaltHas,
    checkPassword,
}
