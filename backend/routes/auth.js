const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const generateToken = require('../utils/token');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Validate input
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
      [full_name, email, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertId, email },
      process.env.JWT_SECRET || 'your-super-secret-key-here',
      { expiresIn: '24h' }
    );

    // Return success response with token and user data
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertId,
        full_name,
        email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Registration failed', 
      details: error.message 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received login request:', { email });

    // Validate input
    if (!email || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ 
        success: false,
        error: 'Email and password are required' 
      });
    }

    // Get user
    const [users] = await db.query(
      'SELECT id, full_name, email, password_hash FROM users WHERE email = ?',
      [email]
    );

    console.log('Database query completed', { userFound: users.length > 0 });

    if (users.length === 0) {
      console.log('User not found:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    const user = users[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    console.log('Password validation:', { valid: validPassword });

    if (!validPassword) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    console.log('Login successful for:', email);

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;