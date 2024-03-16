const router = require('express').Router();
const Employer = require('../models/Employer.model');
const mongoose = require('mongoose');

// Created a new employer
router.post('/employers', async (req, res, next) => {
  const {
    name,
    companyName,
    companyAddress,
    tripAdvisorRanking,
    restaurantTypes,
    userId,
  } = req.body;

  try {
    const newEmployer = await Employer.create({
      name,
      companyName,
      companyAddress,
      tripAdvisorRanking,
      restaurantTypes,
      user: userId,
    });

    console.log('New employer', newEmployer);
    res.status(201).json(newEmployer);
  } catch (error) {
    console.log('An error occurred creating the employer', error);
    next(error);
  }
});

// Gets all employers
router.get('/employers', async (req, res, next) => {
  try {
    const allEmployers = await Employer.find();

    res.json(allEmployers);
  } catch (error) {
    console.log('An error occurred getting all employers', error);
    next(error);
  }
});

// Gets employer by id
router.get('/employers/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    const employer = await Employer.findById(id);

    if (!employer) {
      return res.status(404).json({ message: 'No employer found' });
    }

    res.json(employer);
  } catch (error) {
    console.log('An error occurred getting the employer', error);
    next(error);
  }
});

// Update employer by id
router.put('/employers/:id', async (req, res, next) => {
  const { id } = req.params;
  const { companyName, companyAddress, tripAdvisorRanking, restaurantTypes } =
    req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    const updatedEmployer = await Employer.findByIdAndUpdate(
      id,
      {
        companyName,
        companyAddress,
        tripAdvisorRanking,
        restaurantTypes,
      },
      {
        new: true,
      }
    );

    if (!updatedEmployer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    res.json(updatedEmployer);
  } catch (error) {
    console.log('An error occurred updating the employer', error);
    next(error);
  }
});

// delete employer by id
router.delete('/employers/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    await Employer.findByIdAndDelete(id);

    res.json({ message: 'Employer deleted successfully' });
  } catch (error) {
    console.log('An error occurred deleting the employer', error);
    next(error);
  }
});

module.exports = router;
