const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  date: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  shift: { type: String, required: true },
  paymentPerHour: { type: Number, required: true },
  description: { type: String },
  applicants: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

const Job = model('Job', jobSchema);

module.exports = Job;
