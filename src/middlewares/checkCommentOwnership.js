const Comment = require("../models/Comment");

const checkCommentOwnership = async (req, res, next) => {
  const { commentId } = req.params;

  const comment = await Comment.findOne({
    _id: commentId,
    isActive: true
  });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (
    comment.author.toString() !== req.user._id.toString() &&
    !["admin", "moderator"].includes(req.user.role)
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  req.comment = comment; 
  next();
};

module.exports = { checkCommentOwnership };
