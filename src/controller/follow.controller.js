const mongoose = require("mongoose");
const Follow = require("../models/Follow");
const User = require("../models/User")

const followUser = async(req,res)=>{
    try {
        const {userId} = req.params;

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({message:"Invalid User id"})
        }
        if(userId = req.user._id.toString()){
            return res.status(400).json({message:"you cannot follow yourself"})
        }

        const userExist = await User.findById(userId);

        if(!userExist || !userExist.isActive){
            return res.status(404).json({message:"user not found"})
        }

        await Follow.create({
            follower:req.user._id,
            following:userId
        })

        res.status(201).json({message:"User Followed"});

    } catch (error) {
        console.error("follow error:",error);
        if(error.code ===11000){
            return res.status(400).json({message:"Already follwong User"})
        }
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const unfollowUser = async(req,res)=>{
    try {
        const {userId} = req.params;

        const result = await Follow.findOneAndDelete({
            follower:req.user._id,
            following:userId
        })
        if(!result){
            return res.status(404).json({message:"you are not follwing this user"})
        }
        res.json({message:"User Unfollowed"})

    } catch (error) {
        console.error("unfollow error:",error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const getFollowers = async(req,res)=>{
    try {
        const followers = await Follow.find({following:req.params.userId})
        .populate("follower","name email")
        .sort({createdAt:-1})

        res.json({
            count:followers.length,
            followers
        })
    } catch (error) {
        console.error("get follower error:",error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const getFollowing = async(req,res)=>{
    try {
         const following = await Follow.find({follower:req.params.userId})
        .populate("following","name email")
        .sort({createdAt:-1})

        res.json({
            count:following.length,
            following
        })
    } catch (error) {
        console.error("get followin error:",error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
}