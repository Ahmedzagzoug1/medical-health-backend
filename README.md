# 🏥 Medical Health Backend API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.20.0-green.svg?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express Version](https://img.shields.io/badge/express-4.21.x-blue.svg?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB Mongoose](https://img.shields.io/badge/mongoose-8.x-green.svg?style=flat-square&logo=mongodb)](https://mongoosejs.com)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20%2F%20Clean-orange.svg?style=flat-square)](#project-structure)

A comprehensive, scalable, and secure Medical Health Management Backend API designed to power modern cross-platform mobile applications (Flutter). Built using a Modular Architecture Strategy, the system ensures scalability, maintainability, strict validation, and clean separation of concerns while following Clean Code and SOLID Principles.

---

## 🚀 Core Features

- Modular Architecture
- JWT Authentication
- Role-Based Access Control (RBAC)
- Password Hashing using bcrypt
- Request Validation using express-validator
- Centralized Error Handling
- File Upload Management with multer
- MongoDB Integration using Mongoose

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
/api/v1/auth
```

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /register | Register new user |
| POST | /login | Login and receive JWT |

---

### Users

Base URL:

```http
/api/v1/users
```

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /profile | Get profile |
| PUT | /update | Update profile |
| PATCH | /change-password | Change password |

---

### Doctors

Base URL:

```http
/api/v1/doctors
```

Features:

- Doctor Profile Management
- Availability Scheduling
- Appointment Tracking

---

### Appointments

Base URL:

```http
/api/v1/appointments
```

Features:

- Book Appointment
- Cancel Appointment
- Reschedule Appointment

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

JWT_SECRET=your_super_secret_jwt_key_here

JWT_EXPIRES_IN=90d
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
{
  "express": "^4.21.x",
  "mongoose": "^8.x",
  "jsonwebtoken": "^9.x",
  "bcrypt": "^6.x",
  "multer": "^2.x",
  "express-validator": "^7.x"
}
```

---

## 🚀 Future Features

- Real-time Chat (Socket.IO)
- Video Consultation
- Online Payments
- Push Notifications
- Medical Records
- Reviews & Ratings

---

## 📄 License

Educational and Portfolio Project.
