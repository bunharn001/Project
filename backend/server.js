const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import the user controller
const userController = require('./controllers/userController');
const MenuItemController = require('./controllers/menuItemController');
const userLoginController = require('./controllers/userLoginController');



// express app
const app = express();

// middleware to parse JSON bodies
app.use(express.json());

// middleware
app.use((req,res,next)=>{
    console.log("Middleware check")
    console.log(req.path,req.method)
    next()
})

// routes
app.get('/',(req,res)=>{
    res.json({msg:"Welcome to the app"})
})

// Use the user routes
app.use('/', userController);
app.use('/', MenuItemController);
app.use('/', userLoginController);



// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // listen for requests only after DB connection
    app.listen(process.env.PORT,() => {
        console.log("listening on port",process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });