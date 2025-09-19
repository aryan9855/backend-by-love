const mongoose = require("mongoose")

require("dotenv").config()

const  connectWithDb = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("DB connectes succesfully"))
    .catch((error)=>{
        cconsole.log("DB facing connection issue")
        console.log(error)
        process.exit(1)
    })
}

module.exports = connectWithDb