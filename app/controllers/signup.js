const { Directors, createPassAndSaltHas } = require('../models/directors'),
      crypto = require('crypto');

const DirectorSignupController = async ctx => {
    let response = {}
    const request = ctx.request.body;
    try {
        const hasUserByLogin = await Directors.findAll({where: {login: request.login}});
        const hasUserByEmail = await Directors.findAll({where: {email: request.email}});
        if (hasUserByLogin.length > 0 || hasUserByEmail.length > 0) {
            response = {
                body: {},
                status: 400,
                status_text: 'Логин или email заняты'
            }
        } else {
            let cryptoHash = {
                salt: '',
                passHash: ''
            };
            cryptoHash= await createPassAndSaltHas(request.password);
            // ctx.session.pass = passHash.toString('base64');
            const res = await Directors.create({
                login: request.login,
                password: cryptoHash.passHash,
                salt: cryptoHash.salt,
                first_name: request.first_name,
                last_name: request.last_name,
                email: request.email
            });
            if (res) {
                response = {
                    body: {token: ''},
                    status: 201,
                    status_text: 'Created'
                }
            }
        }
    } catch (ex) {
        response = {
            body: {},
            errorBody: ex,
            status: 500,
            status_text: 'Internal Server Error'
        }
    }
    ctx.body = response;
}

module.exports = {
    DirectorSignupController,
}