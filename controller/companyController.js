const { Company } = require("../model/companySchema");
const { HackathonEvent } = require("../model/hackatonEventSchema");

const listParticipantController = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const hackathonId = req.params.hackathonId;

    const company = await Company.find({ companyId: companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const hackathon = await HackathonEvent.find({
      hackathonId: hackathonId,
    }).populate("participants");
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    if (hackathon[0].organizer.toString() !== company[0]._id.toString()) {
      return res
        .status(403)
        .json({
          message:
            "Unauthorized. You are not the organizer of this Hackathon or not associated with the specified Company.",
        });
    }

    res.status(200).json({
      companyId: company[0].id,
      companyName: company[0].name,
      hackathonId: hackathon[0].id,
      title: hackathon[0].title,
      participants: hackathon[0].participants,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching participants", error: error.message });
  }
};

const deleteHackathonController = async (req, res) => {
  try {
    const hackathonId = req.params.hackathonId;
    const companyId = req.params.companyId;

    const company = await Company.find({ companyId: companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const hackathon = await HackathonEvent.find({ hackathonId: hackathonId });
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    if (hackathon[0].organizer[0].toString() !== company[0]._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized. You are not the organizer of this Hackathon.",
      });
    }

    await HackathonEvent.deleteOne({ hackathonId: hackathon[0].hackathonId });

    res.status(200).json({ message: "Hackathon successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Hackathon", error: error.message });
  }
};

const hostedEventListContoller = async (req, res) => {
  try {
    const organizerId = req.params.companyId;
    const organizer = await Company.find({ companyId: organizerId });

    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    const hackathons = await HackathonEvent.find({
      organizer: { $in: [organizer[0]._id] },
    });

    res.status(200).json({
      organizerId: organizer[0]._id,
      organizerName: organizer[0].name,
      hackathons,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching hackathons", error: error.message });
  }
};

const modifyHostedEventController = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const hackathonId = req.params.hackathonId;
    const updatedEventData = req.body;

    const company = await Company.find({ companyId: companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const hackathon = await HackathonEvent.find({ hackathonId: hackathonId });
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    if (hackathon[0].organizer.toString() !== company[0]._id.toString()) {
      return res.status(403).json({
        message:
          "Unauthorized. You are not the organizer of this Hackathon or not associated with the specified Company.",
      });
    }

    const currentDate = new Date();
    if (currentDate >= hackathon.registrationOpen) {
      return res.status(400).json({
        message:
          "Registration has already started. Cannot modify the Hackathon.",
      });
    }

    const hackathonEvent = await HackathonEvent.findByIdAndUpdate(
      hackathon[0]._id,
      updatedEventData,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({
        message: "Hackathon information updated successfully",
        hackathonEvent,
      });
  } catch (error) {
    res.status(500).json({
      message: "Error updating Hackathon information",
      error: error.message,
    });
  }
};
module.exports = {
  listParticipantController,
  deleteHackathonController,
  hostedEventListContoller,
  modifyHostedEventController,
};
