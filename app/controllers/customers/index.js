const { GetCustomersByCompanyController } = require('./GetCustomersByCompanyController');
const { GetCustomerByCompanyController } = require('./GetCustomerByCompanyController');
const { CreateCustomerController } = require('./CreateCustomerController');
const { UpdateCustomerController } = require('./UpdateCustomerController');
const { GetCustomerByPhone } = require('./GetCustomerByPhone');

module.exports = {
    GetCustomersByCompanyController,
    GetCustomerByCompanyController,
    CreateCustomerController,
    UpdateCustomerController,
    GetCustomerByPhone,
}
