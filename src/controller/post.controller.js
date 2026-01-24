const Post = require("../models/Post");

const createPost = async(req,res)=>{
    try {
        const {title, content, status} = req.body;

        if(!title || !content){
            return res.status(400).json({messgae:"Title and Content required"})
        }

        const post  = await Post.create({
            title,
            content,
            author:req.user._id,// this id will be from token verifytoken
            status:status ||"draft"
        });
        return res.status(201).json({
            message:"Post Created Succesfuly",
            post
        })
    } catch (error) {
        console.log("create post error",error.message);
        return res.status(500).json( {message:"Server Error"})
        
    }
}

const getAllPosts = async (req,res)=>{
    try {
        const posts = await Post.find({
            isActive:true,
            status:"published"
        })
        .populate("author","name email")
        .sort({createdAt:-1});

        return res.json({posts})
    } catch (error) {
        return res.status(500).json({message:"server Error"});
    }
};

const getPostById = async(req,res)=>{
    try{
        const post = await Post.findOne({
        _id:req.params.id,
        isActive:true,
        status:"published"
    }).populate("author","name email");

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    return res.jsn({post})
}catch(error){
    return res.status(500).json({message:"server Error"});
}
}

const updatePost = async(req,res)=>{
    try {
        const {title, content, status} = req.body;
        const post = req.post//from checkownership middleware

        if(title) post.title = title;
        if(content) post.content =content;
        if(status) post.status = status;

        await post.save();
        return res.json({
            message:"Post updated succesfully",
            post
        });
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
};

const deletePost = async(req,res)=>{
    try {
        const post = req.post;

        //soft delete
        post.isActive = false;
        post.deletedAt = new Date();
        post.deletedBy = req.user._id;//

        await post.save();
        return res.json({
            message:"Post updated succesfully"})
    } catch (error) {
         return res.status(500).json({message:"Server Error"})
    }
}
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}