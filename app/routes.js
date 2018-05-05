const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')();
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
require('./authenticate/auth');

const { GetOrdersByCompanyIdController,
        CreateNewOrderController,
        GetOrderByCompanyIdController,
        UpdateOrdersController } = require('./controllers/orders');
const { DirectorSignupController,
        DirectorLoginController,
        GetDirectorCompaniesController,
        UpdateDirectorController,
        GetDirectorController } = require('./controllers/directors');
const { CreateCompanyController,
        UpdateCompanyController,
        GetCompanyController } = require('./controllers/companies');
const { GetCustomerByCompanyController,
        GetCustomersByCompanyController,
        CreateCustomerController,
        UpdateCustomerController,
        GetCustomerByPhone } = require('./controllers/customers');
const { CreateNewEmployeeController,
        UpdateEmployeeController,
        GetEmployeesController,
        GetEmployeeController } = require('./controllers/employees');
const { GetRolesController } = require('./controllers/users');

const router = new Router();

/** 
 * Director Endpoints
 */
router.post('/director', bodyParser, DirectorSignupController);
router.post('/director/login', bodyParser, DirectorLoginController);
router.put('/director', bodyParser, UpdateDirectorController); // change info about director
router.get('/director/companies', GetDirectorCompaniesController);
router.get('/director', GetDirectorController);

/** 
 * Company Endpoints
 */
router.post('/company', bodyParser, CreateCompanyController);
router.put('/company', bodyParser, UpdateCompanyController);
router.get('/company/:id', GetCompanyController);

/** 
 * Orders Endpoints
 */
router.post('/company/orders', bodyParser, CreateNewOrderController);
router.put('/company/orders', bodyParser, UpdateOrdersController);
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
router.post('/company/employees', bodyParser, CreateNewEmployeeController); // Create new Employee
router.put('/company/employees', bodyParser, UpdateEmployeeController); // Update
router.get('/company/:id/employees', GetEmployeesController); // Employees list of company
router.get('/company/:id/employees/:employeeId', GetEmployeeController); // One employee of company
// router.post('/employees/login', bodyParser, {}); // login for employees ?

/**
 * Users Endpoints
 */
router.get('/user/roles', GetRolesController);

module.exports = router;