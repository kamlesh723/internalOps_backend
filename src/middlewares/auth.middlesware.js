const jwt =require("jsonwebtoken");
const User = require("../models/User")

const verifyToken = async(req,res, next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:"No token Provided"})
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if(!user || !user.isActive){
            return res.status(401).json({message:"unAutorized"})
        }

        req.user = user;
        next();

    }catch(error){
        return res.status(401).json({message:"Inavlid or Expired Token"})
    }
};

const requireRole = (roles = [])=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"forbidden"})
        }
        next();
    }
}

module.exports = {
    verifyToken,
    requireRole
};