const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  images: [String],
  description: String,
  compatibleVehicles: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Part', partSchema); 