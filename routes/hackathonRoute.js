const express = require("express");
const {
  addNewHackatonController,
  statusListHackatonController
} = require("../controller/hackathonController");

const hackathonRoute = express.Router();

hackathonRoute.post("/addEvent", (req, res) => {
  addNewHackatonController(req, res);
});

hackathonRoute.get("/status", (req, res) => {
  statusListHackatonController(req, res);
});

module.exports = {
  hackathonRoute,
};
