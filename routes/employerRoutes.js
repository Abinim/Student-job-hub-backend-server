const express = require('express');
const router = express.Router();

// Import employer controller
const employerController = require('../controllers/employerController');

// Define routes
router.post('/employers/signup', employerController.signup);
router.put('/employers/:id', employerController.updateProfile);
router.post('/employers/:id/jobs', employerController.postJob);
// Add more routes as needed

module.exports = router;
