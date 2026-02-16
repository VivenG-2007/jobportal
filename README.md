# 🎯 JobHunt - Your Career Journey Starts Here

**JobHunt** is a full-stack job seeking platform designed to connect talented professionals with their dream companies. Built with the MERN stack (MongoDB, Express, React, Node.js), it offers a seamless experience for both job seekers and recruiters.

---

## 🚀 Features

### For Job Seekers
-   **Job Search**: Browse and filter jobs by location, industry, and salary.
-   **Detailed Job Descriptions**: View salary, experience requirements, and company details.
-   **One-Click Apply**: Easily applies to jobs with a saved profile.
-   **Profile Management**: Update your resume, skills, and personal information.
-   **Track Applications**: Monitor the status of your job applications (Pending, Accepted, Rejected).
-   **Resume Upload**: Upload and manage your resume securely.

### For Recruiters
-   **Company Management**: Create and manage company company profiles.
-   **Post Jobs**: Create detailed job listings with requirements and descriptions.
-   **Applicant Tracking**: View and manage applicants for each job.
-   **Application Status**: Accept or reject applications directly from the dashboard.

---

## 🛠️ Technology Stack

### Frontend (Client-Side)
-   **React.js**: JavaScript library for building user interfaces.
-   **Redux Toolkit**: State management for user authentication, jobs, and companies.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Shadcn UI**: Modern UI components for a polished look.
-   **React Router DOM**: Declarative routing for React.
-   **Axios**: Promise-based HTTP client for API requests.
-   **Framer Motion**: Production-ready animation library.
-   **Lucide React**: Beautiful & consistent icons.
-   **React Hot Toast**: Beautiful notifications.

### Backend (Server-Side)
-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Web application framework for Node.js.
-   **MongoDB**: NoSQL database for flexible data storage.
-   **Mongoose**: ODM library for MongoDB and Node.js.
-   **JWT (JSON Web Tokens)**: Secure user authentication.
-   **Bcrypt.js**: Library for hashing passwords.
-   **Multer**: Middleware for handling multipart/form-data (file uploads).
-   **Cloudinary**: Cloud-based image and video management.
-   **Cookie Parser**: Parse Cookie header and populate `req.cookies`.

---

## ⚙️ Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
-   Node.js (v18.x or higher)
-   MongoDB (Local or AtlasURI)
-   Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/jobhunt.git
cd jobhunt
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your environment variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Start the backend server:
```bash
npm run dev
```
The server should be running on `http://localhost:8000`.

### 3. Frontend Setup
Navigate to the frontend folder and install dependencies:
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application should be accessible at `http://localhost:5173`.

---

## 📂 Project Structure

```
jobhunt/
├── backend/            # Express.js Server
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── utils/          # Utility functions (db clear, etc.)
│
└── frontend/           # React Application
    ├── public/         # Static assets
    └── src/
        ├── components/ # Reusable UI components
        ├── pages/      # Application pages (Home, Jobs, Profile)
        ├── redux/      # Redux store and slices
        └── hooks/      # Custom React hooks
```

---
