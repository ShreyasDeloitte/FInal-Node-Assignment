const express = require("express");
const loginRoute = express.Router();
const { loginController } = require("../controller/loginController");


loginRoute.post("/",(req, res) => {
  loginController(req, res);
});

module.exports = {
  loginRoute,
};
