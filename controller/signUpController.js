const { employeeSignUpService, companySignUpService } = require("../service/signUpService");

const employeeSignUpController = (req, res) => {
  const newEmployee = employeeSignUpService(req);
  newEmployee
    .then(() => {
      res.status(200).json({ message: "Signed up successfully"});
    })
    .catch(() => {
      res.status(400).json({ message: "Employee id or email already exists" });
    });
};

const companySignUpController = (req, res) => {
  const newCompany = companySignUpService(req);
  newCompany
    .then(() => {
      res.status(200).json({ message: "Signed up successfully"});
    })
    .catch(() => {
      res.status(400).json({ message: "Company id or email already exists" });
    });
};

module.exports = {
  employeeSignUpController,
  companySignUpController
};
