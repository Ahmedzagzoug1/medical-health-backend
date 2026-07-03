const userDto = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    birthdate: user.birthdate,
    avatar: user.avatar,
    role: user.role
});
module.exports = { userDto };