const { default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async(req,res)=>{
    try {
        const {content} =req.body;
        const {postId} = req.params;// we dont have to do for this error handling bcz if user don't send id then request won't be hit so... 

        if(!content){
            return res.status(400).json({message:"Comment Content Required"});
        }
        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.status(400).json({message:"Invalid Post ID"})
        }
        const post = await post.findOne({
            _id:postId,
            isActive:true,
            status:"published"
        });

        if(!post){
            return res.status(404).json({message:"Post not Found"});
        }

        const comment = await Comment.create({
            content:content.trim(),
            post:postId,
            auhtor:req.user._id
        })
        await comment.populate("author","name email");

        res.status(201).json({
            message:"Comment Added",
            comment
        });

    } catch (error) {
        console.error("Create comment error:",error);
        return res.status(500).json({message:"Server Error"})
    }
}
const getCommentByPost = async(req,res)=>{
     try {
         const {postId} = req.params;

        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.status(400).json({message:"Invalid Post ID"})
        }



        const comment = await Comment.find({
            post:postId,
            isActive:true
        })
        .populate("author","name email")
        .sort({createdAt:-1})
        .lean();//for read only data -faster

        res.json({
            count:comment.length,
            comment
        });
 
    } catch (error) {
        console.error("get comment error:",error);
        return res.status(500).json({message:"Server Error"})
    }
}
const deleteComment = async(req,res)=>{
     try {
        const {commentId} = req.params;

         if(!mongoose.Types.ObjectId.isValid(commentId)){
            return res.status(400).json({message:"Invalid Post ID"})
        }
        const comment = await Comment.findOne({
            _id:commentId,
            isActive:true
        });
        if(!comment){
            return res.status(404).json({message:"Comment not found"})
        }

        comment.isActive=false;
        comment.deletedAt=new Date();
        comment.deletedBy = req.user._id;
        await comment.save();

         res.json({
            message:"comment Deleted Succesfully"
        })
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
}

module.exports = {
    createComment,
    getCommentByPost,
    deleteComment
}