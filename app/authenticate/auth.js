const passport = require('koa-passport'),
      { db }   = require('../db/db'),
      { Users, checkPassword } = require('../models/users'),
      LocalStrategy = require('passport-local'), //local Auth Strategy
      JwtStrategy = require('passport-jwt').Strategy, // Auth via JWT
      ExtractJwt = require('passport-jwt').ExtractJwt;
      crypto = require('crypto'),
      jwtConfig = require('../../config/jwt.json');

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
  session: false
},
async (login, password, done) => {
  await Users.findOne({where: {login: login}})
    .then( async user => {
      const passEqual = await checkPassword(login, password, user.salt)
      if (!user || !passEqual) {
        return done(null, false, {message: 'Пользователь или пароль неверны.'});
      }
      return done(null, user);
    })
    .catch(err => {
      return done(err);
    });
}));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.mysecretkey
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  await Users.findById(payload.id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      return done(err);
    });
}));
