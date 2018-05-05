const { Users } = require('../../models/users'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, BAD_REQUEST, UNAUTHORIZED } = require('../../constants/error'),
      { CREATED, OK } = require('../../constants/success');

/**
 * Update customer.
 * @param {ctx} - has some properties from client
 */
const UpdateDirectorController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const req = ctx.request.body;
                if (user.role === 1) {
                    const res = await Users.update({...req}, { where: {id: user.id}});
                    if (res) {
                        const checkRes = await Users.findOne({where: {id: user.id}});
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
                ctx.response.status = UNAUTHORIZED.status;
            }
        } catch (ex) {
            ctx.response.status = INTERNAL_ERROR.status;
        }
        ctx.body = response;
    })(ctx, next);
}

module.exports = {
    UpdateDirectorController,
}