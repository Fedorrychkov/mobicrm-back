const { Users } = require('../../models/users'),
      { Roles } = require('../../models/roles'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK, NO_CONTENT } = require('../../constants/success'),
      { userResponse } = require('../../constants/responses');

/**
 * Get one director.
 * @param {ctx}
 */
const GetRolesController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {};
        try {
            if (user) {
                const roles = await Roles.findAll();
                response = { 
                    body: {
                        roles: roles
                    },
                    length: 1,
                    status: OK.status,
                    status_text: OK.status_text
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
    GetRolesController,
}