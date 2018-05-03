const { DirectorSignupController } = require('./SignupController');
const { DirectorLoginController } = require('./LoginController');
const { GetDirectorCompaniesController } = require('./GetDirectorCompaniesController');
const { UpdateDirectorController } = require('./UpdateDirectorController');
const { GetDirectorController } = require('./GetDirectorController');

module.exports = {
    DirectorLoginController,
    DirectorSignupController,
    GetDirectorCompaniesController,
    UpdateDirectorController,
    GetDirectorController,
}
