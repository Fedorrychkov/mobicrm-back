const { Orders } = require('../../models/orders'),
      passport = require('koa-passport'),
      { INTERNAL_ERROR } = require('../../constants/error');


require('../../authenticate/directors/auth');
const CreateNewOrderController = async (ctx, next) => {
    let response = {};
    
}
module.exports = {
    CreateNewOrderController,
}