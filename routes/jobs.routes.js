const router = require('express').Router();
const Job = require('../models/Job.model');
const mongoose = require('mongoose');
const moment = require('moment');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Create a new job
// Backend Changes
router.post('/jobs', isAuthenticated, async (req, res, next) => {
  const {
    companyName,
    address,
    fromDate,
    toDate,
    shift,
    paymentPerHour,
    description,
  } = req.body;

  try {
    // Convert dates to ISO 8601 format
    const fromDateISO = new Date(fromDate).toISOString();
    const toDateISO = new Date(toDate).toISOString();

    const newJob = await Job.create({
      companyName,
      address,
      date: { from: fromDateISO, to: toDateISO },
      shift,
      paymentPerHour,
      description,
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.log('An error occurred creating the job', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Gets all jobs
router.get('/jobs', async (req, res, next) => {
  try {
    const allJobs = await Job.find();
    res.json(allJobs);
  } catch (error) {
    console.log('An error occurred getting all jobs', error);
    next(error);
  }
});

// Gets all jobs
router.get('/my-jobs/:companyName', isAuthenticated, async (req, res, next) => {
  const { companyName } = req.params;
  try {
    const myJobs = await Job.find({ companyName });
    res.json(myJobs);
  } catch (error) {
    console.log('An error occurred getting my jobs', error);
    next(error);
  }
});

// Gets job by id
router.get('/jobs/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'No job found' });
    }
    res.json(job);
  } catch (error) {
    console.log('An error occurred getting the job', error);
    next(error);
  }
});

// Update job by id
router.put('/jobs/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const {
    companyName,
    address,
    date: { from, to },
    shift,
    paymentPerHour,
    description,
  } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    const fromDate = moment(from).toDate();
    const toDate = moment(to).toDate();

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        companyName,
        address,
        date: { from: fromDate, to: toDate },
        shift,
        paymentPerHour,
        description,
      },
      {
        new: true,
      }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(updatedJob);
  } catch (error) {
    console.log('An error occurred updating the job', error);
    next(error);
  }
});

// Delete job by id
router.delete('/jobs/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    await Job.findByIdAndDelete(id);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.log('An error occurred deleting the job', error);
    next(error);
  }
});

module.exports = router;
