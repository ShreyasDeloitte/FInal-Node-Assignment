const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Employee Schema
const CompanySchema = new Schema({
  companyName: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userRole: { type: String, required: true },
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = { Company };
