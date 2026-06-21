const express = require('express');
const {login,register,refreshToken,logout} = require('../controllers/auth.controller');
const authValidation = require('../validator/auth.validator');
const router = express.Router();
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: "test@gmail.com or 0123456789"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 */
router.post('/login',authValidation.validateLogin,login);
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - password
 *               - birthdate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ahmed"
 *               email:
 *                 type: string
 *                 example: "ahmed@gmail.com"
 *               mobile:
 *                 type: string
 *                 example: "01012345678"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               birthdate:
 *                 type: string
 *                 example: "2000-01-01"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

router.post('/register', 
authValidation.validateRegister,register);

router.post('/refresh-token',refreshToken);
router.post('/logout',logout);
module.exports=router;
