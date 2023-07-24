const mongoose = require('mongoose');

const hackathonEventSchema = new mongoose.Schema({
  hackathonId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }], // Assuming you have a Company schema for organizers
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }], // Assuming you have a User schema for participants
  website: { type: String },
  registrationOpen: { type: Boolean, default: true },
  registrationDeadline: { type: Date },
  maxParticipants: { type: Number },
  status:{ type: String},
  experience:{type: Number}
  // You can add more attributes as per your application's requirements
  
});

// Create the HackathonEvent model
const HackathonEvent = mongoose.model('HackathonEvent', hackathonEventSchema);

module.exports = {HackathonEvent};