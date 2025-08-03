const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Inquiry = require('../models/Inquiry');

const adminController = {
  getDashboardStats: async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalVehicles = await Vehicle.countDocuments();
      const totalInquiries = await Inquiry.countDocuments();
      
      res.json({
        totalUsers,
        totalVehicles,
        totalInquiries
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  updateUserStatus: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = adminController; 