const Tag = require("../models/Tag")
const Post = require("../models/Post")
const mongoose  = require("mongoose")
//

// have to create or reuse tags, and return their id

const processTags = async(tags=[])=>{
    const tagIds = [];// we can have multiple tags so we have to use aaray, 
    // we returning ids bcz so for post will be easy to refer , if we give name then for design it will not be good

    for (let tagName of tags){
        const normalized = tagName.toLowerCase().trim();

        let tag = await Tag.findOne({name:normalized});

        if(!tag){
            tag = await Tag.create({name:normalized,usageCount:1})
        }else{
            tag.usageCount+=1;
            await tag.save();
        }
        tagIds.push((tag._id))
    }
    return tagIds;

}

 const getPostByTag =async(req,res)=>{
    try {
        const {tagName} = req.params;
        const tag = await Tag.findOne({name:tagName.toLowerCase()});

        if(!tag){
            return res.status(400).json({message:"Tag not Found"});
        }

        const posts = await Post.find({
            tags:tag._id,
            isActive:true,
            status:"published"
        })
        .populate("auhtor","name email")
        .populate("tags","name")
        .sort({createdAt:-1})

        res.json({
            tag:tag.name,
            count:posts.length,
            posts
        })
    } catch (error) {
        console.error("post by tags error:",error);
        return res.status(500).json({message:"Internal Server Errror"})
    }
 }

 const getTrendingTags = async(req,res)=>{
    try {
        const tags = await Tag.find()
        .sort({usageCount:-1})// -1 mean desceding order
        .limit(10)

        res.json({tags})
    } catch (error) {
         console.error("trending post by tags error:",error);
        return res.status(500).json({message:"Internal Server Errror"})
    }
 }

 module.exports = {
    processTags,
    getPostByTag,
    getTrendingTags
 }