const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
}));
app.use(express.json());

// Database connection
const db = require('./config/database');

// Test database connection
db.query('SELECT 1')
  .then(() => console.log('Database connection successful'))
  .catch(err => console.error('Database connection failed:', err));

// Routes
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboardRoute'));

// Mock database (replace this with your actual database logic)
const medications = [
  { id: 1, name: 'Medication A', description: 'Description A', category: 'Category 1', price: 10.0, stock: 100, image: 'url_to_image' },
  { id: 2, name: 'Medication B', description: 'Description B', category: 'Category 2', price: 20.0, stock: 30, image: 'url_to_image' },
  // Add more medications as needed
];

// Assuming you have an authentication middleware
const authMiddleware = require('./middleware/auth');

// Allow access to medications without authentication
app.get('/api/medications', (req, res) => {
  res.json(medications);
});

// Protect other routes with authentication
app.use('/api/protected', authMiddleware, require('./routes/protectedRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('Token:', token);