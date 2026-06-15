const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_CONNECTION,
    jwtSecret: process.env.JWT_SECRET,
};