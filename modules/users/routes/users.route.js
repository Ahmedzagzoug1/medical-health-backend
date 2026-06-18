const express = require('express');
const { getProfile, updateProfile, changePassword, uploadAvatar }  = require('../controllers/users.controller');
const router = express.Router();
const { verifyToken } = require('../../../shared/middleware/verify_token');
const allowRoles = require('../../../shared/middleware/allow_roles');
const upload = require('../../../shared/middleware/upload_file');
const Roles = require('../../../shared/utils/user_role');
router.get('/profile', verifyToken, getProfile)
.put('/profile', verifyToken, updateProfile)
.put('/profile/password', verifyToken, changePassword)
.post('/profile/avatar',verifyToken, upload.single('avatar'),
 uploadAvatar);
/*

router.get('/', verifyToken, allowRoles(Roles.ADMIN), userController.getAllUsers);
router.get('/:id', verifyToken, allowRoles(Roles.ADMIN), userController.getUserById);
router.put('/:id', verifyToken, allowRoles(Roles.ADMIN), userController.updateUser);
router.delete('/:id', verifyToken, allowRoles(Roles.ADMIN), userController.deleteUser);
*/
module.exports=router;