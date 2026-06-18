const express = require('express');

const authRoutes = require('./modules/auth/routes/auth.routes.js');
const userRoutes = require('./modules/users/routes/users.route');
//const doctorRoutes = require('./modules/doctors/routes/doctor.route');
const AppError = require('./shared/utils/app_error');

const HttpStatus = require('./shared/utils/http_status_text');
const appConfig = require('./config/app.config');
const connectDB = require('./infrastructure/database/mongo_db');
const app=express();

connectDB();


app.use(express.json());
// Routes
app.use('/api/v1/users', userRoutes     );
//app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/auth', authRoutes);



// Global error handling middleware 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  res.status(statusCode).json({

  status:  status,message: err.message,
  });
});
  
const port = appConfig.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});