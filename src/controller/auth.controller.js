const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async(req,res)=>{
    try{
        const {name, email, password} = req.body;

        if(!name ||!email ||!password){
            return res.status(400).json({
                message:"All fields are reuired"
            })
        }
        const existingUser = await User.findOne({email})
            if(existingUser){
                return res.status(400).json({
                    Message:"User already Exists"
                })
            }
        
        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            name,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            message:"User registration succesfully"
        })
    }catch(error){
        console.log("Registraton Error:", error.message);
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

const login = async(req, res)=>{
    try{
        const { email, password} = req.body;

        if(!email ||!password){
            return res.status(400).json({
                message:"Email and Password fields are reuired"
            })
        }
        const user = await User.findOne({email, isActive: true});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign(
            {
            id:user._id, role:user.role
        },
        process.env.JWT_SECRET,{expiresIn:"1d"}
    );
    return res.json({token});

    }catch(error){
        console.log("login Error:",error.message);
        return res.status(500).json({
            messssage:"Server Error"
        })
    }
}

module.exports = {
    register,
    login
}