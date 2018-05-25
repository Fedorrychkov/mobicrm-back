const { Users } = require('../../models/users'),
      passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { INTERNAL_ERROR, UNAUTHORIZED, BAD_REQUEST } = require('../../constants/error'),
      { OK, CREATED } = require('../../constants/success');

/**
 * Update Employee.
 */
const UserUpdateController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const req = ctx.request.body;
                const profile = await Users.findById(req.id);
                if (profile) {
                    const person = {
                        id: req.id,
                        first_name: req.first_name,
                        last_name: req.last_name,
                        login: req.login,
                        email: req.email,
                        phone: req.phone,
                        status: req.status
                    }
                    const res = await Users.update(person, { where: {id: person.id}});
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
    UserUpdateController,
}