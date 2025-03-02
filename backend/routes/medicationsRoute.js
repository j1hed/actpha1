const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Allow adding medications without authentication
router.post('/', async (req, res) => {
  const { name, description, category_id, price, stock, image_url } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO medications (name, description, category_id, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, category_id, price, stock, image_url]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      description,
      category_id,
      price,
      stock,
      image_url,
    });
  } catch (error) {
    console.error('Error adding medication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protect all other medication routes with authentication
router.use(authenticateToken);

// Get medications from the database
router.get('/', async (req, res) => {
  console.log('Received request for medications');
  try {
    const [rows] = await db.query('SELECT * FROM medications');
    console.log('Fetched medications:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a medication
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, price, stock, image_url } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE medications SET name = ?, description = ?, category_id = ?, price = ?, stock = ?, image_url = ? WHERE id = ?',
      [name, description, category_id, price, stock, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.json({ id, name, description, category_id, price, stock, image_url });
  } catch (error) {
    console.error('Error updating medication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a medication
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM medications WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.status(204).send(); // No content to send back for a successful delete
  } catch (error) {
    console.error('Error deleting medication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;