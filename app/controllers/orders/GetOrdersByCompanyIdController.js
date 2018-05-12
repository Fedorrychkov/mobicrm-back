const { Orders } = require('../../models/orders'),
      { Customers } = require('../../models/customers');
      passport = require('koa-passport'),
      { INTERNAL_ERROR, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK, NO_CONTENT } = require('../../constants/success');

/**
 * Get list of orders by company id.
 * @param {ctx} - has some properties from client
 */
const GetOrdersByCompanyIdController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const res = await Orders.findAll({where: {company_id: ctx.params.id}});
                let collection = await Promise.all(res.map( async (item, index) => {
                    let order = { order: undefined, customer: undefined };
                    order.order = item;
                    order.customer = await Customers.findOne({where : {company_id: ctx.params.id, id: item.customer_id}});
                    return order;
                }));
                if (collection.length > 0) {
                    response = { 
                        body: collection,
                        length: collection.length,
                        status: OK.status,
                        status_text: OK.status_text
                    }
                } else {
                    response = { 
                        body: collection, 
                        length: collection.length, 
                        status: NO_CONTENT.status,
                        status_text: NO_CONTENT.status_text
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
    GetOrdersByCompanyIdController,
}