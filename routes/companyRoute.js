const express = require("express");
const { listParticipantController, deleteHackathonController } = require("../controller/companyController");
const companyRoute = express.Router();

companyRoute.post("/listParticipant/company:companyId:/hackathon:hackathonId", (req, res) => {
    listParticipantController(req, res);
});

companyRoute.delete("/deleteHackathon/:hackathonId",(req,res)=>{
    deleteHackathonController(req,res);
})

module.exports = { companyRoute };