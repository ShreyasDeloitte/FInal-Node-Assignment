const express = require("express");
const { listParticipantController, deleteHackathonController } = require("../controller/companyController");
const companyRoute = express.Router();

companyRoute.get("/listParticipant/company:companyId:/hackathon:hackathonId", (req, res) => {
    listParticipantController(req, res);
});

companyRoute.delete("/deleteHackathon/:hackathonId",(req,res)=>{
    deleteHackathonController(req,res);
})

companyRoute.get("/listHostedEvent/:companyId",(req,res)=>{
    listHostedEventContoller(req,res);
})

companyRoute.put("/modifyHackathon/:companyId:/hackathonId",(req,res)=>{
    modifyHostedEventController(req,res);
})
module.exports = { companyRoute };