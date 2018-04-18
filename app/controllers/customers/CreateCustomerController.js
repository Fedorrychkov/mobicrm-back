const { Customers } = require('../../models/customers'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, BAD_REQUEST, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

/**
 * Create new Customer
 * @param {ctx} - has some properties from client
 */
const CreateCustomerController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const req = ctx.request.body;
                const checkCustomer = await Customers.findOne({where: {company_id: req.company_id, phone: req.phone}});
                if (!checkCustomer && req.company_id) {
                    const res = await Customers.create(req);
                    if (res) {
                        response = { 
                            body: res,
                            length: 1,
                            status: CREATED.status,
                            status_text: CREATED.status_text
                        }
                    } else {
                        response = { 
                            body: res, 
                            length: 0, 
                            status: BAD_REQUEST.status,
                            status_text: BAD_REQUEST.status_text
                        }
                    }
                } else {
                    response = { 
                        body: {errorText: 'Клиент с таким телефоном уже есть'}, 
                        length: 0, 
                        status: BAD_REQUEST.status,
                        status_text: BAD_REQUEST.status_text
                    }
                }
            } else {
                response = {
                    body: err,
                    length: 0,
                    status: UNAUTHORIZED.status,
                    status_text: UNAUTHORIZED.status_text
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
    CreateCustomerController,
}