const express = require("express");
const signUpRoute = express.Router();
const { employeeSignUpController } = require("../controller/signUpController");

signUpRoute.post("/employee", (req, res) => {
  employeeSignUpController(req, res);
});

module.exports = {
  signUpRoute,
};
