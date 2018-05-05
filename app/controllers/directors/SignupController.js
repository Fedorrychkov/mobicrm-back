const { Users, createPassAndSaltHas } = require('../../models/users'),
      crypto = require('crypto'),
      { INTERNAL_ERROR, BAD_REQUEST } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

const DirectorSignupController = async ctx => {
    let response = {}
    const request = ctx.request.body;
    try {
        if (request.password == undefined || request.login == undefined || request.email == undefined) {
            response = {
                body: {textError: 'В запросе отсутствует пароль, логин или электронная почта'},
                status: BAD_REQUEST.status,
                status_text: BAD_REQUEST.status_text
            }
        } else {
            const hasUserByLogin = await Users.findAll({where: {login: request.login}});
            const hasUserByEmail = await Users.findAll({where: {email: request.email}});
            if (hasUserByLogin.length > 0 || hasUserByEmail.length > 0) {
                response = {
                    body: {textError: 'Логин или email заняты'},
                    status: BAD_REQUEST.status,
                    status_text: BAD_REQUEST.status_text
                }
            } else {
                let cryptoHash = {
                    salt: '',
                    passHash: ''
                };
                cryptoHash = await createPassAndSaltHas(request.password);
                newReq = request;
                newReq.password = cryptoHash.passHash;
                newReq.salt = cryptoHash.salt;
                const res = await Users.create(newReq);
                if (res) {
                    response = {
                        body: {textSuccess: 'Успешная регистрация'},
                        status: CREATED.status,
                        status_text: CREATED.status_text
                    }
                }
            }
        }
    } catch (ex) {
        ctx.response.status = INTERNAL_ERROR.status;
    }
    ctx.body = response;
}

module.exports = {
    DirectorSignupController,
}