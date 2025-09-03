const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authenMiddleware');
const userController = require('../controllers/userController');

// Create a new user (This is a POST request, for registration)
router.post('/', userController.registerUser);

// Get all users (This is a GET request)
router.get('/', userController.getAllUsers);

// Get a user by ID (This is a GET request)
router.get('/:id', userController.getUserById);

// Update a user by ID (This is a PUT request, and a protected route)
router.put('/:id', protect, userController.updateUser);

// Delete a user by ID (This is a DELETE request, and a protected route)
router.delete('/:id', protect, userController.deleteUser);

// Get authenticated user info (This is a GET request, and a protected route)
// The `protect` middleware is used here to verify the JWT token before proceeding to the controller.
router.get('/isAuthenticated', protect, userController.getAuthenticatedUser);

module.exports = router;
