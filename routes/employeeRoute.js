const express = require("express");
const { registerHackathonController ,registeredHackathonController} = require("../controller/employeeController");
const employeeRoute = express.Router();

employeeRoute.post("/enroll", (req, res) => {
  registerHackathonController(req, res);
});

employeeRoute.get("/registeredhackathons/:employeeId", (req, res) => {
  registeredHackathonController(req, res);
});

module.exports = { employeeRoute };
