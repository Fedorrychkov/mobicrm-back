const { Customers } = require('../../models/customers'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK, NO_CONTENT } = require('../../constants/success');

/**
 * Get list of customers by company id.
 * @param {ctx} - has some properties from client
 */
const GetCustomersByCompanyController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const collection = await Customers.findAll({where: {company_id: ctx.params.id}});
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
    GetCustomersByCompanyController,
}