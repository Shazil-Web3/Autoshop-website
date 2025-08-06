const mongoose = require('mongoose');

const productRequestSchema = new mongoose.Schema({
  // Request details
  requestType: {
    type: String,
    enum: ['vehicle', 'part'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'edited'],
    default: 'pending'
  },
  
  // Requester information
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requesterName: {
    type: String,
    required: true
  },
  requesterRole: {
    type: String,
    enum: ['dealer', 'agent'],
    required: true
  },
  
  // Product information
  productData: {
    // Common fields
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: String,
    images: [String],
    location: String,
    
    // Vehicle specific fields
    make: String,
    model: String,
    year: Number,
    mileage: Number,
    fuelType: String,
    transmission: String,
    color: String,
    engine: String,
    stockNo: String,
    totalPrice: String,
    drive: String,
    seats: String,
    doors: String,
    features: [String],
    condition: String,
    
    // Part specific fields
    category: String,
    brand: String,
    stock: Number,
    compatibleVehicles: [String],
    
    // Machinery specific fields
    capacity: String
  },
  
  // Admin actions
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  rejectionReason: String,
  adminNotes: String,
  
  // If approved, link to the actual product
  approvedProductId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'approvedProductModel'
  },
  approvedProductModel: {
    type: String,
    enum: ['Vehicle', 'Part']
  }
}, {
  timestamps: true
});

// Index for efficient queries
productRequestSchema.index({ status: 1, createdAt: -1 });
productRequestSchema.index({ requesterId: 1, status: 1 });

module.exports = mongoose.model('ProductRequest', productRequestSchema); 