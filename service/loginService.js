const { employeeLoginDao, companyLoginDao } = require("../dao/loginDao");

const employeeloginService = async (req) => {
  return await employeeLoginDao(req);
};

const companyloginService = async (req) => {
  return await companyLoginDao(req);
};

module.exports = { employeeloginService, companyloginService };
