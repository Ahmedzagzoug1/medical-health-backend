# 🏥 Medical Health Backend API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.20.0-green.svg?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express Version](https://img.shields.io/badge/express-4.21.x-blue.svg?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB Mongoose](https://img.shields.io/badge/mongoose-8.x-green.svg?style=flat-square&logo=mongodb)](https://mongoosejs.com)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20%2F%20Clean-orange.svg?style=flat-square)](#project-structure)

A comprehensive, scalable, and secure Medical Health Management Backend API designed to power modern cross-platform mobile applications (Flutter). Built using a Modular Architecture Strategy, the system ensures scalability, maintainability, strict validation, and clean separation of concerns while following Clean Code and SOLID Principles.

---

# 🚀 Features

## 🔐 Authentication

- JWT Authentication
- Refresh Token Rotation
- Secure Password Hashing (bcrypt)
- Login with Email or Mobile
- Logout
- Access & Refresh Tokens
- Protected Routes

---

## 👥 Role-Based Access Control (RBAC)

Three system roles:

- 👑 Admin
- 👨‍⚕️ Doctor
- 🧑‍💻 Patient

Each role has dedicated permissions and protected endpoints.

---

# 📦 Modules

## 👨‍⚕️ Doctor Module

- Doctor Profile
- Doctor Details
- Doctor Search
- Working Hours
- Weekly Availability Schedule
- Available Appointment Slots

---

## 🧑‍💻 Patient Module

- Favorite Doctors
- Waiting Appointments
- Completed Appointments
- Cancelled Appointments
- Patient Profile

---

## 📅 Appointment Module

- Book Appointment
- Update Appointment
- Cancel Appointment
- Doctor Appointments
- Patient Appointments
- Appointment Status Management

---

## 👤 User Module

- Update Profile
- Upload Avatar
- Change Password
- User Management
- View User Profile

---

# 🔒 Security

- JWT Authentication
- Refresh Token Rotation
- Password Hashing (bcrypt)
- Role-Based Authorization (RBAC)
- Request Validation
- Global Error Handling
- Protected Routes
- Secure HTTP Headers
- Environment Variables

---

# 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | NoSQL Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Multer | File Upload |
| Express Validator | Request Validation |
| dotenv | Environment Variables |

---

## 📂 Project Structure

```text
medical_health/
├── config/
├── infrastructure/
│   └── database/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── doctors/
│   ├── appointments/
│   └── admin/
├── shared/
│   ├── middleware/
│   ├── utils/
│   └── errors/
├── uploads/
├── .env
├── package.json
└── index.js
```

---

## 🔐 Authorization System

### 👑 Admin

- Full system access
- Manage users and doctors
- Monitor platform activities

### 🩺 Doctor

- Manage doctor profile
- Set availability schedules
- Manage appointments

### 👤 Patient

- Browse doctors
- Book appointments
- Manage profile

---

## 🗺️ API Endpoints

### Authentication

Base URL:

```http
POST /auth/register
POST /auth/login
POST /auth/refresh-token
POST /auth/logout
```
---

### Users

Base URL:

```http
GET    /users/profile
PUT    /users/profile
PUT    /users/profile/password
PUT    /users/profile/avatar

GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
```
---

### Doctors

Base URL:

```http
GET    /doctors
POST   /doctors
PATCH  /doctors/profile

GET    /doctors/profile/:id

PUT    /doctors/working-hours
PATCH  /doctors/working-hours/:id
DELETE /doctors/working-hours/:id

GET    /doctors/:doctorId/available-slots

GET    /doctors/:id
```
---

### Patients

Base URL:
```http
GET    /patients/favouriteDoctors
POST   /patients/favouriteDoctor

GET    /patients/waitingAppointments
GET    /patients/completedAppointments
GET    /patients/cancelledAppointments
```

---

### appointments

```http
POST    /appointments
GET     /appointments/me
GET     /appointments/:id
PATCH   /appointments/:id
DELETE  /appointments/:id

GET     /appointments/doctor
```

---


## 🛠️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd medical_health
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

```env
PORT=3000

DB_CONNECTION=mongodb://localhost:27017/medical_health_db

NODE_ENV=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=
```

### Run Project

```bash
npm run dev
```

or

```bash
nodemon
```

---

## 🌿 Git Workflow

### Branches

- master
- auth
- users
- doctors
- appointments
- admin

---

## 🔒 Security Features

- JWT Authentication
- Password Hashing
- RBAC Authorization
- Input Validation
- Protected Routes
- Error Handling

---

## 📦 Main Dependencies

```json
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.7",
    "dotenv": "^17.4.2",
    "express-validator": "^7.3.2",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.7.1",
    "multer": "^2.2.0",
    "nodemon": "^3.1.14",
    "swagger-jsdoc": "^6.3.0",
    "swagger-ui-express": "^5.0.1",
    "validator": "^13.15.35"
  }
```

---

# 🔑 Authentication Flow

```text
Register
      │
      ▼
Login
      │
      ▼
Access Token (JWT)
Refresh Token
      │
      ▼
Protected Routes
      │
      ▼
Refresh Token Rotation
```

---

# 📌 API Features

- RESTful API
- Modular Architecture
- Clean Code
- SOLID Principles
- Reusable Components
- Scalable Structure
- Centralized Error Handling
- Input Validation
- Image Upload Support

---

# 🚀 Future Improvements

- Email Verification
- Password Reset
- Two-Factor Authentication (2FA)
- Notifications
- Online Payments
- Chat System
- Video Consultation
- Medical Records
- Prescriptions
- Ratings & Reviews
- Dashboard Analytics

---


## 📄 License

Educational and Portfolio Project.
