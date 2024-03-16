const router = require('express').Router();
const mongoose = require('mongoose');
const Student = require('../models/Student.model');

router.post('/students', async (req, res, next) => {
  const { name, age, address, degree, experience, userId } = req.body;

  try {
    const newStudent = await Student.create({
      name,
      age,
      address,
      degree,
      experience,
      user: userId,
    });
    console.log('New student', newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    console.log('An error occurred creating the student', error);
    next(error);
  }
});

router.get('/students', async (req, res, next) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.log('An error occurred getting all students', error);
    next(error);
  }
});

router.get('/students/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'No student found' });
    }
    res.json(student);
  } catch (error) {
    console.log('An error occurred getting the student', error);
    next(error);
  }
});

router.put('/students/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, age, address, degree, experience } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        age,
        address,
        degree,
        experience,
      },
      {
        new: true,
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    console.log('An error occurred updating the student', error);
    next(error);
  }
});

router.delete('/students/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    await Student.findByIdAndDelete(id);

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.log('An error occurred deleting the student', error);
    next(error);
  }
});

module.exports = router;
