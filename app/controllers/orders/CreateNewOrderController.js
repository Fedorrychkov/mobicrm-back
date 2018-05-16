const { Orders } = require('../../models/orders'),
      { Customers } = require('../../models/customers'),
      passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { INTERNAL_ERROR, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED } = require('../../constants/success'),
      { ORDER_NEW } = require('../../constants/orderStatuses');

/**
 * Create a new Order.
 */
const CreateNewOrderController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const req = ctx.request.body;
                if (!req.price) req.price = 0;
                if (!req.status) req.status = ORDER_NEW; // 'NEW'
                req.customer.company_id = req.company_id; // Add company_id in customer model
                req.who_created = user.id;
                if (req.customer) { // if we have customer property, we have try find customer by phone
                    const checkPhone = await Customers.findOne({where: {company_id: req.company_id, phone: req.customer.phone}});
                    if(!checkPhone) { // if we can't find this, create new customer
                        const customer = await Customers.create(req.customer);
                        req.customer_id = customer.id;
                    } else {
                        req.customer_id = checkPhone.id;
                    }
                }
                const res = await Orders.create(req);
                if (res) {
                    const resCustomer = await Customers.findById(res.customer_id); // add more information in response about customer
                    response = {
                        body: {order: res, customer: resCustomer},
                        status: CREATED.status,
                        status_text: CREATED.status_text
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
    CreateNewOrderController,
}