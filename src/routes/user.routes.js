const express = require("express");
const router = express.Router();
const {verifyToken, requireRole}  = require("../middlewares/auth.middlesware");
const{
    getAllUsers,
    updateUserRole,
    softDeleteUser
} = require("../controller/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Admin user management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 65ab12f8d9c1e2a4b1c9e321
 *         name:
 *           type: string
 *           example: Kamlesh Yadav
 *         email:
 *           type: string
 *           example: user@example.com
 *         role:
 *           type: string
 *           enum: [user, moderator, admin]
 *         isDeleted:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.get("/", verifyToken, requireRole(["admin"]), getAllUsers);

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     summary: Update user role (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, moderator, admin]
 *                 example: moderator
 *     
 */
router.patch("/:id/role", verifyToken, requireRole(["admin"]), updateUserRole);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Soft delete a user (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     
 */
router.delete("/:id", verifyToken, requireRole(["admin"]), softDeleteUser);

module.exports = router;