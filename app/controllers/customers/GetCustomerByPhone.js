const { Customers } = require('../../models/customers'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK, NO_CONTENT } = require('../../constants/success');

/**
 * Get one customer by company id.
 * @param {ctx} - has some properties from client
 */
const GetCustomerByPhone = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const res = await Customers.findOne({where: {company_id: ctx.params.id, phone: ctx.params.phone}});
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
    GetCustomerByPhone,
}