const router = require('express').Router();
const Job = require('../models/Job.model');
const Student = require('../models/Student.model');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');

//
router.post('/jobs/apply/:jobId', isAuthenticated, async (req, res, next) => {
  const { jobId } = req.params;
  const { studentId } = req.body;
  try {
    const thisStudent = await Student.findOne({ user: studentId });
    const thisJob = await Job.findById(jobId);

    if (!thisJob.applicants.find(applicant => applicant === thisStudent._id)) {
      const job = await Job.findByIdAndUpdate(
        jobId,
        { $push: { applicants: thisStudent._id } },
        { new: true }
      );
      const student = await Student.findOneAndUpdate(
        { user: studentId },
        {
          $push: { appliedJobs: job._id },
        },
        { new: true }
      );
    }

    res.json('applied successfully');
  } catch (error) {
    console.error('Error applying for job:', error);
    next(error);
  }
});
//
router.post('/jobs/unapply/:jobId', isAuthenticated, async (req, res, next) => {
  const { jobId } = req.params;
  const { studentId } = req.body;
  try {
    const thisStudent = await Student.findOne({ user: studentId });
    const thisJob = await Job.findById(jobId);

    const job = await Job.findByIdAndUpdate(
      jobId,
      { $pull: { applicants: thisStudent._id } },
      { new: true }
    );
    const student = await Student.findOneAndUpdate(
      { user: studentId },
      {
        $pull: { appliedJobs: job._id },
      },
      { new: true }
    );

    res.json('applied successfully');
  } catch (error) {
    console.error('Error applying for job:', error);
    next(error);
  }
});

//
router.get(
  '/applied-jobs/:studentId',
  isAuthenticated,
  async (req, res, next) => {
    const { studentId } = req.params;

    try {
      const student = await Student.findOne({ user: studentId }).populate(
        'appliedJobs'
      );
      console.log('here', student);
      res.json(student.appliedJobs);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      next(error);
    }
  }
);

module.exports = router;
