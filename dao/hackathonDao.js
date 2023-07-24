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
      experience
    } = req.body;
    console.log(hackathonId,title,description,startDate,endDate,organizer,participants,website,registrationOpen,registrationDeadline,maxParticipants,status)
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

    const savedHackathonEvent = await newHackathonEvent.save();
    console.log("Hi");
    return savedHackathonEvent;
   
  } catch (error) {
    throw new Error("Error while adding hackathon event: " + error.message);
  }
};

module.exports = { addHackathonEventDao };
