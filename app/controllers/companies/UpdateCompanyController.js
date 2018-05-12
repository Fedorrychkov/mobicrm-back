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
                if (user.role === 1) {
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
                    }
                } else {
                    ctx.response.status = BAD_REQUEST.status;
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
    UpdateCompanyController,
}