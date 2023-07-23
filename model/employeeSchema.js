const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Employee Schema
const EmployeeSchema = new Schema({
  employeeId: { type: Number, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userRole: { type: String, required: true },
  skills: { type: Array, required: true },
  designation: { type: String, required: true },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = { Employee };
