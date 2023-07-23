const express = require("express");
const signUpRoute = express.Router();
const { employeeSignUpController, companySignUpController} = require("../controller/signUpController");

signUpRoute.post("/employee", (req, res) => {
  employeeSignUpController(req, res);
});

signUpRoute.post("/company", (req, res) => {
  companySignUpController(req, res);
});

module.exports = {
  signUpRoute,
};
