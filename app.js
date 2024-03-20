require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

require('./config')(app);

const { isAuthenticated } = require('./middleware/jwt.middleware');

const jobsRoutes = require('./routes/jobs.routes');
app.use('/api', jobsRoutes);

const employersRoutes = require('./routes/employers.routes');
app.use('/api', isAuthenticated, employersRoutes);

const studentsRoutes = require('./routes/students.routes');
app.use('/api', isAuthenticated, studentsRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);
// Other route handlers and middleware can be defined here
require('./error-handling')(app);
module.exports = app;
