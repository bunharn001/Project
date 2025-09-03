const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Controllers
const userLoginController = require('./controllers/userLoginController');
const userController = require('./controllers/userController');
const menuItemController = require('./controllers/menuItemController');

// Import Routes
const userLoginRoutes = require('./routes/userLoginRoutes');
const userRoutes = require('./routes/userRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Create express app
const app = express();

// middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// A simple middleware for logging requests
app.use((req, res, next) => {
  console.log("Middleware check");
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/login', userLoginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menuitems', menuItemRoutes);

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // listen for requests only after DB connection
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
