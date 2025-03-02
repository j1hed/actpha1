const validateMedication = (req, res, next) => {
  const { name, price, stock } = req.body;
  
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  if (name.length > 255) {
    return res.status(400).json({ error: 'Name must be less than 255 characters' });
  }

  if (price === undefined || price < 0) {
    return res.status(400).json({ error: 'Valid price is required' });
  }

  if (stock === undefined || stock < 0) {
    return res.status(400).json({ error: 'Valid stock quantity is required' });
  }
  
  next();
};

module.exports = {
  validateMedication
}; 