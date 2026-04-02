# Inventory Auth MERN

A full-stack MERN (MongoDB, Express, React, Node.js) application for inventory management with user authentication, product management, and category-based organization.

## Features

- User Authentication (Signup/Login with JWT)
- Product Management with Categories
- Advanced Search & Filtering
- Pagination Support
- Category-based Product Organization
- Secure Token-based Authorization

## Tech Stack

**Frontend:**
- React 18
- React Router DOM v6
- React Toastify (notifications)
- CSS3

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- Joi Validation
- bcryptjs Password Hashing
- CORS

## Installation Steps

### Step 1: Clone the Project
### Step 2: Set Up MongoDB Atlas
Go to "Databases" and click "Connect"
Select "Connect your application"
Copy your connection string (format: mongodb+srv://username:password@cluster.mongodb.net/dbname)
Replace username, password, and dbname with your credentials

### Step 3: Configure Backend Environment
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory
JWT_SECRET=your_secret_key_here

### Step 4: Install Backend Dependencies
cd Backend
npm install
npm run dev

### Step 5: Install Frontend Dependencies
cd frontend
npm install
npm start


Live vid : https://drive.google.com/file/d/1fHcm9dzqTGs-H59RDSnJyaDIoBhlT-gs/view?usp=sharing
