const { employeeSignUpDao } = require("../dao/signUpDao");

const employeeSignUpService = async (req) => {
  return await employeeSignUpDao(req);
};

module.exports = { employeeSignUpService };
