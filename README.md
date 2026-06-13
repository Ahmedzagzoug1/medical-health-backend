# Project Structure

## Root Directory

```text
medical_health/
│
├── config/
├── infrastructure/
├── modules/
├── shared/
├── uploads/
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

---

## config/

Contains application configuration files.

**Responsibilities:**

* Database configuration
  
**Examples:**

```text
config/
├── database.js

```

---

## infrastructure/

Contains infrastructure and external service integrations.

**Responsibilities:**

* Database connections
* Payment gateways
* Notification services

**Examples:**

```text
infrastructure/
├── database/
├── payment/
└── notifications/
```

---

## modules/

Contains all business modules of the application.

```text
modules/
├── auth/
├── users/
├── doctors/
├── patients/
├── appointments/
├── reviews/
├── chat/
└── payments/
```

Each module is self-contained and follows the same architecture.

---

## Auth Module

```text
auth/
├── controllers/
├── middleware/
├── routes/
└── validator/
```

### controllers/

Contains business logic for authentication operations.

**Examples:**

* Register
* Login
* Forgot Password
* Reset Password
* Email Verification

### middleware/

Authentication-related middleware.

**Examples:**

* Check User Exists
* Verify Email
* Authentication Guards

### routes/

Defines authentication endpoints.

**Examples:**

```http
POST /api/auth/register
POST /api/auth/login
```

### validator/

Request validation rules.

**Examples:**

* Register Validation
* Login Validation
* Reset Password Validation

---

## Users Module

Responsible for:

* User Profile Management
* Update User Information
* Change Password
* Upload Profile Image

---

## Doctors Module

Responsible for:

* Doctor Profile Management
* Specializations
* Availability Schedule
* Working Hours

---

## Patients Module

Responsible for:

* Patient Profile Management
* Medical Information
* Patient Records

---

## Appointments Module

Responsible for:

* Book Appointment
* Cancel Appointment
* Reschedule Appointment
* Appointment Status Management

---

## Reviews Module

Responsible for:

* Create Review
* Update Review
* Delete Review
* Doctor Rating System

---

## Payments Module

Responsible for:

* Payment Processing
* Transaction History
* Refund Management

---

## shared/

Contains reusable code shared across all modules.

```text
shared/
├── errors/
├── middleware/
└── utils/
```

### errors/

Custom application errors.

**Examples:**

```text
AppError.js
ValidationError.js
NotFoundError.js
```

### middleware/

Global middleware used throughout the application.

**Examples:**

```text
verifyToken.js
allowRoles.js
errorHandler.js
asyncWrapper.js
```

### utils/

Helper functions and utilities.

**Examples:**

```text
generateJWT.js
hashPassword.js
httpStatus.js
fileUpload.js
```

---

## uploads/

Stores uploaded files and images.

```text
uploads/
├── users/
├── doctors/
└── reviews/
```

---

## app.js

Application initialization file.

**Responsibilities:**

* Register middlewares
* Register routes
* Global error handling

---

## index.js

Application entry point.

**Responsibilities:**

* Load environment variables
* Connect to database
* Start server

---

# API Versioning

```text
/api/v1/auth
/api/v1/users
/api/v1/doctors
/api/v1/patients
/api/v1/appointments
/api/v1/reviews
/api/v1/payments
```

---

# Development Workflow

## Git Branches

```text
 auth
 doctors
 master
 patient
 reviews
 users

```

Each feature should be developed in a separate branch and merged through a Pull Request.

---

# User Roles

## Admin

* Manage users
* Manage doctors
* Manage appointments
* Manage payments

## Doctor

* Manage profile
* View appointments
* Update appointment status

## Patient

* Book appointments
* Submit reviews
* Manage profile

---

# Environment Variables

Create a `.env` file based on the following template:

```env
dbconnection=
JWT_SECRET=
CLOUDINARY_API_SECRET=
```
