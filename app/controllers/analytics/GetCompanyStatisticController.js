const { Orders,  } = require('../../models/orders'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR, UNAUTHORIZED, BAD_REQUEST } = require('../../constants/error'),
      { CREATED, OK, NO_CONTENT } = require('../../constants/success');

/**
 * Get company.
 * @param {ctx} - has some properties from client
 */
const GetCompanyStatisticController = async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user) => {
        let response = {}
        try {
            if (user) {
                const companyId = ctx.params.companyId;
                const res = await Orders.findAll({where: {company_id: companyId}});
                if (res) {
                    ordersSummary = await res.reduce((prevVal, item, index) => {
                        if (item.price == null) return prevVal + 0;
                        return prevVal + item.price;
                    }, initialValue = 0);
                    
                    response = {
                        body: {
                            orders: res,
                            ordersCount: res.length,
                            ordersSummary: ordersSummary
                        },
                        status: OK.status,
                        status_text: OK.status_text
                    }
                } else {
                    response = { 
                        body: res,
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
    GetCompanyStatisticController,
}