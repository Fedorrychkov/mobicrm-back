const Koa           = require('koa'),
      bodyParser    = require('koa-bodyparser'),
      cors          = require('kcors'),
      requestId     = require('./middlewares/requestId'),
      logger        = require('koa-logger'),
      serve         = require('koa-static'),
      passport      = require('koa-passport'),
      session       = require('koa-session'),
      LocalStrategy = require('passport-local'),
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt;

const config        = require('../config/application.json');
const router        = require('./routes');
const app           = new Koa();

app.keys = ['SECRET'];
app
  .use(session({}, app))
  .use(passport.initialize())
  .use(passport.session())
  .use(serve('public'))
  .use(logger(new Date()))
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
  .use(router.routes())
  .listen(config.port);

console.log(`MobiCRM started in ${config.port}`);
