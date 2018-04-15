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
### Orders
POST `/company/orders` - create new Order <br/>
GET `/company/:id/orders` - get list of orders by company id <br/>
GET `/company/:id/orders/:orderId` - get order by company id <br/>