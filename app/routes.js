const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')();
const { GetOrdersByCompanyIdController } = require('./controllers/orders');
const { DirectorSignupController } = require('./controllers/signup');
const { DirectorLoginController } = require('./controllers/login');
const { Directors } = require('./models/directors');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
require('./authenticate/directors/auth');
const jwtConfig = require('../config/jwt.json');
const router = new Router();

router.get('/company/:id/orders', GetOrdersByCompanyIdController);
router.post('/director', bodyParser, DirectorSignupController);
router.post('/director/login', bodyParser, DirectorLoginController);

module.exports = router;