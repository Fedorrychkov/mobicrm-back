const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router();
router.get('/', ctx => {
    ctx.body = 'hop hey'
});
router.post('/', bodyParser, ctx => {
    ctx.body = { data: ctx.request.body }
});

module.exports = router;