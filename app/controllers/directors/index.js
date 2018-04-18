const { DirectorSignupController } = require('./SignupController');
const { DirectorLoginController } = require('./LoginController');
const { GetDirectorCompaniesController } = require('./GetDirectorCompaniesController');
const { UpdateDirectorController } = require('./UpdateDirectorController');

module.exports = {
    DirectorLoginController,
    DirectorSignupController,
    GetDirectorCompaniesController,
    UpdateDirectorController,
}
