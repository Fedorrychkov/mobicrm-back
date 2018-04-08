const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')();
const { OrdersController } = require('./controllers/orders');

const router = new Router();
router.get('/', ctx => {
    ctx.body = 'Welcome to MobiCRM service'
});
router.get('/company/:id/orders', OrdersController);
router.post('/', bodyParser, ctx => {
    ctx.body = { data: ctx.request.body }
});

module.exports = router;