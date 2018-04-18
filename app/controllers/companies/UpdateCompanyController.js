const { Companies } = require('../../models/companies'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, BAD_REQUEST, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

/**
 * Update company.
 * @param {ctx} - has some properties from client
 */
const UpdateCompanyController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const req = ctx.request.body;
                const customer = await Companies.findOne({where: {id: req.id}});
                if (customer) {
                    const res = await Companies.update({...req}, { where: {id: req.id}});
                    if (res) {
                        const checkRes = await Companies.findOne({where: {id: req.id}});
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
    UpdateCompanyController,
}