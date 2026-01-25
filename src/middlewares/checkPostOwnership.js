const Post = require("../models/Post.js")

const checkPostOwnership = async (req,res,next)=>{
    try{
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if(!post || !post.isActive){
            return res.status(404).json({message:"post not found"});
        }

        // admin or moderaotr can delete any post
        if(req.user.role==="admin" || req.user.role==="moderator"){
            req.post = post;
            return next();
        }
        // user can edit or delete only there posts
        if(post.author.toString()!== req.user._id.toString()){
            return res.status(403).json({message:"Not authorized to modify this post"})
        }
        req.post = post;
        next();
    }catch(error){
        return res.status(500).json({message:"Server Error"})
    }
};
module.exports = {checkPostOwnership}