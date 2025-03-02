const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dashboardRoute = require('./routes/dashboardRoute');
const authRoute = require('./routes/auth'); // Assuming you have an auth route
const apiRoute = require('./routes/api'); // Assuming you have an API route
const medicationsRoute = require('./routes/medicationsRoute'); // Import the medications route

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this if your frontend runs on a different port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const db = require('./config/database');

// Test database connection
db.query('SELECT 1')
  .then(() => console.log('Database connection successful'))
  .catch(err => console.error('Database connection failed:', err));

// Routes
app.use('/api', apiRoute);
app.use('/auth', authRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/medications', medicationsRoute); // Use the medications route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start the server
const startServer = async () => {
  try {
    // Test database connection before starting server
    await db.query('SELECT 1');
    console.log('Database connection successful');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Try these endpoints:');
      console.log(`- http://localhost:${PORT}/health`);
      console.log(`- http://localhost:${PORT}/api/dashboard`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
