# LetsChat 💜
A real-time chat application built with the MERN stack and Socket.io, featuring live messaging, notifications, and online status updates.


## 🚀 Features

Real-time Messaging - Instant message delivery using Socket.io

Online Status - See who's online in real-time

Typing Indicators - Know when someone is typing

Read Receipts - See when messages are read

User Authentication - Secure JWT-based authentication

Responsive Design - Works on desktop and mobile

Modern UI - Beautiful purple-themed interface

## 🛠️ Tech Stack

### Frontend
React - UI framework

Socket.io-client - Real-time communication

Axios - HTTP client

React Router - Navigation

CSS3 - Styling with custom properties

### Backend
Node.js - Runtime environment

Express.js - Web framework

Socket.io - Real-time bidirectional communication

MongoDB - Database

Mongoose - ODM

JWT - Authentication

bcryptjs - Password hashing

## 📸 Screenshots
(Add your screenshots here)

## 🏁 Quick Start
Prerequisites
Node.js (v14 or higher)

MongoDB (local or Atlas)

npm or yarn

## Installation
Clone the repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/real-time-communication-with-socket-io-Jenny-light.git
cd letschat

Backend Setup

cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configurations

Frontend Setup

cd ../frontend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configurations
Environment Variables
Backend (.env)

env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/letschat
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:3000
Frontend (.env)

env
REACT_APP_SERVER_URL=http://localhost:5000
Running the Application
Start MongoDB (if using local)


# Windows
net start MongoDB

# macOS/Linux
mongod
Start Backend Server


cd backend
npm run dev
Server will run on http://localhost:5000

Start Frontend Development Server


cd frontend
npm start
Client will run on http://localhost:3000
```

🗂️ Project Structure
```bash
letschat/
├── backend/
│   ├── models/          # MongoDB models
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── messages.js
│   ├── middleware/      # Custom middleware
│   │   └── auth.js
│   ├── socket/          # Socket.io handlers
│   │   └── socketHandlers.js
│   └── server.js        # Server entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       │   ├── Logo.js
│       │   ├── Message.js
│       │   ├── MessageList.js
│       │   ├── MessageInput.js
│       │   ├── UserList.js
│       │   └── ProtectedRoute.js
│       ├── pages/       # Page components
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── Chat.js
│       ├── context/     # React context
│       │   ├── AuthContext.js
│       │   └── SocketContext.js
│       └── App.js       # Main App component
└── README.md
```

## 🎯 API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

Users
GET /api/users - Get all users (protected)

Messages
GET /api/messages/:userId - Get messages with specific user (protected)

Socket Events
Client to Server:

join - Join user room

sendMessage - Send a message

typingStart - Start typing indicator

typingStop - Stop typing indicator

markAsRead - Mark message as read

Server to Client:

newMessage - Receive new message

messageSent - Message sent confirmation

userTyping - User typing status

messageRead - Message read confirmation

userOnline - User online status

userOffline - User offline status

## 🧪 Testing
Manual Testing
Register two different users

Login in two different browser windows/tabs

Start chatting between the two users

Test features:

Real-time messaging

Online status

Typing indicators

Read receipts

## 🤝 Contributing
We love your input! We want to make contributing to LetsChat as easy and transparent as possible.

Development Process
Fork the repo

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

## Reporting Bugs
If you find a bug, please open an issue with:

Description of the bug

Steps to reproduce

Expected behavior

Screenshots (if applicable)

## 🐛 Troubleshooting
Common Issues
Socket connection errors

Check if backend server is running

Verify CORS configuration

MongoDB connection issues

Check if MongoDB is running locally

Verify connection string in .env

Authentication errors

Check JWT secret configuration

Verify token in localStorage

Getting Help
Check the issues page

Create a new issue with your problem

Email: jennylightomoregie@gmail.com

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
Socket.io for real-time communication

MongoDB for database

React for frontend framework

Express.js for backend framework

## 📞 Contact

 Jennifer Omoregie
 jennylightomoregie@gmail.com


<div align="center">
Made with 💜 and ☕ by Jennylight

</div>
