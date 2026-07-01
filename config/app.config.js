const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_CONNECTION,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
NODE_ENV:process.env.NODE_ENV
};