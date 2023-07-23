const { Employee } = require("../model/employeeSchema");
const { encryptPassword } = require("../utilities/passwordEncryption");

const employeeSignUpDao = async (req) => {
  try {
    let {
      employeeId,
      email,
      fullName,
      password,
      userRole,
      skills,
      designation,
    } = req.body;
    const hashedPassword = await encryptPassword(password);
    const newEmployee = new Employee({
      employeeId,
      email,
      fullName,
      password: hashedPassword,
      userRole,
      skills,
      designation,
    });
    const savedEmployee = await newEmployee.save();
    return savedEmployee;
  } catch (error) {
    throw new Error("Error while signing up employee: " + error.message);
  }
};

module.exports = { employeeSignUpDao };
