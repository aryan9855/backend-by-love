const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req,res,next)=>{
    try {
        //extract token
        const token = req.body.token ;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                sucess: false,
                message: "Token is invalid"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token"
        })
    }
}

exports.isStudent = (req,res,next)=>{
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected toute for Students"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "User Role is not matching"
        })
    }
    next();
}


exports.isAdmin = (req,res,next)=>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                sucess: false,
                message: "This is a protected toute for Admin"
            })
        }
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            message: "User Role is not matching"
        })
    }
    next();
}