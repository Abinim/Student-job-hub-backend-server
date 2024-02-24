const express = require('express');
const router = express.Router();

// Import student controller
const studentController = require('../controllers/studentController');

// Define routes
router.post('/students/signup', studentController.signup);
router.put('/students/:id', studentController.updateProfile);
router.post('/students/:id/jobs/:jobId/apply', studentController.applyForJob);
// Add more routes as needed

module.exports = router;
