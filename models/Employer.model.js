// models/Employer.js
const { Schema, model } = require('mongoose');

const employerSchema = new Schema({
  name: String,
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  tripAdvisorRanking: { type: Number },
  restaurantTypes: [{ type: String }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Employer = model('Employer', employerSchema);

module.exports = Employer;
