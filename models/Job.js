const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  date: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  paymentPerHour: { type: Number, required: true },
  description: { type: String },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
