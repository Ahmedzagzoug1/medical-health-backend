const mongoose = require('mongoose');
const appConfig = require('../../config/app.config');
const DB_URI = appConfig.dbUri ;
const connectDB = async () => {
    try {
if (!DB_URI) {
        console.error('❌ Database connection string (DB_CONNECTION) is missing in .env file!');
        // Exit the process with failure status to prevent the app from running without a database connection
        process.exit(1); 
    }
        await mongoose.connect(DB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;