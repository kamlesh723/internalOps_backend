const express = require("express");
const router = express.Router();

const {verifyToken, requireRole} = require("../middlewares/auth.middlesware");
const {checkPostOwnership} = require("../middlewares/checkOwnership");

const{
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require("../controller/post.controller");


// public routes
router.get("/",getAllPosts);
router.get("/:id", getPostById);

router.post("/", verifyToken,createPost);

router.put("/:id",verifyToken,checkPostOwnership,updatePost);
router.delete("/:id",verifyToken,checkPostOwnership, deletePost);

module.exports = router;