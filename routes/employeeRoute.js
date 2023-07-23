const express = require("express");
const { registerHackathonController } = require("../controller/employeeController");
const employeeRoute = express.Router();

employeeRoute.post("/enroll", (req, res) => {
  registerHackathonController(req, res);
});

module.exports = { employeeRoute };
