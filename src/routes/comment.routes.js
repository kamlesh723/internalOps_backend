const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middlewares/auth.middlesware");
const {checkCommentOwnership} = require("../middlewares/checkCommentOwnership");

const {
    createComment,
    getCommentByPost,
    deleteComment
} = require("../controller/comment.controller");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management on posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65ac1234f1a2b3c4d5e67890
 *         content:
 *           type: string
 *           example: This is a great post!
 *         post:
 *           type: string
 *           example: 65ab12f8d9c1e2a4b1c9e321
 *         author:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *               example: Kamlesh Yadav
 *             email:
 *               type: string
 *               example: user@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/comments/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: This article helped me a lot!
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.post("/:postId", verifyToken, createComment);

/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: List of comments
 *       400:
 *         description: Invalid post ID
 */
router.get("/:postId", getCommentByPost);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment (owner, moderator, or admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Comment not found
 */
router.delete("/:commentId", verifyToken, checkCommentOwnership, deleteComment);

module.exports = router;