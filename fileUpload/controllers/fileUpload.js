const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

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

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file , folder,quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto"
    return await  cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.imageUpload = async (req, res)=>{
    try {
        //data fetch
        const {name , tags , email,quality = 80} = req.body;
        console.log(name , tags , email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type : " ,fileType)

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File formate not supported'
            })
        }


        //file formate suppperted hai
        console.log("temp file path" ,file.tempFilePath)
        const response = await uploadFileToCloudinary(file , "fileUpload",quality);
        console.log(response)

        //db me entry save
        const fileData = await File.create({
            name ,
            tags ,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:'Imgae successfully uploaded'
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

exports.videoUpload = async ( req, res) =>{
    try {
        const {name , tags , email} = req.body;
        console.log(name , tags , email);
        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mov", "avi", "mkv"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type : " ,fileType)

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File formate not supported'
            })
        }

        console.log("temp file path" ,file.tempFilePath)
        const response = await uploadFileToCloudinary(file , "fileUpload");

        console.log(response);

         //db me entry save
         const fileData = await File.create({
            name ,
            tags ,
            email,
            videoUrl: response.secure_url
        })

        res.json({
            success:true,
            videoUrl: response.secure_url,
            message:'Video successfully uploaded'
        })


    } catch (error) {
        console.error(error);
        res.status(400).json({

            success:false,
            message:'Something went wrong'
        })
    }
}


exports.imageSizeReducer = async (req ,res) =>{
    
     try {
         //data fetch
         const {name , tags , email} = req.body;
         console.log(name , tags , email);
 
         const file = req.files.imageFile;
         console.log(file);
 
         //validation
         const supportedTypes = ["jpg","jpeg","png"];
         const fileType = file.name.split('.')[1].toLowerCase();
         console.log("File Type : " ,fileType)
        
         //upper limit the size of file
         if(!isFileTypeSupported(fileType,supportedTypes)){
             return res.status(400).json({
                 success:false,
                 message:'File formate not supported'
             })
         }
 
 
         //file formate suppperted hai
         console.log("temp file path" ,file.tempFilePath)
         const response = await uploadFileToCloudinary(file , "fileUpload",30);
         console.log(response)
 
         //db me entry save
         const fileData = await File.create({
             name ,
             tags ,
             email,
             imageUrl: response.secure_url
         })
 
         res.json({
             success:true,
             imageUrl: response.secure_url,
             message:'Imgae successfully uploaded'
         })       
    } catch (error) {
       console.log(error);
       res.status(400).json({

        success:false,
        message:'Something went wrong'
    })
    }
}