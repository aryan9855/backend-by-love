const express = require('express');
const app = express();

require("dotenv").config();

//port
const PORT = process.env.PORT || 4000;

//middleware to parse json body
app.use(express.json());

//import routes
const todoRoutes = require('./routes/todos');

app.use('/api/v1', todoRoutes);

//start the server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

//connect to the database
const dbConnect = require('./config/database');
dbConnect();

//default route
app.get('/',(req,res)=>{
    res.send("hello world ");
});