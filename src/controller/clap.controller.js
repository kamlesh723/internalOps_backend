const mongoose = require("mongoose")
const Clap = require("../models/Clap");
const Post  = require("../models/Post")

const MAX_CLAPS = 50;

const clapPost = async(req,res)=>{
    try {
        const {postId} = req.params;
        const{ count =1} =req.body;

        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.status(400).json({message:"Invalid Post ID"})
        }
        if(count<1 || count>MAX_CLAPS){
            return res.status(400).json({message:"Invalid clap count"})
        }
        const post = await Post.findOne({
            _id:postId,
            isActive:true,
            status:"published"
        });

        if(!post){
            return res.status(404).json({message:"Post not found"})
        }

        const clap = await Clap.findOneAndUpdate({
            post:postId,
            user:req.user._id
        },{
            $inc:{count},
            $setOnInsert:{post:postId,user:req.user._id}
        },
        {new:true,upsert:true }
    );
    if(clap.count>MAX_CLAPS){
        clap.count=MAX_CLAPS;
        await clap.save();
    }

    res.json({
        message:"Clapped succesfully",
        clap
    })


    } catch (error) {
        console.error("clap post error:",error);
        return res.status(500).json({message:"Server Error"})
    }
}

const getPostClaps = async(req,res)=>{
     try {
        const {postId} = req.body;

        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.status(400).json({message:"Invalid Post ID"})
        }

        const totalClaps = await Clap.aggregate([
            {$match:{post:new mongoose.Types.ObjectId(postId)}},
            {$group:{_id:null, total:{$sum:"$count"}}}
        ]);

        res.json({
            postId,
            totalClaps:totalClaps[0]?.total || 0
        });

    } catch (error) {
        console.error("clap get error:",error);
        return res.status(500).json({message:"Server Error"})
    }
}

module.exports = {
    clapPost,
    getPostClaps
}