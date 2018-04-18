const passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { Companies } = require('../../models/companies'),
      { INTERNAL_ERROR, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED } = require('../../constants/success');

const CreateCompanyController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user && user.role == 1) {
                const req = ctx.request.body;
                let newReq = {
                    ...req,
                    director_id: user.id,
                    status: 'NEW COMPANY',
                };
                const res = await Companies.create(newReq);

                if (res) {
                    response = {
                        body: res,
                        status: CREATED.status,
                        status_text: CREATED.status_text
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
                body: {},
                length: 0, 
                status: INTERNAL_ERROR.status, 
                status_text: INTERNAL_ERROR.status_text
            }
        }
        ctx.body = response;
    })(ctx, next);
}

module.exports = {
    CreateCompanyController,
}