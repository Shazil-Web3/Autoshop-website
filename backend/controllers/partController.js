const Part = require('../models/Part');
const { uploadImage } = require('../utils/cloudinary');

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
      const payload = { ...req.body };
      if (payload.price) payload.price = Number(payload.price);
      if (payload.stock) payload.stock = Number(payload.stock);
      if (typeof payload.compatibleVehicles === 'string') {
        try { payload.compatibleVehicles = JSON.parse(payload.compatibleVehicles); } catch (_) { /* ignore */ }
      }

      const images = [];
      if (req.files && req.files.images && Array.isArray(req.files.images)) {
        const uploads = await Promise.all(
          req.files.images.map(f => uploadImage(f.buffer, { folder: 'autoshop/parts' }))
        );
        uploads.forEach(u => images.push(u.secure_url));
      }
      if (images.length > 0) {
        payload.images = images;
      }

      const part = await Part.create(payload);
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