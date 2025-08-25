# Drug GENIE - AI-Powered Healthcare Management System

A full-stack healthcare application with AI assistance, medicine tracking, blood bank management, and personalized health insights.

## 🚀 Features

- **AI Health Assistant** - Get personalized medical advice and symptom analysis
- **Medicine Reminders** - Smart medication tracking with customizable schedules
- **Blood Bank System** - Connect donors and recipients efficiently
- **Drug Interaction Checker** - Verify medicine compatibility and safety
- **Symptom Checker** - AI-powered symptom analysis and recommendations
- **Secure Authentication** - JWT-based user authentication and authorization

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + MongoDB
- **Authentication**: JWT tokens with bcrypt password hashing
- **State Management**: React hooks with API integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Drug_GENIE
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
MONGO_URI=mongodb://localhost:27017/drug-genie
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

Build and start backend:
```bash
npm run build
npm run dev
```

### 3. Frontend Setup
```bash
cd ../my-app
npm install
```

The frontend `.env` is already configured:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

## 🚀 Running the Application

1. **Start MongoDB** (if running locally)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd my-app && npm run dev`
4. **Access Application**: Open `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Reminders
- `GET /api/reminders` - Get user reminders (protected)
- `POST /api/reminders` - Create reminder (protected)
- `DELETE /api/reminders/:id` - Delete reminder (protected)

### Blood Requests
- `GET /api/blood-requests` - Get active blood requests (protected)
- `POST /api/blood-requests` - Create blood request (protected)

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with hot reload
```

### Frontend Development
```bash
cd my-app
npm run dev  # Starts with hot reload
```

### Building for Production
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd my-app
npm run build
npm run preview
```

## 🧪 Testing the Integration

1. **Register a new user** via the signup page
2. **Login** with your credentials
3. **Create medicine reminders** in the Reminders section
4. **Post blood requests** in the Blood Bank section
5. **Verify data persistence** by refreshing the page

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation and sanitization

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check MongoDB connection
   - Verify `.env` file exists with correct values
   - Ensure port 5000 is available

2. **Frontend API calls fail**
   - Verify backend is running on port 5000
   - Check browser network tab for CORS errors
   - Ensure `.env` file has correct API URL

3. **Authentication issues**
   - Clear browser localStorage
   - Check JWT_SECRET in backend `.env`
   - Verify token expiration settings

## 📝 Project Structure

```
Drug_GENIE/
├── backend/
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── controllers/# API route handlers
│   │   ├── middleware/ # Auth & error middleware
│   │   ├── models/     # MongoDB schemas
│   │   ├── routes/     # API routes
│   │   └── utils/      # Helper functions
│   └── package.json
├── my-app/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages
│   │   ├── services/   # API service layer
│   │   ├── types/      # TypeScript definitions
│   │   └── utils/      # Helper functions
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
