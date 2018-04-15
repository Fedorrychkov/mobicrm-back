const passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { INTERNAL_ERROR } = require('../../constants/error'),
      { OK } = require('../../constants/success');

require('../../authenticate/directors/auth');

const DirectorLoginController = async (ctx, next) => {
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
                user: user.login,
                email: user.email 
            }, 
            token: token,
            status: OK.status,
            status_text: OK.status_text
        };
    }
  })(ctx, next);
}

module.exports = {
    DirectorLoginController,
}