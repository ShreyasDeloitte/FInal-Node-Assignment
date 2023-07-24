const { Company } = require("../model/companySchema");
const { HackathonEvent } = require("../model/hackatonEventSchema");

const addHackathonEventDao = async (req) => {
  try {
    const {
      hackathonId,
      title,
      description,
      startDate,
      endDate,
      organizer,
      participants,
      website,
      registrationOpen,
      registrationDeadline,
      maxParticipants,
      status,
      experience,
      companyId
    } = req.body;
    const company = await Company.findOne({companyId});
    if (!company) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const newHackathonEvent = new HackathonEvent({
      hackathonId,
      title,
      description,
      startDate,
      endDate,
      organizer,
      participants,
      website,
      registrationOpen,
      registrationDeadline,
      maxParticipants,
      status,
      experience
    });
    newHackathonEvent.organizer.push(company._id);
    const savedHackathonEvent = await newHackathonEvent.save();
    return savedHackathonEvent;
   
  } catch (error) {
    throw new Error("Error while adding hackathon event: " + error.message);
  }
};

module.exports = { addHackathonEventDao };
