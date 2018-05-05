const { Users, createPassAndSaltHas } = require('../../models/users'),
      passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { INTERNAL_ERROR, UNAUTHORIZED, BAD_REQUEST } = require('../../constants/error'),
      { CREATED } = require('../../constants/success');

/**
 * Create new Employee.
 */
const CreateNewEmployeeController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user && user.role === 1) {
                const req = ctx.request.body;
                const checkUserLogin = await Users.findOne({where: {login: req.login}});
                const checkUserEmail = await Users.findOne({where: {email: req.email}});
                if (!checkUserLogin && !checkUserEmail) {
                    let cryptoHash = {
                        salt: '',
                        passHash: ''
                    };
                    cryptoHash = await createPassAndSaltHas(req.password);
                    let newReq = req;
                    newReq.password = cryptoHash.passHash;
                    newReq.salt = cryptoHash.salt;
                    const res = await Users.create(newReq);
                    if (res) {
                        const checkRes = await Users.findById(res.id);
                        response = {
                            body: checkRes,
                            status: CREATED.status,
                            status_text: CREATED.status_text
                        }
                    }
                } else {
                    response = { 
                        body: {errorText: 'Сотрудник с такой почтой или логином уже существует!'}, 
                        length: 0,
                        status: BAD_REQUEST.status,
                        status_text: BAD_REQUEST.status_text
                    }
                }
            } else {
                ctx.response.status = UNAUTHORIZED.status;
            }
        } catch (ex) {
            ctx.response.status = INTERNAL_ERROR.status;
        }
        ctx.body = response;
    })(ctx, next);
}
module.exports = {
    CreateNewEmployeeController,
}