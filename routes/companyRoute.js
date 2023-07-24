const express = require("express");
const {
  listParticipantController,
  deleteHackathonController,
  hostedEventListContoller
} = require("../controller/companyController");
const companyRoute = express.Router();
const { verifyAuthentication } = require("../utilities/verifyAuthentication");
companyRoute.get(
  "/listParticipant/company:companyId:/hackathon:hackathonId",
  (req, res) => {
    listParticipantController(req, res);
  }
);

companyRoute.delete(
  "/deleteHackathon/:hackathonId",
  verifyAuthentication,
  (req, res) => {
    deleteHackathonController(req, res);
  }
);

companyRoute.get("/listHostedEvent/:companyId", (req, res) => {
    hostedEventListContoller(req, res);
});

companyRoute.put("/modifyHackathon/:companyId:/hackathonId", (req, res) => {
  modifyHostedEventController(req, res);
});
module.exports = { companyRoute };
