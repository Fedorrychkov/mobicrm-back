const Sequelize = require('sequelize'),
      { db }    = require('../db/db'),
      mock      = require('../../mocks/models/employees.json');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    company_id: Sequelize.INTEGER,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    avatar: Sequelize.STRING,
    role: Sequelize.INTEGER,
    status: Sequelize.STRING,
    who_created: Sequelize.INTEGER,
    date_birthday: Sequelize.STRING,
    date_created: Sequelize.STRING,
    date_updated: Sequelize.STRING,
});

function mockData() { 
    db.sync({force: true}).then(() => {
        mock.items.forEach(item => {
            Users.create(item); 
        });
    });
}

const hasUser = async (login, password) => {
    res = await Users.findOne({where: {login: login, password: password}});
    return res;
}

const hasLogin = async (login) => {
    res = await Users.findOne({where: {login: login}});
    return res;
}

const hasEmail = async (email) => {
    res = await Users.findOne({where: {email: email}});
    return res;
}

const createPassAndSaltHas = async (password) => {
    const salt = await crypto.randomBytes(128).toString('base64');
    const passHash = await crypto.pbkdf2Sync(password, salt, 1, 128, 'sha256').toString('base64');
    return { salt, passHash };
}

const checkPassword = async (login, password, salt) => {
    const user = await Users.findOne({where: {login: login}});
    const passHash = await crypto.pbkdf2Sync(password, salt || user.salt, 1, 128, 'sha256').toString('base64');
    return passHash == user.password;
}

module.exports = {
    Users,
    createPassAndSaltHas,
    checkPassword,
}
