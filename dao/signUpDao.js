const { Company } = require("../model/companySchema");
const { Employee } = require("../model/employeeSchema");
const { encryptPassword } = require("../utilities/passwordEncryption");

const employeeSignUpDao = async (req) => {
  try {
    let { employeeId, email, fullName, password, skills, designation,experience } = req.body;
    const hashedPassword = await encryptPassword(password);
    const newEmployee = new Employee({
      employeeId,
      email,
      fullName,
      password: hashedPassword,
      skills,
      designation,
      experience
    });
    const savedEmployee = await newEmployee.save();
    return savedEmployee;
  } catch (error) {
    throw new Error("Error while signing up employee: " + error.message);
  }
};

const companySignUpDao = async (req) => {
  try {
    let { companyId, email, fullName, password, description } = req.body;
    const hashedPassword = await encryptPassword(password);
    const newCompany = new Company({
      companyId,
      email,
      fullName,
      password: hashedPassword,
      description,
    });
    const savedCompany = await newCompany.save();
    return savedCompany;
  } catch (error) {
    throw new Error("Error while signing up company: " + error.message);
  }
};

module.exports = { employeeSignUpDao, companySignUpDao };
