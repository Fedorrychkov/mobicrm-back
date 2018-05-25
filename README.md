# MobiCRM Backend
### Back-end часть CRM системы, упрощающей жизнь предриятиям, нуждающимся в карте заказов и контроле выполнения работ.
## Разработка
*Веб платформа находится в разработке!* <br>
*Всегда рад критике и готов принимать предложения других специалистов!* <br>
*Разработчик* - [fedorrychkov.com](fedorrychkov.com), студент 4 курса К(П)ФУ, front-end разработчик. На данный момент работаю в Digital Zone.
## REST API LIST
### Users
GET `/user/roles` - list of roles for users <br/>
POST `/user/auth` - authorization for users and get bearer token <br/>
PUT `/user/update` - update user, for all, only common props <br/>
GET `/user` - get user information, endpoint for all users <br/>
### Directors
POST `/director` - sign up for directors <br/>
POST `/director/login` - authorization for directors, get bearer token <br/>
PUT `/director` - update director <br/>
GET `/director/companies` - get list of companies by director id<br/>
GET `/director` - get director info <br/>
### Companies
POST `/company` - create new company <br/>
PUT `/company` - update company <br/>
GET `/company/:id` - get company by id, or user.company_id param <br/>
### Orders
POST `/company/orders` - create new Order <br/>
PUT `/company/orders` - update Order <br/>
GET `/company/:id/orders` - get list of orders by company id <br/>
GET `/company/:id/orders/:orderId` - get order by company id <br/>
### Customers
POST `/company/customers` - create new Customer <br/>
PUT `/company/customers` - update Customer <br/>
GET `/company/:id/customers` - get list of customers by company id <br/>
GET `/company/:id/customers/phone/:phone` - get list of customers by phone and company id <br/>
GET `/company/:id/customers/:customerId` - get customer by company id <br/>
### Employees
POST `/company/employees` - create new employee <br/>
PUT `/company/employees` - update employee info <br/>
GET `/company/:id/employees` - get list of employees<br/>
GET `/company/:id/employees/:employeeId` - get one employee<br/>

### Analytics
GET `/analytics/orders/:companyId` - get some analytic onfo about orders by company
