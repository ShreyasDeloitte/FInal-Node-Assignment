const { employeeSignUpService } = require("../service/signUpService");
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

module.exports = {
  employeeSignUpController,
};
