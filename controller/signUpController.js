const { employeeSignUpService, companySignUpService } = require("../service/signUpService");
const { jwtSign } = require("../utilities/jwtSign");

const employeeSignUpController = (req, res) => {
  const newEmployee = employeeSignUpService(req);
  const token = jwtSign({ employeeId: req.body?.employeeId });
  newEmployee
    .then(() => {
      res.status(200).json({ message: "Signed up successfully", token });
    })
    .catch(() => {
      res.status(400).json({ message: "Employee id or email already exists" });
    });
};

const companySignUpController = (req, res) => {
  const newCompany = companySignUpService(req);
  const token = jwtSign({ companyId: req.body?.companyId });
  newCompany
    .then(() => {
      res.status(200).json({ message: "Signed up successfully", token });
    })
    .catch(() => {
      res.status(400).json({ message: "Company id or email already exists" });
    });
};

module.exports = {
  employeeSignUpController,
  companySignUpController
};
