const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middlewares/auth.middlesware");
const{
    clapPost,
    getPostClaps
} = require("../controller/clap.controller")

/**
 * @swagger
 * tags:
 *   name: Claps
 *   description: Medium-style clap system for posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Clap:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65ad1234f1a2b3c4d5e67890
 *         post:
 *           type: string
 *           example: 65ab12f8d9c1e2a4b1c9e321
 *         user:
 *           type: string
 *           example: 65aa98f2d9c1e2a4b1c9e999
 *         count:
 *           type: number
 *           example: 12
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/claps/{postId}:
 *   post:
 *     summary: Clap for a post (Medium-style)
 *     tags: [Claps]
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
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Clap registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clap'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.post("/:postId", verifyToken, clapPost);

/**
 * @swagger
 * /api/claps/{postId}:
 *   get:
 *     summary: Get total claps for a post
 *     tags: [Claps]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Total claps count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   example: 65ab12f8d9c1e2a4b1c9e321
 *                 totalClaps:
 *                   type: number
 *                   example: 128
 *       400:
 *         description: Invalid post ID
 */
router.get("/:postId", getPostClaps);

module.exports = router;