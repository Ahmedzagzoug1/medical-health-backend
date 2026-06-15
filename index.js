const express = require('express');

const authRoutes = require('./modules/auth/routes/auth.route.js');
const userRoutes = require('./modules/users/routes/users.route');
const doctorRoutes = require('./modules/doctors/routes/doctor.route');
const AppError = require('./shared/utils/app_error');
const HttpStatus = require('./shared/utils/http_status');

const app=express();

app.use(express.json());

app.use('/api/v1/users', userRoutes     );
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('*', (err, req, res) => {
  res.status(AppError.NOT_FOUND).json({
    status: HttpStatus.NOT_FOUND,
    message: 'Route not found'
  });
});
  

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});