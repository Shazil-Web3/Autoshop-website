# Autexline - Automotive Sourcing Platform

A comprehensive automotive sourcing, sales, and export platform with role-based user management and admin approval workflow.

## 🚀 Features

### User Management
- **User Registration**: Simple user signup with basic information
- **Agent Registration**: Agent application with admin approval workflow
- **Dealer Registration**: Dealer application with admin approval workflow
- **Admin Management**: Complete admin dashboard for user management

### Authentication & Security
- JWT-based authentication
- Role-based access control (User, Agent, Dealer, Admin)
- Password hashing with bcrypt
- File upload support for applications

### Admin Features
- Approve/reject agent and dealer applications
- Generate Agent IDs for approved agents
- Suspend/activate user accounts
- View all users and their status
- File upload management

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **multer** for file uploads
- **cors** for cross-origin requests

### Frontend
- **Next.js 14** with App Router
- **React** with hooks
- **Tailwind CSS** for styling
- **JavaScript** for client-side logic

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AutoShop-site
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/autexline
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Database Setup

Make sure MongoDB is running on your system. The application will automatically create the necessary collections.

### 5. Create Admin User

```bash
cd backend
npm run create-admin
```

This will create an admin user with the following credentials:
- Email: `admin@autexline.com`
- Password: `admin123`

### 6. Start the Application

#### Start Backend (Development)
```bash
cd backend
npm run dev
```

#### Start Frontend (Development)
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
AutoShop-site/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   ├── createAdmin.js
│   │   └── fileUpload.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/
│   │   │   │   └── dashboard/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── components/
│   │   ├── pagesContent/
│   │   │   ├── Login/
│   │   │   └── Signup/
│   │   └── services/
│   │       └── api.js
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register/user` - User registration
- `POST /api/auth/register/agent` - Agent registration (with file upload)
- `POST /api/auth/register/dealer` - Dealer registration (with file upload)
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)

### Admin Management
- `GET /api/auth/pending-applications` - Get pending applications (admin only)
- `POST /api/auth/approve-application` - Approve application (admin only)
- `POST /api/auth/reject-application` - Reject application (admin only)
- `GET /api/auth/all-users` - Get all users (admin only)
- `POST /api/auth/suspend-user` - Suspend user (admin only)
- `POST /api/auth/activate-user` - Activate user (admin only)

## 👥 User Roles & Workflow

### User (Regular)
- Can register and login immediately
- Access to basic platform features

### Agent
1. Submits application with required documents
2. Application goes to admin for review
3. Admin approves/rejects application
4. If approved, admin generates Agent ID
5. Agent can then login and access agent features

### Dealer
1. Submits application with company information and documents
2. Application goes to admin for review
3. Admin approves/rejects application
4. If approved, dealer can login and access dealer features

### Admin
- Can manage all user applications
- Can approve/reject agent and dealer applications
- Can generate Agent IDs
- Can suspend/activate user accounts
- Full access to admin dashboard

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/autexline
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### File Upload Configuration
- Supported file types: Images, PDFs, Word documents, text files
- Maximum file size: 5MB
- Files are stored in `backend/uploads/` directory

## 🚀 Deployment

### Backend Deployment
1. Set up your MongoDB database (local or cloud)
2. Configure environment variables
3. Run `npm install` and `npm start`

### Frontend Deployment
1. Configure the API URL in environment variables
2. Build the application: `npm run build`
3. Deploy to your preferred hosting platform

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- File upload validation
- CORS configuration
- Input validation and sanitization

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.

---

**Note**: This is a development version. For production deployment, ensure proper security measures, environment configuration, and database optimization. 