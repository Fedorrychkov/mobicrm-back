const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')();
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
require('./authenticate/auth');

const { GetOrdersByCompanyIdController,
        CreateNewOrderController,
        GetOrderByCompanyIdController } = require('./controllers/orders/');
const { DirectorSignupController,
        DirectorLoginController } = require('./controllers/directors/');
const { CreateCompanyController } = require('./controllers/companies/');
const { GetCustomerByCompanyController,
        GetCustomersByCompanyController,
        CreateCustomerController,
        UpdateCustomerController,
        GetCustomerByPhone } = require('./controllers/customers')

const router = new Router();

/** 
 * Director Endpoints
 */
router.post('/director', bodyParser, DirectorSignupController);
// router.put('/director', bodyParser, {}); // change info about director
router.post('/director/login', bodyParser, DirectorLoginController);

/** 
 * Company Endpoints
 */
router.post('/company', bodyParser, CreateCompanyController);
// router.put('/company', bodyParser, {}); // Change info about company
// router.get('/company/:id', {}); // Get one company
// router.get('/director/:id/company', {}); // Get List of company by director id if role == director (1)

/** 
 * Orders Endpoints
 */
router.post('/company/orders', bodyParser, CreateNewOrderController);
// router.put('/company/:id/orders/:orderId', bodyParser, {}); // change info about order
router.get('/company/:id/orders', GetOrdersByCompanyIdController); // Для сортировки добавить больше ссылок,
router.get('/company/:id/orders/:orderId', GetOrderByCompanyIdController);

/**
 * Customers Endpoints
 */
router.post('/company/customers', bodyParser, CreateCustomerController); // Create new customer
router.put('/company/customers', UpdateCustomerController); // Change info about customer in company
router.get('/company/:id/customers/phone/:phone', GetCustomerByPhone); // Get Customer by Phone
router.get('/company/:id/customers', GetCustomersByCompanyController); // Get list of customer in company
router.get('/company/:id/customers/:customerId', GetCustomerByCompanyController); // Get one of customer in company

/**
 * Employees Endpoints
 */
// router.post('/company/:id/employees', bodyParser, {}); // Create new Employee
// router.get('/company/:id/employees', {}); // Employees list of company
// router.get('/company/:id/employees/:employeeId', {}); // One employee of company
// router.post('/employees/login', bodyParser, {}); // login for employees ?

module.exports = router;