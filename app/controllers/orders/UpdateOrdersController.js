const { Orders } = require('../../models/orders'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, BAD_REQUEST, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

/**
 * Update order.
 * @param {ctx} - has some properties from client
 */
const UpdateOrdersController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const req = ctx.request.body;
                const order = await Orders.findOne({where: {company_id: req.company_id, id: req.id}});
                if (order) {
                    const res = await Orders.update({...req}, { where: {company_id: req.company_id, id: req.id}});
                    if (res) {
                        const checkRes = await Orders.findOne({where: {company_id: req.company_id, id: req.id}});
                        response = { 
                            body: checkRes,
                            length: 1,
                            status: OK.status,
                            status_text: OK.status_text
                        }
                    }
                } else {
                    response = { 
                        body: {textError: 'Что-то пошло не так'}, 
                        length: 0, 
                        status: BAD_REQUEST.status,
                        status_text: BAD_REQUEST.status_text
                    }
                }
            } else {
                ctx.response.status = UNAUTHORIZED.status;
            }
        } catch (ex) {
            ctx.response.status = INTERNAL_ERROR.status;
        }
        ctx.body = response;
    })(ctx, next);
}

module.exports = {
    UpdateOrdersController,
}