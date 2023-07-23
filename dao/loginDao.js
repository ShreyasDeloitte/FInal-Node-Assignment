const { Company } = require("../model/companySchema");
const { Employee } = require("../model/employeeSchema");

const employeeLoginDao = async (req) => {
  try {
    const { email } = req.body;
    const employeeUser = await Employee.findOne({ email });
    return employeeUser;
  } catch (error) {
    throw new Error("Error while logging in employee: " + error.message);
  }
};

const companyLoginDao = async (req) => {
  try {
    const { email } = req.body;
    const companyUser = await Company.findOne({ email });
    return companyUser;
  } catch (error) {
    throw new Error("Error while logging in company: " + error.message);
  }
};

module.exports = { employeeLoginDao, companyLoginDao };
