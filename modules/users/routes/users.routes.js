const express = require('express');
const { getProfile, updateProfile, changePassword, uploadAvatar,getAllUsers,
    getUserById,updateUser,deleteUser }  = require('../controllers/users.controller');
const router = express.Router();
const { verifyToken } = require('../../../shared/middleware/verify_token');
const allowRoles = require('../../../shared/middleware/allow_roles');
const upload = require('../../../shared/middleware/upload_file');
const Roles = require('../../../shared/utils/user_role');
const {changePasswordValidation}=require('../validator/users.validator');
router.put('/profile', verifyToken, updateProfile);

router.get('/profile',verifyToken,
     getProfile);
router.put('/profile/password', verifyToken, changePassword);
router.put('/profile/avatar',verifyToken, upload.single('avatar'),
 uploadAvatar);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', verifyToken, allowRoles(Roles.ADMIN), getAllUsers);
router.put('/:id', verifyToken, allowRoles(Roles.ADMIN), updateUser);

router.get('/:id', verifyToken, allowRoles(Roles.ADMIN), getUserById);
router.delete('/:id', verifyToken, allowRoles(Roles.ADMIN), deleteUser);

module.exports= router;