const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the controllers
const userController = require('./controllers/userController');
const MenuItemController = require('./controllers/menuItemController');
const userLoginController = require('./controllers/userLoginController');

// express app
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

// routes
app.get('/', (req, res) => {
  res.json({ msg: "Welcome to the app" });
});

// Use the dedicated login routes at a top level
app.use('/api', userLoginController);

// Use other routes with a clear API prefix
app.use('/api/users', userController);
app.use('/api/menuitems', MenuItemController);


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
