const { Orders } = require('../../models/orders'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

const GetOrderByCompanyIdController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const collection = await Orders.findOne({where: {company_id: ctx.params.id, id: ctx.params.orderId}});
                if (collection) {
                    response = { 
                        body: collection,
                        status: OK.status, 
                        status_text: OK.status_text
                    }
                } else {
                    response = { 
                        body: {},
                        status: 204,
                        status_text: 'No Content'
                    }
                }
            } else {
                response = {
                    body: err,
                    length: 0,
                    status: 401,
                    status_text: 'Unauthorized'
                }
            }
        } catch (ex) {
            response = { 
                body: ex,
                length: 0, 
                status: INTERNAL_ERROR.status, 
                status_text: INTERNAL_ERROR.status_text
            }
        }
        ctx.body = response;
      })(ctx, next);
}

module.exports = {
    GetOrderByCompanyIdController,
}