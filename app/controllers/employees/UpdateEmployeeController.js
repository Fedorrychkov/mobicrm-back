const { Users, createPassAndSaltHas } = require('../../models/users'),
      passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { INTERNAL_ERROR, UNAUTHORIZED, BAD_REQUEST } = require('../../constants/error'),
      { OK, CREATED } = require('../../constants/success');

/**
 * Update Employee.
 */
const UpdateEmployeeController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user && user.role === 1) {
                const req = ctx.request.body;
                const employee = await Users.findById(req.id);
                if (employee) {
                    const res = await Users.update(req, { where: {id: req.id}});
                    if (res) {
                        const checkRes = await Users.findById(req.id);
                        response = {
                            body: checkRes,
                            status: OK.status,
                            status_text: OK.status_text
                        }
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
    UpdateEmployeeController,
}