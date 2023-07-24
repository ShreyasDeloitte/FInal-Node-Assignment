const express = require("express");
const { listParticipantController } = require("../controller/employeeController");
const companyRoute = express.Router();

companyRoute.post("/listParticipant/company:companyId:/hackathon:hackathonId", (req, res) => {
    listParticipantController(req, res);
});

module.exports = { companyRoute };