const File = require("../models/File");

//localfileupload -> handler
exports.localFileUpload = async(req , res) =>{
    try {
        //fetch file
        const file = req.files.file;
        console.log("File found -> ",file);

    //create path where file need to be stored
        let path = __dirname +"/files/" + Date.now() +"." + `${file.name.split(".")[1]}` ;
        console.log("Path ->" ,path)
         //add path to move function
        file.mv(path ,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"local File uploaded successfully"
        });
    } catch (error) {
        console.log(error)
    }
}