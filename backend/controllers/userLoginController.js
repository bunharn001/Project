const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
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
    
    // Create a simple JWT token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // If both email and password are correct, login is successful
    res.status(200).json({ message: 'Login successful!', token, user: { name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login
};
