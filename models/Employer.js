// models/Employer.js
const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  tripAdvisorRanking: { type: Number },
  restaurantTypes: [{ type: String }],
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
