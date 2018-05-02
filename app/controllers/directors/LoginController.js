const passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { INTERNAL_ERROR, BAD_REQUEST } = require('../../constants/error'),
      { OK } = require('../../constants/success');


const DirectorLoginController = async (ctx, next) => {
    try {
        await passport.authenticate('local', (err, user) => {
            response = {};
            if (user == false) {
                response = { 
                    body: err, 
                    status: INTERNAL_ERROR.status,
                    status_text: INTERNAL_ERROR.status_text
                }
                ctx.body = response;
            } else {
                const payload = {
                    id: user.id,
                    displayName: user.login,
                    email: user.email
                };
                const token = jwt.sign(payload, jwtConfig.mysecretkey);
                ctx.body = {
                    body: {
                        id: user.id,
                        role: user.role,
                        user: user.login,
                        email: user.email 
                    }, 
                    token: token,
                    status: OK.status,
                    status_text: OK.status_text
                };
            }
        })(ctx, next);
    } catch (ex) {
        ctx.body = {
            body: {textError: 'Логин или пароль не верны!'}, 
            token: null,
            status: BAD_REQUEST.status,
            status_text: BAD_REQUEST.status_text
        };
    }
}

module.exports = {
    DirectorLoginController,
}