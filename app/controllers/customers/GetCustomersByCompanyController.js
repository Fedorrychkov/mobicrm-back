const { Customers } = require('../../models/customers'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

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
    GetCustomersByCompanyController,
}