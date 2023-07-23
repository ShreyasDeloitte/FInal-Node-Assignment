const express = require("express");
const {
  addNewHackatonController,
} = require("../controller/hackathonController");
const hackathonRoute = express.Router();

hackathonRoute.post("/addEvent", (req, res) => {
  addNewHackatonController(req, res);
});

module.exports = {
  hackathonRoute,
};
