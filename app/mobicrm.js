const Koa           = require('koa'),
      bodyParser    = require('koa-bodyparser'),
      cors          = require('kcors'),
      requestId     = require('./middlewares/requestId');
      logger        = require('koa-logger')
      serve         = require('koa-static'),
      passport      = require('koa-passport'),
      LocalStrategy = require('passport-local'),
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt;

const config = require('../config/application.json');
const router = require('./routes');
const app = new Koa();

app
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
