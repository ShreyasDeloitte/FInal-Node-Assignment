const { addHackathonEventService } = require("../service/hackathonService");

const addNewHackatonController = (req, res) => {
    const savedHackathonEvent = addHackathonEventService(req);
    console.log(savedHackathonEvent,"log saved Hackathon");
    savedHackathonEvent
    .then(() => {
        res.status(200).json({ message: "Hackathon event added successfully" });
      })
    .catch(() => {
        res.status(400).json({ message: "Hackathon event hosting failed" });
      });
  };
  
module.exports = { addNewHackatonController };
