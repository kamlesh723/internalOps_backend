const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middlewares/auth.middlesware");
const {checkCommentOwnership} = require("../middlewares/checkCommentOwnership");

const {
    createComment,
    getCommentByPost,
    deleteComment
} = require("../controller/comment.controller");

router.post("/:postId",verifyToken,createComment);

router.get("/:postId",getCommentByPost);

router.delete("/:commentId",verifyToken,checkCommentOwnership,deleteComment);

module.exports = router;