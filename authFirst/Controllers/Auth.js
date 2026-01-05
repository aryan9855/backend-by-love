const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // hash password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            });
        }

        // create user
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later"
        });
    }
};
 

exports.login = async(req ,res)=>{
    try {
        //data fetch
        const {email , password} = req.body;
        //validation
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }
        //check if user exists
        const user = await User.findOne({email});
        //if user does not exist
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }


        let payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        //verify password and generate a JWT token

        if(await bcrypt.compare(password, user.password)){

            let token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn: "2h"})
            const userData = user.toObject();
            userData.token = token; 
            delete userData.password; 
            const options = {
                expires: new Date(Date.now() +3*24*60*60*1000),
                httpOnly: true,

            }

            res.cookie("token",token ,options).status(200).json({
                success: true,
                token,
                message: "User logged in successfully",
                user:userData
            })

        }
        else{
            //if password is incorrect
            return res.status(403).json({
                success: false,
                message: "Invalid password"
            })
        }   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in logging in user"  
        })
    }
}