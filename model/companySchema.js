const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Employee Schema
const CompanySchema = new Schema({
  companyId: { type: Number, required: true, unique: true },
  fullName: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = { Company };
