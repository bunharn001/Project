const express = require('express');
require('dotenv').config();

// express app
const app = express();

// involve next to go to app.get
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

// listen for requests
app.listen(process.env.PORT,() => {
    console.log("listening on port",process.env.PORT);
})