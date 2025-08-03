const Inquiry = require('../models/Inquiry');

const inquiryController = {
  getAllInquiries: async (req, res) => {
    try {
      const inquiries = await Inquiry.find();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getInquiryById: async (req, res) => {
    try {
      const inquiry = await Inquiry.findById(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  createInquiry: async (req, res) => {
    try {
      const inquiry = await Inquiry.create(req.body);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  updateInquiry: async (req, res) => {
    try {
      const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = inquiryController; 