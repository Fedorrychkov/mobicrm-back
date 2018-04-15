const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
require('../authenticate/directors/auth');
const jwtConfig = require('../../config/jwt.json');

const DirectorLoginController = async (ctx, next) => {
  await passport.authenticate('local', (err, user) => {
    if (user == false) {
      ctx.body = "Login failed";
    } else {
      //--payload - info to put in the JWT
      const payload = {
        id: user.id,
        displayName: user.login,
        email: user.email
      };
      console.log(payload);
      const token = jwt.sign(payload, jwtConfig.mysecretkey);
      ctx.body = {user: user.login, token: token};
    }
  })(ctx, next);
}

module.exports = {
    DirectorLoginController,
}