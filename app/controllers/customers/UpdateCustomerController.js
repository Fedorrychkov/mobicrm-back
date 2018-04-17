const { Customers } = require('../../models/customers'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

/**
 * Get list of customers by company id.
 * @param {ctx} - has some properties from client
 */
const UpdateCustomerController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const req = ctx.request.body;
                const customer = await Customers.findOne({where: {company_id: req.company_id, id: req.id}});
                if (customer) {
                    const res = await Customers.update({...req}, { where: {company_id: req.company_id, id: req.id}});
                    if (res) {
                        const checkRes = await Customers.findOne({where: {company_id: req.company_id, id: req.id}});
                        response = { 
                            body: checkRes,
                            length: 1,
                            status: OK.status,
                            status_text: OK.status_text
                        }
                    }
                } else {
                    response = { 
                        body: {textError: 'Что-то пошло не так'}, 
                        length: 0, 
                        status: 400,
                        status_text: 'Bad request'
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
    UpdateCustomerController,
}