const { Users, createPassAndSaltHas } = require('../../models/users'),
      crypto = require('crypto');

const DirectorSignupController = async ctx => {
    let response = {}
    const request = ctx.request.body;
    try {
        if (request.password == undefined || request.login == undefined || request.email == undefined) {
            response = {
                body: {},
                status: 400,
                status_text: 'Bad Request'
            }
        } else {
            const hasUserByLogin = await Users.findAll({where: {login: request.login}});
            const hasUserByEmail = await Users.findAll({where: {email: request.email}});
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
                newReq = request;
                newReq.password = cryptoHash.passHash;
                newReq.salt = cryptoHash.salt;
                const res = await Users.create(newReq);
                if (res) {
                    response = {
                        body: {token: ''},
                        status: 201,
                        status_text: 'Created'
                    }
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