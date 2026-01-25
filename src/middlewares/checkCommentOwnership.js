const Comment = require("../models/Comment");

const checkCommentOwnership = async(req,res)=>{
    const comment = await Comment.findById(req.params.id);

    if(!comment || !comment.isActive){
        return res.status(404).json({message:"Comment not found"})
    }

    if(
        comment.author.toString()!== req.user._id.toString() && !['admin','moderator'].includes(req.user.role)
    ){
        return res.status(403).json({message:"forbidden"})
    }
    req.comment = comment;
    next();
}

module.exports = {checkCommentOwnership}