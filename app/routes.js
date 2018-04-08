const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')();
const { OrdersController } = require('./controllers/orders');
const { DirectorSignupController } = require('./controllers/signup');

const router = new Router();

router.get('/company/:id/orders', OrdersController);
router.post('/auth/director', bodyParser, DirectorSignupController);
router.post('/', bodyParser, ctx => {
    ctx.body = { data: ctx.request.body }
});

module.exports = router;