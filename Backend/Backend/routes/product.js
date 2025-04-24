const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST: Add a new product
router.post('/', async (req, res) => {
  try {
    const { category, name, price, quantity } = req.body;

    // Validate fields
    if (!category || !name || !price || !quantity) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create new product
    const product = new Product({ category, name, price, quantity });
    await product.save();

    res.status(201).json({ message: 'Product added successfully!', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.', error });
  }
});

module.exports = router;
