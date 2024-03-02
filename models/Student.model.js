// models/Student.js

const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String },
  degree: { type: String },
  experience: { type: String },
});

const Student = model('Student', studentSchema);

module.exports = Student;
