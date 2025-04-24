const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
});

// Add Product Route
router.post('/product', async (req, res) => {
  try {
    const { category, name, price, quantity } = req.body;

    // Validate input
    if (!category || !name || !price || !quantity) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (isNaN(price) || isNaN(quantity)) {
      return res.status(400).json({ message: 'Price and quantity must be valid numbers.' });
    }

    if (parseFloat(price) <= 0 || parseInt(quantity) <= 0) {
      return res.status(400).json({ message: 'Price and quantity must be greater than zero.' });
    }

    // Create new product
    const product = new Product({ category, name, price, quantity });
    await product.save();

    res.status(201).json({ message: 'Product added successfully.', product });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
});

module.exports = router;