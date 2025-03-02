const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { validateMedication } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');
const medicationsRoute = require('./medicationsRoute'); // Import the medications route

// Protect all medication routes
router.use('/api/medications', authenticateToken);
router.use('/api/dashboard', authenticateToken);

// Use the medications route
router.use('/api/medications', medicationsRoute); // This will handle all /api/medications requests

// Get medications from the database
router.get('/medications', async (req, res) => {
  console.log('Received request for medications');
  try {
    const [rows] = await db.query('SELECT * FROM medications');
    console.log('Fetched medications:', rows); // Log the fetched data
    res.json(rows);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... rest of your existing routes ...

module.exports = router; 