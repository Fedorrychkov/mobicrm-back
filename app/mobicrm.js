const Koa           = require('koa'),
      bodyParser    = require('koa-bodyparser'),
      // session       = require('koa-session'),
      session       = require("koa-session2"),
      cors          = require('kcors'),
      requestId     = require('./middlewares/requestId'),
      logger        = require('koa-logger'),
      serve         = require('koa-static'),
      passport      = require('koa-passport'),
      LocalStrategy = require('passport-local'),
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt;

const config = require('../config/application.json');
const router = require('./routes');
const app = new Koa();

// app.keys = ['some secret hurr'];
 
// const CONFIG = {
//   key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//   /** (number || 'session') maxAge in ms (default is 1 days) */
//   /** 'session' will result in a cookie that expires when session/browser is closed */
//   /** Warning: If a session cookie is stolen, this cookie will never expire */
//   maxAge: 86400000,
//   overwrite: true, /** (boolean) can overwrite or not (default true) */
//   httpOnly: true, /** (boolean) httpOnly or not (default true) */
//   signed: true, /** (boolean) signed or not (default true) */
//   rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//   renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// };

app
  // .use(session(CONFIG, app))
  .use(session)
  .use(passport.initialize())
  .use(router.routes())
  .use(serve('public'))
  .use(logger())
  .use(
    bodyParser({
      enableTypes: ['json', 'form'],
      formLimit: '10mb',
      jsonLimit: '10mb'
    })
  )
  .use(requestId())
  .use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      exposeHeaders: ['X-Request-Id']
    })
  )
  .listen(config.port);

console.log(`MobiCRM started in ${config.port}`);
