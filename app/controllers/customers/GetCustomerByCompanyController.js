const { Customers } = require('../../models/customers'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

/**
 * Get one customer by company id.
 * @param {ctx} - has some properties from client
 */
const GetCustomerByCompanyController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const res = await Customers.findOne({where: {company_id: ctx.params.id, id: ctx.params.customerId}});
                if (res) {
                    response = { 
                        body: res,
                        length: 1,
                        status: OK.status,
                        status_text: OK.status_text
                    }
                } else {
                    response = { 
                        body: res, 
                        length: 0, 
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
    GetCustomerByCompanyController,
}