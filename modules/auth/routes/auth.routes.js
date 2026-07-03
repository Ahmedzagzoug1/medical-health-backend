const express = require('express');
const {login,register,refreshToken,logout} = require('../controllers/auth.controller');
const authValidation = require('../validator/auth.validator');
const {verifyToken}=require('../../../shared/middleware/verify_token');
const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and returns access and refresh tokens.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterRequest"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       400:
 *         description: Validation Error.
 *       409:
 *         description: Email or Mobile already exists.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/register', authValidation.validateRegister, register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login using Email or Mobile
 *     description: Authenticates a user and returns access & refresh tokens.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginRequest"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       400:
 *         description: Validation Error.
 *       401:
 *         description: Invalid email/mobile or password.
 */
router.post('/login', authValidation.validateLogin, login);
/**
 * @openapi
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     description: Generates a new Access Token and Refresh Token using the current Refresh Token.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer Refresh Token (Mobile Clients)
 *         required: false
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       - in: cookie
 *         name: refreshToken
 *         description: HttpOnly Refresh Token Cookie (Web Clients)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tokens rotated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Tokens rotated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOi...
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOi...
 *       401:
 *         description: Refresh token is missing.
 *       403:
 *         description: Invalid or expired refresh token.
 */
router.post('/refresh-token', refreshToken);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout User
 *     description: Revokes the current refresh token and logs the user out.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       401:
 *         description: Unauthorized.
 *       400:
 *         description: Bad Request.
 */
router.post('/logout', verifyToken, logout);
module.exports=router;
