const passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { Companies } = require('../../models/companies'),
      { INTERNAL_ERROR, UNAUTHORIZED, BAD_REQUEST } = require('../../constants/error'),
      { CREATED } = require('../../constants/success'),
      { directorRoleId } = require('../../constants/roles');

const CreateCompanyController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user && user.role == directorRoleId) {
                const req = ctx.request.body;
                if (!req.currency) req.currency = 'RUB';
                let newReq = {
                    ...req,
                    director_id: user.id,
                    status: 'ACTIVE',
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
                ctx.response.status = UNAUTHORIZED.status;
            }
        } catch (ex) {
            ctx.response.status = INTERNAL_ERROR.status;
        }
        ctx.body = response;
    })(ctx, next);
}

module.exports = {
    CreateCompanyController,
}