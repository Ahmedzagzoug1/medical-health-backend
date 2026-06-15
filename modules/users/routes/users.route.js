const express = require('express');
const userController = require('../controllers/users.controllers');
const router = express.Router();
const { verifyToken } = require('../../../shared/middleware/auth_middleware');
const usersMiddleware = require('..//middleware/users.middleware');
const allowRoles = require('../../../shared/middleware/allow_roles');
const upload = require('../shared/middleware/upload_middleware');
const Roles = require('../shared/utils/user_role');
router.get('/profile', verifyToken, userController.getProfile)
.put('/profile', verifyToken, userController.updateProfile)
.put('/profile/password', verifyToken, userController.changePassword)
.post('/profile/avatar',verifyToken, upload.single('avatar'),
 userController.uploadAvatar);

 router.post('/', verifyToken, allowRoles(Roles.ADMIN), userController.createUser);

router.get('/', verifyToken, allowRoles(Roles.ADMIN), userController.getAllUsers);
router.get('/:id', verifyToken, allowRoles(Roles.ADMIN), userController.getUserById);
router.put('/:id', verifyToken, allowRoles(Roles.ADMIN), userController.updateUser);
router.delete('/:id', verifyToken, allowRoles(Roles.ADMIN), userController.deleteUser);
module.exports=router;