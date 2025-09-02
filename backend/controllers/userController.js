const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');

// Create a new user with a hashed password
router.post('/users', async (req, res) => {
  try {
    // Extract the user data, including the password
    const { username, password, ...restOfBody } = req.body;

    // Check if a password was provided
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object with the hashed password
    const user = new User({
      username,
      password: hashedPassword,
      ...restOfBody
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    // Return a more specific error message in case of validation failures
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
