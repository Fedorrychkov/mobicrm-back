const { Users } = require('../../models/users'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, UNAUTHORIZED, BAD_REQUEST } = require('../../constants/error'),
      { CREATED, OK, NO_CONTENT } = require('../../constants/success'),
      { userResponse } = require('../../constants/responses');

/**
 * Get one director.
 * @param {ctx}
 */
const GetUserController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {};
        try {
            if (user) {
                if (user.role != 4) {
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
                            rate_per_hour: user.rate_per_hour,
                            rate_per_order: user.rate_per_order,
                            rate_per_month: user.rate_per_month,
                            who_created: user.who_created,
                            date_birhday: user.date_birthday,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        },
                        status: OK.status,
                        status_text: OK.status_text
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
    GetUserController,
}