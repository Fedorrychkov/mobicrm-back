const { Companies } = require('../../models/companies'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK, NO_CONTENT } = require('../../constants/success');

/**
 * Get company.
 * @param {ctx} - has some properties from client
 */
const GetDirectorCompaniesController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const company = user.role === 1 ? 
                    await Companies.findAll({where: {director_id: user.id}}) :
                    await Companies.findAll({where: {id: user.company_id}}); // if director, else for employees
                
                if (company.length > 0) {
                    response = { 
                        body: company,
                        length: company.length,
                        status: OK.status,
                        status_text: OK.status_text
                    }
                } else {
                    response = { 
                        body: company, 
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
    GetDirectorCompaniesController,
}