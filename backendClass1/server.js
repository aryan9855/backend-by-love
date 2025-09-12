//server Instantiate
const express = require('express');
const app = express();
// Parse JSON request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//active the server
app.listen(3000,()=>{
    console.log("server started at port no. 3000")
});
// Routes
app.get('/',(request,responce)=>{
    responce.send("hello");
})

app.post('/api/car',(request,responce)=>{
    const {name , brand } = request.body;
    console.log(name);
    console.log(brand);
    responce.send('car submitted');
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('connected to mongodb');
})
.catch((error)=>{
    console.log(error);
})
