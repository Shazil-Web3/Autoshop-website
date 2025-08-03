const Part = require('../models/Part');

const partController = {
  getAllParts: async (req, res) => {
    try {
      const parts = await Part.find();
      res.json(parts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getPartById: async (req, res) => {
    try {
      const part = await Part.findById(req.params.id);
      if (!part) {
        return res.status(404).json({ message: 'Part not found' });
      }
      res.json(part);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  createPart: async (req, res) => {
    try {
      const part = await Part.create(req.body);
      res.status(201).json(part);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  updatePart: async (req, res) => {
    try {
      const part = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!part) {
        return res.status(404).json({ message: 'Part not found' });
      }
      res.json(part);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  deletePart: async (req, res) => {
    try {
      const part = await Part.findByIdAndDelete(req.params.id);
      if (!part) {
        return res.status(404).json({ message: 'Part not found' });
      }
      res.json({ message: 'Part deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = partController;