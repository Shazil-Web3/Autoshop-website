const ProductRequest = require('../models/ProductRequest');
const Vehicle = require('../models/Vehicle');
const Part = require('../models/Part');
const User = require('../models/User');

const productRequestController = {
  // Create a new product request
  createRequest: async (req, res) => {
    try {
      const { requestType, productData } = req.body;
      const requesterId = req.user.id;
      
      // Get requester details
      const requester = await User.findById(requesterId);
      if (!requester) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Validate requester role
      if (!['dealer', 'agent'].includes(requester.role)) {
        return res.status(403).json({ message: 'Only dealers and agents can submit product requests' });
      }
      
      // Validate requester status
      if (requester.status !== 'approved') {
        return res.status(403).json({ message: 'Your account must be approved to submit product requests' });
      }
      
      const productRequest = new ProductRequest({
        requestType,
        requesterId,
        requesterName: `${requester.firstName} ${requester.lastName}`,
        requesterRole: requester.role,
        productData
      });
      
      await productRequest.save();
      
      res.status(201).json({
        message: 'Product request submitted successfully',
        request: productRequest
      });
    } catch (error) {
      console.error('Error creating product request:', error);
      res.status(500).json({ message: 'Error creating product request' });
    }
  },
  
  // Get all product requests (admin only)
  getAllRequests: async (req, res) => {
    try {
      const { status, requestType, page = 1, limit = 10 } = req.query;
      
      const filter = {};
      if (status) filter.status = status;
      if (requestType) filter.requestType = requestType;
      
      const skip = (page - 1) * limit;
      
      const requests = await ProductRequest.find(filter)
        .populate('requesterId', 'firstName lastName email phone')
        .populate('reviewedBy', 'firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      
      const total = await ProductRequest.countDocuments(filter);
      
      res.json({
        requests,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          totalItems: total
        }
      });
    } catch (error) {
      console.error('Error fetching product requests:', error);
      res.status(500).json({ message: 'Error fetching product requests' });
    }
  },
  
  // Get pending requests count (for dashboard)
  getPendingCount: async (req, res) => {
    try {
      const pendingCount = await ProductRequest.countDocuments({ status: 'pending' });
      res.json({ pendingCount });
    } catch (error) {
      console.error('Error fetching pending count:', error);
      res.status(500).json({ message: 'Error fetching pending count' });
    }
  },
  
  // Get request by ID
  getRequestById: async (req, res) => {
    try {
      const request = await ProductRequest.findById(req.params.id)
        .populate('requesterId', 'firstName lastName email phone companyName')
        .populate('reviewedBy', 'firstName lastName');
      
      if (!request) {
        return res.status(404).json({ message: 'Product request not found' });
      }
      
      res.json(request);
    } catch (error) {
      console.error('Error fetching product request:', error);
      res.status(500).json({ message: 'Error fetching product request' });
    }
  },
  
  // Approve a product request
  approveRequest: async (req, res) => {
    try {
      const { id } = req.params;
      const { adminNotes } = req.body;
      const adminId = req.user.id;
      
      const request = await ProductRequest.findById(id);
      if (!request) {
        return res.status(404).json({ message: 'Product request not found' });
      }
      
      if (request.status !== 'pending') {
        return res.status(400).json({ message: 'Request has already been processed' });
      }
      
      // Create the actual product based on request type
      let approvedProduct;
      if (request.requestType === 'vehicle') {
        // Map request productData to Vehicle UI fields
        const vData = {
          ...request.productData,
          title: request.productData.title,
          price: request.productData.price,
          totalPrice: request.productData.totalPrice,
          image: Array.isArray(request.productData.images) && request.productData.images.length > 0
            ? request.productData.images[0]
            : request.productData.image,
          images: request.productData.images,
          stockNo: request.productData.stockNo,
          mileage: request.productData.mileage,
          year: String(request.productData.year || request.productData.yearText || ''),
          engine: request.productData.engine,
          engineCode: request.productData.engineCode,
          modelCode: request.productData.modelCode,
          transmission: request.productData.transmission,
          location: request.productData.location,
          color: request.productData.color,
          fuel: request.productData.fuel || request.productData.fuelType,
          drive: request.productData.drive,
          seats: request.productData.seats,
          doors: request.productData.doors,
          features: request.productData.features,
          condition: request.productData.condition,
          capacity: request.productData.capacity,
          category: request.productData.category, // must be one of the 4
          status: 'available',
          postedBy: request.requesterId,
          postedByRole: request.requesterRole,
          isApproved: true
        };
        approvedProduct = new Vehicle(vData);
      } else if (request.requestType === 'part') {
        approvedProduct = new Part(request.productData);
      }
      
      await approvedProduct.save();
      
      // Update the request
      request.status = 'approved';
      request.reviewedBy = adminId;
      request.reviewedAt = new Date();
      request.adminNotes = adminNotes;
      request.approvedProductId = approvedProduct._id;
      request.approvedProductModel = request.requestType === 'vehicle' ? 'Vehicle' : 'Part';
      
      await request.save();
      
      res.json({
        message: 'Product request approved successfully',
        request,
        approvedProduct
      });
    } catch (error) {
      console.error('Error approving product request:', error);
      res.status(500).json({ message: 'Error approving product request' });
    }
  },
  
  // Reject a product request
  rejectRequest: async (req, res) => {
    try {
      const { id } = req.params;
      const { rejectionReason, adminNotes } = req.body;
      const adminId = req.user.id;
      
      const request = await ProductRequest.findById(id);
      if (!request) {
        return res.status(404).json({ message: 'Product request not found' });
      }
      
      if (request.status !== 'pending') {
        return res.status(400).json({ message: 'Request has already been processed' });
      }
      
      request.status = 'rejected';
      request.reviewedBy = adminId;
      request.reviewedAt = new Date();
      request.rejectionReason = rejectionReason;
      request.adminNotes = adminNotes;
      
      await request.save();
      
      res.json({
        message: 'Product request rejected successfully',
        request
      });
    } catch (error) {
      console.error('Error rejecting product request:', error);
      res.status(500).json({ message: 'Error rejecting product request' });
    }
  },
  
  // Edit a product request (admin can modify and approve)
  editAndApproveRequest: async (req, res) => {
    try {
      const { id } = req.params;
      const { productData, adminNotes } = req.body;
      const adminId = req.user.id;
      
      const request = await ProductRequest.findById(id);
      if (!request) {
        return res.status(404).json({ message: 'Product request not found' });
      }
      
      if (request.status !== 'pending') {
        return res.status(400).json({ message: 'Request has already been processed' });
      }
      
      // Update product data with admin edits
      request.productData = { ...request.productData, ...productData };
      request.status = 'edited';
      request.reviewedBy = adminId;
      request.reviewedAt = new Date();
      request.adminNotes = adminNotes;
      
      await request.save();
      
      // Create the actual product with edited data
      let approvedProduct;
      if (request.requestType === 'vehicle') {
        const vData = {
          ...request.productData,
          title: request.productData.title,
          price: request.productData.price,
          totalPrice: request.productData.totalPrice,
          image: Array.isArray(request.productData.images) && request.productData.images.length > 0
            ? request.productData.images[0]
            : request.productData.image,
          images: request.productData.images,
          stockNo: request.productData.stockNo,
          mileage: request.productData.mileage,
          year: String(request.productData.year || request.productData.yearText || ''),
          engine: request.productData.engine,
          engineCode: request.productData.engineCode,
          modelCode: request.productData.modelCode,
          transmission: request.productData.transmission,
          location: request.productData.location,
          color: request.productData.color,
          fuel: request.productData.fuel || request.productData.fuelType,
          drive: request.productData.drive,
          seats: request.productData.seats,
          doors: request.productData.doors,
          features: request.productData.features,
          condition: request.productData.condition,
          capacity: request.productData.capacity,
          category: request.productData.category,
          status: 'available',
          postedBy: request.requesterId,
          postedByRole: request.requesterRole,
          isApproved: true
        };
        approvedProduct = new Vehicle(vData);
      } else if (request.requestType === 'part') {
        approvedProduct = new Part(request.productData);
      }
      
      await approvedProduct.save();
      
      // Update request to approved
      request.status = 'approved';
      request.approvedProductId = approvedProduct._id;
      request.approvedProductModel = request.requestType === 'vehicle' ? 'Vehicle' : 'Part';
      
      await request.save();
      
      res.json({
        message: 'Product request edited and approved successfully',
        request,
        approvedProduct
      });
    } catch (error) {
      console.error('Error editing product request:', error);
      res.status(500).json({ message: 'Error editing product request' });
    }
  },
  
  // Get requests by requester (for dealers/agents to see their requests)
  getMyRequests: async (req, res) => {
    try {
      const requesterId = req.user.id;
      const { status, page = 1, limit = 10 } = req.query;
      
      const filter = { requesterId };
      if (status) filter.status = status;
      
      const skip = (page - 1) * limit;
      
      const requests = await ProductRequest.find(filter)
        .populate('reviewedBy', 'firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      
      const total = await ProductRequest.countDocuments(filter);
      
      res.json({
        requests,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          totalItems: total
        }
      });
    } catch (error) {
      console.error('Error fetching my requests:', error);
      res.status(500).json({ message: 'Error fetching requests' });
    }
  }
};

module.exports = productRequestController; 