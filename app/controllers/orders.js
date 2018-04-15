const { Orders } = require('../models/orders');
const passport = require('koa-passport');
const OrdersController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const collection = await Orders.findAll({where: {company_id: ctx.params.id}});
                if (collection.length > 0) {
                    response = { 
                        body: collection, 
                        length: collection.length, 
                        status: 200, 
                        status_text: 'OK'
                    }
                } else {
                    response = { 
                        body: collection, 
                        length: collection.length, 
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
                body: {},
                length: 0, 
                status: 500, 
                status_text: 'Internal Server Error'
            }
        }
        ctx.body = response;
      })(ctx, next);
}

module.exports = {
    OrdersController,
}