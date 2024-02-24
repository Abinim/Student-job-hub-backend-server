const express = require('express');
const router = express.Router();

// Import job controller
const jobController = require('../controllers/jobController');

// Define routes
router.post('/jobs', jobController.postJob);
router.get('/jobs', jobController.getAllJobs);
router.get('/jobs/:id', jobController.getJobById);
// Add more routes as needed

module.exports = router;
