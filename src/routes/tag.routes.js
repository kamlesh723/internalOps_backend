const express = require("express");
const router = express.Router();

const {
    getPostByTag,
    getTrendingTags
} = require("../controller/Tag.controller")

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Tag browsing and analytics
 */

/**
 * @swagger
 * /api/tags/trending:
 *   get:
 *     summary: Get trending tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of trending tags
 */
router.get("/trending",getTrendingTags)

/**
 * @swagger
 * /api/tags/{tagName}:
 *   get:
 *     summary: Get posts by tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts under the tag
 *       404:
 *         description: Tag not found
 */
router.get("/:tagName",getPostByTag)

module.exports = router;