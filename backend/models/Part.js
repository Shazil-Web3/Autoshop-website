const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: { type: String, required: true },
  refNo: { type: String, index: true, unique: true, sparse: true },
  category: { type: String },
  brand: { type: String },
  price: { type: Number },
  stock: { type: Number, default: 0 },
  images: [String],
  description: String,
  compatibleVehicles: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Part', partSchema); 