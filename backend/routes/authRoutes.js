const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadSingle, handleUploadError } = require('../utils/fileUpload');

// Public routes
router.post('/register/user', authController.registerUser);
router.post('/register/agent', uploadSingle, handleUploadError, authController.registerAgent);
router.post('/register/dealer', uploadSingle, handleUploadError, authController.registerDealer);
router.post('/login', authController.login);

// Protected routes (require authentication)
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);

// Admin routes (require admin role)
router.get('/pending-applications', protect, admin, authController.getPendingApplications);
router.post('/approve-application', protect, admin, authController.approveApplication);
router.post('/reject-application', protect, admin, authController.rejectApplication);
router.get('/all-users', protect, admin, authController.getAllUsers);
router.post('/suspend-user', protect, admin, authController.suspendUser);
router.post('/activate-user', protect, admin, authController.activateUser);

module.exports = router; 