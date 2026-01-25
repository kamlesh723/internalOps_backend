const User = require("../models/User");

const getAllUsers = async(req,res)=>{
    try {
        //admin should be able to see all the soft deleted user also so..
        const users = await User.find().select("-password")// this is like will get all user info but not password
        return res.json({users})
    } catch (error) {
        return res.status(500).json({message:"Server Error"});
    }
}

const updateUserRole = async(req,res)=>{
    try {
        const {id} = req.params;//will have to pass in url the id
        const {role} = req.body;

        if(!(["user","moderator","admin"])){
            return res.status(400).json({message:"Invalid Role. Must be: user, moderator, or admin"})
        }
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        // you yourself as whatver you are shouln't be able to change your role
        if(user._id.toString() === req.user._id.toString){
            return res.status(400).json({message:"you can't change your own Role"})
        }
        user.role = role;
        await user.save();

        return res.json({
            message:`User Role Updated to ${role}`,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    } catch (error) {
            console.log("update role Error:",error.message);
         return res.status(500).json({message:"Server Error"});
    }
}

const softDeleteUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
         if(user._id.toString() === req.user._id.toString){
            return res.status(400).json(
                {message:"you can not Delete yourself "})
        }

        user.isActive = false;
        user.deletedAt = new Date();
        await user.save();

        return res.json({message:"User Deleted Succesfully"})
    } catch (error) {
         return res.status(500).json({message:"Server Error"});
    }
}

module.exports = {
    getAllUsers,
    updateUserRole,
    softDeleteUser
}