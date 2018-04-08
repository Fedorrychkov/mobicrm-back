const { Orders } = require('../models/orders');

const OrdersController = async ctx => {
    let response = {}
    try {
        const collection = await Orders.findAll({where: {company_id: ctx.params.id}});
        if (collection.length > 0) {
            response = { 
                body: collection, 
                length: collection.length, 
                status: 200, 
                status_text: 'OK'
            }
        } else {
            response = { 
                body: collection, 
                length: collection.length, 
                status: 204,
                status_text: 'No Content'
            }
        }
    } catch (ex) {
        response = { 
            body: {},
            length: 0, 
            status: 500, 
            status_text: 'Internal Server Error'
        }
    }
    ctx.body = response;
}

module.exports = {
    OrdersController,
}