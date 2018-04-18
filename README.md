# MobiCRM Backend
### Back-end часть CRM системы, упрощающей жизнь предриятиям, нуждающимся в карте заказов и контроле выполнения работ.
## Разработка
*Веб платформа находится в разработке!* <br>
*Всегда рад критике и готов принимать предложения других специалистов!* <br>
*Разработчик* - [fedorrychkov.com](fedorrychkov.com), студент 4 курса К(П)ФУ, front-end разработчик. На данный момент работаю в Digital Zone.
## REST API LIST
### Directors
POST `/director` - sign up for directors <br/>
POST `/director/login` - authorization for directors, get bearer token <br/>
### Companies
POST `/company` - create new company <br/>
PUT `/company` - update company <br/>
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