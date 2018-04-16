const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')();
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
require('./authenticate/auth');
const { GetOrdersByCompanyIdController, CreateNewOrderController, GetOrderByCompanyIdController } = require('./controllers/orders/');
const { DirectorSignupController, DirectorLoginController } = require('./controllers/directors/');
const { CreateCompanyController } = require('./controllers/companies/');

const router = new Router();

/** Director Endpoints */
router.post('/director', bodyParser, DirectorSignupController);
router.post('/director/login', bodyParser, DirectorLoginController);

/** Company Endpoints */
router.post('/company', bodyParser, CreateCompanyController);
router.post('/company/orders', bodyParser, CreateNewOrderController);
router.get('/company/:id/orders', GetOrdersByCompanyIdController); // Для сортировки добавить больше ссылок, 
router.get('/company/:id/orders/:orderId', GetOrderByCompanyIdController);

module.exports = router;