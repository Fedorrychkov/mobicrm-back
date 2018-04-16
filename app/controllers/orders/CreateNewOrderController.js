const { Orders } = require('../../models/orders'),
      passport = require('koa-passport'),
      jwt = require('jsonwebtoken'),
      jwtConfig = require('../../../config/jwt.json'),
      { INTERNAL_ERROR } = require('../../constants/error'),
      { CREATED } = require('../../constants/success');

const CreateNewOrderController = async (ctx, next) => {
    let response = {};
    
}
module.exports = {
    CreateNewOrderController,
}