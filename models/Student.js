// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String },
  degree: { type: String },
  experience: { type: String },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
