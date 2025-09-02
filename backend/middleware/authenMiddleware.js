const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes by verifying a JWT token.
 * This function will check for an 'Authorization' header,
 * extract the token, and verify it to ensure the user is authenticated.
 */
const protect = async (req, res, next) => {
  let token;

  // 1) Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2) Get the token from the header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3) Verify the token using your JWT secret.
      // NOTE: This will fail if process.env.JWT_SECRET is not set.
      // You must create a .env file and set JWT_SECRET=<your_secret_key>
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4) Find the user associated with the token and attach it to the request object
      //    We exclude the password for security
      req.user = await User.findById(decoded.id).select('-password');

      // 5) If a user is found, pass control to the next middleware or route handler
      next();
    } catch (error) {
      // If token verification fails (e.g., expired, malformed, or invalid secret),
      // send a 401 Unauthorized response
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the request headers, send a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
