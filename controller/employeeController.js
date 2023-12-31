const { Employee } = require("../model/employeeSchema");
const { HackathonEvent } = require("../model/hackatonEventSchema");

const registerHackathonController = async (req, res) => {
  try {
    const { employeeId, hackathonId } = req.body;

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const hackathon = await HackathonEvent.findOne({ hackathonId });
    if (!hackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }

    // Check whether max particpant is execeeded or not
    const maxParticipantCount = hackathon.participants.length;
    if (maxParticipantCount >= hackathon.maxParticipants) {
      return res.status(404).json({ error: "Max Participant exceeded" });
    }

    // Check whether year of experience is exceeded
    if (employee.experience <= hackathon.experience) {
      return res.status(404).json({ error: "work experience expected" });
    }

    // Check whether register date is passed
    const startDate = hackathon.startDate;
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getUTCDate()).padStart(2, "0");
    const hours = String(currentDate.getUTCHours()).padStart(2, "0");
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, "0");
    const currentDateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;

    if (startDate >= currentDateTimeString) {
      return res.status(404).json({ error: "register date is passed" });
    }

    // Check if the employee is already registered for the hackathon
    if (employee.registeredHackathons.includes(hackathonId)) {
      return res
        .status(400)
        .json({ error: "Employee is already registered for this hackathon" });
    }
    const registeredHackathons = await HackathonEvent.find({
      _id: { $in: employee.registeredHackathons },
    });
    const hasSchedulingConflict = registeredHackathons.some(
      (registeredHackathon) => {
        return (
          hackathon.startDate < registeredHackathon.endDate &&
          hackathon.endDate > registeredHackathon.startDate
        );
      }
    );
    if (hasSchedulingConflict) {
      return res.status(409).json({
        error:
          "Employee has a scheduling conflict with another registered hackathon",
      });
    }
    // If there are no conflicts, register the employee for the new hackathon
    employee.registeredHackathons.push(hackathon.id);
    await employee.save();

    hackathon.participants.push(employee.id);
    hackathon.maxParticipants = hackathon.maxParticipants - 1;
    hackathon
      .save()
      .then(() => {
        res.status(200).json({
          message: "Employee successfully registered to Hackathon Event",
        });
      })
      .catch(() => {
        res.status(400).json({ message: "Hackathon registration failed" });
      });
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({ error: "Error registering employee" });
  }
};

const registeredHackathonController = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const hackathons = await HackathonEvent.find({
      participants: employee._id,
    });
    res.status(200).json({
      employeeId: employee.employeeId,
      fullName: employee.fullName,
      hackathons,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching hackathons", error: error.message });
  }
};
module.exports = { registerHackathonController, registeredHackathonController };
