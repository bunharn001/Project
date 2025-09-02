const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email
    const user = await User.findOne({ email });
    if (!user) {
      // User not found, so return an error
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Passwords do not match, return an error
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // If both email and password are correct, login is successful
    res.status(200).json({ message: 'Login successful!', user: { name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user (with password hashing)
router.post('/users', async (req, res) => {
  try {
    // Extract the user data, including the password
    const { password, ...restOfBody } = req.body;

    // Check if a password was provided
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Generate a salt and hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object with the hashed password
    const user = new User({
      password: hashedPassword,
      ...restOfBody
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude the password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude the password field
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
