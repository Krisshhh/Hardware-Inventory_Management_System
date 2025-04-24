const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  rating: { type: Number, default: 4.3 },
  condition: { type: String, default: 'working' },
  location: { type: String, default: 'Ahmedabad' },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
