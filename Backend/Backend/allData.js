// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product'); // Import your Product model (you'll create this in the next step)

const app = express();
const port = 7543;

app.use(cors()); // Enable CORS for your frontend to access the backend
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB (update with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/SHI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

// Define your routes
app.get('/api/auth/products', async (req, res) => {
    try {
      const products = await Product.find();
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found for the given category and location' });
      }
  
      res.json(products); // Send products as JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});