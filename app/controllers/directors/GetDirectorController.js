const { Users } = require('../../models/users'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK, NO_CONTENT } = require('../../constants/success'),
      { userResponse } = require('../../constants/responses');

/**
 * Get one director.
 * @param {ctx}
 */
const GetDirectorController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {};
        try {
            if (user) {
                response = { 
                    body: {
                        id: user.id,
                        company_id: user.company_id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        login: user.login,
                        phone: user.phone,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                        status: user.status,
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
    GetDirectorController,
}