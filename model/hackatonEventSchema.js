const mongoose = require("mongoose");

const hackathonEventSchema = new mongoose.Schema({
  hackathonId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  website: { type: String },
  registrationOpen: { type: Boolean, default: true },
  registrationDeadline: { type: Date },
  maxParticipants: { type: Number },
  status: { type: String },
  experience: { type: Number },
});

// Create the HackathonEvent model
const HackathonEvent = mongoose.model("HackathonEvent", hackathonEventSchema);

module.exports = { HackathonEvent };
