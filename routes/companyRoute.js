const express = require("express");
const {
  listParticipantController,
  deleteHackathonController,
  hostedEventListContoller,
  modifyHostedEventController
} = require("../controller/companyController");
const companyRoute = express.Router();
const { verifyAuthentication } = require("../utilities/verifyAuthentication");

companyRoute.get(
  "/listParticipant/companyId/:companyId/hackathonId/:hackathonId",
  (req, res) => {
    listParticipantController(req, res);
  }
);

companyRoute.delete(
  "/deleteHackathon/companyId/:companyId/hackathonId/:hackathonId",verifyAuthentication,
  (req, res) => {
    deleteHackathonController(req, res);
  }
);

companyRoute.get("/listHostedEvent/companyId/:companyId", (req, res) => {
    hostedEventListContoller(req, res);
});

companyRoute.put("/modifyHackathon/companyId/:companyId/hackathonId/:hackathonId", (req, res) => {
  modifyHostedEventController(req, res);
});

module.exports = { companyRoute };
