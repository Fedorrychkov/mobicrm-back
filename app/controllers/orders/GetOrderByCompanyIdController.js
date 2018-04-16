const { Orders } = require('../../models/orders'),
      { Customers } = require('../../models/customers'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

/**
 * Get one order by id and by company id.
 * @param {ctx} - has some properties from client
 */
const GetOrderByCompanyIdController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const res = await Orders.findOne({where: {company_id: ctx.params.id, id: ctx.params.orderId}});
                const customer = await Customers.findOne({where: {id: res.customer_id}});
                if (res && customer) {
                    const newRes = {
                        order: res,
                        customer
                    }
                    response = {
                        body: newRes,
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