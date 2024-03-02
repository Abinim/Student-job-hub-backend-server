// models/Employer.js
const { Schema, model } = require('mongoose');

const employerSchema = new Schema({
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  tripAdvisorRanking: { type: Number },
  restaurantTypes: [{ type: String }],
});

const Employer = model('Employer', employerSchema);

module.exports = Employer;
