const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { validateItem } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

// Protect all medication routes
router.use('/api/medications', authenticateToken);

// Get all items
router.get('/items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new item
router.post('/items', validateItem, async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await db.query(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get item by ID
router.get('/items/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update item
router.put('/items/:id', validateItem, async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await db.query(
      'UPDATE items SET name = ?, description = ? WHERE id = ?',
      [name, description, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ id: req.params.id, name, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item
router.delete('/items/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products with category
router.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all medications with category
router.get('/medications', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.*, c.name as category_name 
      FROM medications m 
      LEFT JOIN categories c ON m.category_id = c.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get medication by ID
router.get('api/medications/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.*, c.name as category_name 
      FROM medications m 
      LEFT JOIN categories c ON m.category_id = c.id 
      WHERE m.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new medication
router.post('api/medications', async (req, res) => {
  try {
    const { name, description, category_id, price, stock, image_url } = req.body;
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
      image_url 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update medication
router.put('/medications/:id', async (req, res) => {
  try {
    const { name, description, category_id, price, stock, image_url } = req.body;
    const [result] = await db.query(
      'UPDATE medications SET name = ?, description = ?, category_id = ?, price = ?, stock = ?, image_url = ? WHERE id = ?',
      [name, description, category_id, price, stock, image_url, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    res.json({ 
      id: req.params.id, 
      name, 
      description, 
      category_id, 
      price, 
      stock, 
      image_url 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete medication
router.delete('api/medications/:id', async (req, res) => {
  console.log(`Attempting to delete medication with ID: ${req.params.id}`);
  try {
    const [result] = await db.query('DELETE FROM medications WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting medication:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 