const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middlesware");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require("../controller/follow.controller");

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: User follow system
 */

/**
 * @swagger
 * /api/follow/{userId}:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: User followed
 *       400:
 *         description: Invalid request
 */
router.post("/:userId", verifyToken, followUser);

/**
 * @swagger
 * /api/follow/{userId}:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/:userId", verifyToken, unfollowUser);

/**
 * @swagger
 * /api/follow/{userId}/followers:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:userId/followers", getFollowers);

/**
 * @swagger
 * /api/follow/{userId}/following:
 *   get:
 *     summary: Get users followed by a user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:userId/following", getFollowing);

module.exports = router;

