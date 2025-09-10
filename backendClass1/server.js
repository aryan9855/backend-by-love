//server Instantiate
const express = require('express');
const app = express();

//active the server
app.listen(3000,()=>{
    console.log("server started at port no. 3000")
});
// Routes
app.get('/',(request,responce)=>{
    responce.send("hello");
})

app.post('/api.car',(request,responce)=>{
    const {name , brand } = request.body;
    console.log(name);
    console.log(brand);
    responce.send('car submitted');
})