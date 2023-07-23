const { HackathonEvent } = require("../model/hackatonEventSchema");
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

const statusListHackatonController = async(req,res) =>{
  try {
    const { type, page, limit } = req.query;

    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;

    const currentDate = new Date();

    const filter = {};
    if (type === 'active') {
      filter.startDate = { $lte: currentDate };
      filter.endDate = { $gte: currentDate };
    } else if (type === 'past') {
      filter.endDate = { $lt: currentDate };
    } else if (type === 'upcoming') {
      filter.startDate = { $gt: currentDate };
    }

    const totalHackathons = await HackathonEvent.countDocuments(filter);

    const skipItems = (currentPage - 1) * itemsPerPage;
    const hackathons = await HackathonEvent.find(filter)
      .skip(skipItems)
      .limit(itemsPerPage);

    res.status(200).json({
      total: totalHackathons,
      currentPage,
      totalPages: Math.ceil(totalHackathons / itemsPerPage),
      hackathons,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hackathons', error: error.message });
  }

}
module.exports = { addNewHackatonController,statusListHackatonController };
