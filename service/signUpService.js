const { employeeSignUpDao, companySignUpDao } = require("../dao/signUpDao");

const employeeSignUpService = async (req) => {
  return await employeeSignUpDao(req);
};

const companySignUpService = async (req) => {
  return await companySignUpDao(req);
};
module.exports = { employeeSignUpService, companySignUpService };
