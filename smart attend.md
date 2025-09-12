

# **WHOLE CODE ANALYSIS** 





Now let me check some frontend components to see how they use the API:





\[3 tools called]



Now let me check the middleware and authentication flow:





\[2 tools called]



Perfect! Now I have a comprehensive understanding of how the backend and frontend are connected. Let me create a visual diagram to illustrate this connection:





\[1 tool called]



Let me provide you with a comprehensive explanation of how the backend and frontend are connected in your Smart Attendance system:



\##    \*\*Backend-Frontend Connection Architecture\*\*



\### \*\*1. Communication Protocol\*\*

\- \*\*HTTP/HTTPS\*\*: RESTful API communication

\- \*\*JSON\*\*: Data exchange format

\- \*\*CORS\*\*: Cross-Origin Resource Sharing enabled

\- \*\*Ports\*\*: Backend (3000), Frontend (5173)



\### \*\*2. API Configuration \& Base Setup\*\*



\*\*Frontend API Configuration (`frontend/src/utils/api.js`):\*\*

```javascript

const API = axios.create({

&nbsp; baseURL: "http://localhost:3000/api", 

&nbsp; headers: { "Content-Type": "application/json" },

});

```



\*\*Backend CORS Setup (`backend/server.js`):\*\*

```javascript

app.use(cors({

&nbsp; origin: 'http://localhost:5173', // Allow frontend requests

&nbsp; credentials: true, // Allow cookies \& sessions

}));

```



\### \*\*3. Authentication Flow\*\*



\*\*JWT Token-Based Authentication:\*\*



1\. \*\*Login Process:\*\*

&nbsp;  - Frontend sends credentials to `/api/auth/login`

&nbsp;  - Backend validates and returns JWT token

&nbsp;  - Frontend stores token in localStorage

&nbsp;  - Token automatically attached to subsequent requests



2\. \*\*Token Management:\*\*

&nbsp;  ```javascript

&nbsp;  // Frontend: Automatic token attachment

&nbsp;  API.interceptors.request.use((config) => {

&nbsp;    const token = localStorage.getItem("token");

&nbsp;    if (token) {

&nbsp;      config.headers.Authorization = `Bearer ${token}`;

&nbsp;    }

&nbsp;    return config;

&nbsp;  });

&nbsp;  ```



3\. \*\*Backend Token Verification:\*\*

&nbsp;  ```javascript

&nbsp;  // Backend: Token validation middleware

&nbsp;  const authenticateToken = async (req, res, next) => {

&nbsp;    const token = req.header('Authorization')?.split(' ')\[1];

&nbsp;    const decoded = jwt.verify(token, process.env.JWT\_SECRET);

&nbsp;    req.user = await User.findById(decoded.id);

&nbsp;    next();

&nbsp;  };

&nbsp;  ```



\### \*\*4. API Endpoints \& Routes\*\*



\*\*Backend Routes (`backend/server.js`):\*\*

```javascript

app.use('/api/auth', authRoutes);      // Authentication

app.use('/api/events', eventRoutes);   // Event management

app.use('/api/qr', qrRoutes);          // QR code operations

```



\*\*Frontend API Functions (`frontend/src/utils/api.js`):\*\*

\- `signup()` → `POST /api/auth/signup`

\- `login()` → `POST /api/auth/login`

\- `createEvent()` → `POST /api/events/create`

\- `getEvents()` → `GET /api/events/all`

\- `checkInAttendance()` → `POST /api/attendance/check-in`



\### \*\*5. State Management\*\*



\*\*Frontend Context (`frontend/src/context/AuthContext.jsx`):\*\*

```javascript

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

&nbsp; const \[user, setUser] = useState(null);

&nbsp; const \[role, setRole] = useState(null);

&nbsp; const \[isAuthenticated, setIsAuthenticated] = useState(false);

&nbsp; 

&nbsp; // Login function

&nbsp; const loginUser = (userData, token) => {

&nbsp;   localStorage.setItem("token", token);

&nbsp;   localStorage.setItem("user", JSON.stringify(userData));

&nbsp;   setUser(userData);

&nbsp;   setRole(userData.role);

&nbsp;   setIsAuthenticated(true);

&nbsp; };

};

```



\### \*\*6. Role-Based Access Control\*\*



\*\*Frontend Route Protection:\*\*

```javascript

const ProtectedRoute = ({ element, allowedRoles }) => {

&nbsp; const { role, isAuthenticated } = useAuth();

&nbsp; 

&nbsp; if (!isAuthenticated) return <Navigate to="/auth" />;

&nbsp; if (!allowedRoles.includes(role)) {

&nbsp;   return <Navigate to="/unauthorized" />;

&nbsp; }

&nbsp; return element;

};

```



\*\*Backend Authorization:\*\*

```javascript

const authorize = (roles) => {

&nbsp; return (req, res, next) => {

&nbsp;   if (!req.user || !roles.includes(req.user.role)) {

&nbsp;     return res.status(403).json({ message: 'Access denied' });

&nbsp;   }

&nbsp;   next();

&nbsp; };

};

```



\### \*\*7. Data Flow Examples\*\*



\*\*Event Creation Flow:\*\*

1\. \*\*Frontend:\*\* User fills form in `AdminCreateEvent.jsx`

2\. \*\*API Call:\*\* `createEvent(eventData)` → `POST /api/events/create`

3\. \*\*Backend:\*\* `eventController.createEvent()` processes request

4\. \*\*Database:\*\* Event saved to MongoDB

5\. \*\*Response:\*\* Success/error sent back to frontend

6\. \*\*UI Update:\*\* User redirected to events list



\*\*Attendance Scanning Flow:\*\*

1\. \*\*Frontend:\*\* QR scanner in `UserScanAttendance.jsx`

2\. \*\*API Call:\*\* QR verification → `POST /api/qr/verify`

3\. \*\*Backend:\*\* `qrMiddleware.verifyQR()` validates QR code

4\. \*\*Database:\*\* Attendance record created

5\. \*\*Response:\*\* Success confirmation

6\. \*\*UI Update:\*\* Success message displayed



\### \*\*8. Error Handling\*\*



\*\*Frontend Error Handling:\*\*

```javascript

API.interceptors.response.use(

&nbsp; (response) => response,

&nbsp; (error) => {

&nbsp;   if (error.response?.status === 401 || error.response?.status === 403) {

&nbsp;     localStorage.removeItem("token");

&nbsp;     // Redirect to login

&nbsp;   }

&nbsp;   return Promise.reject(error);

&nbsp; }

);

```



\*\*Backend Error Responses:\*\*

```javascript

try {

&nbsp; // Process request

&nbsp; res.status(200).json({ success: true, data });

} catch (error) {

&nbsp; res.status(500).json({ message: 'Error message', error: error.message });

}

```



\### \*\*9. Real-Time Features\*\*



\*\*QR Code Generation:\*\*

\- Backend generates dynamic QR codes with 30-second expiry

\- Frontend displays QR codes for admin events

\- Users scan QR codes to mark attendance



\*\*Session Management:\*\*

\- Express sessions for OAuth (Google)

\- JWT tokens for API authentication

\- LocalStorage for client-side persistence



\### \*\*10. Security Measures\*\*



\- \*\*CORS Configuration:\*\* Restricts frontend origin

\- \*\*JWT Expiration:\*\* 7-day token expiry

\- \*\*Password Hashing:\*\* bcrypt for secure storage

\- \*\*Role-Based Access:\*\* Admin/User permission levels

\- \*\*Input Validation:\*\* Required field checks

\- \*\*Error Sanitization:\*\* No sensitive data in error responses



This architecture provides a secure, scalable, and maintainable connection between your React frontend and Node.js backend, enabling seamless user authentication, role-based access control, and real-time attendance management.





























































# 

# 

# 

# BACKEND

# 

# 

# 

# 

# 

# 

# 

















Based on my analysis of your Smart Attendance project, here are all the technologies used in the backend:



\## 🛠 \*\*Backend Technologies Stack\*\*



\### \*\*Core Framework \& Runtime\*\*

\- \*\*Node.js\*\* - JavaScript runtime environment

\- \*\*Express.js\*\* - Web application framework for Node.js



\### \*\*Database \& Data Management\*\*

\- \*\*MongoDB\*\* - NoSQL document database

\- \*\*Mongoose\*\* - MongoDB object modeling tool (ODM)



\### \*\*Authentication \& Security\*\*

\- \*\*Passport.js\*\* - Authentication middleware

\- \*\*JWT (jsonwebtoken)\*\* - JSON Web Token for secure authentication

\- \*\*bcrypt\*\* - Password hashing library

\- \*\*bcryptjs\*\* - Alternative bcrypt implementation

\- \*\*express-session\*\* - Session management middleware



\### \*\*OAuth \& Social Login\*\*

\- \*\*passport-google-oauth20\*\* - Google OAuth 2.0 strategy

\- \*\*passport-github2\*\* - GitHub OAuth strategy

\- \*\*passport-linkedin-oauth2\*\* - LinkedIn OAuth strategy

\- \*\*passport-local\*\* - Local username/password strategy

\- \*\*passport-jwt\*\* - JWT strategy for Passport



\### \*\*HTTP \& API\*\*

\- \*\*CORS\*\* - Cross-Origin Resource Sharing middleware

\- \*\*cookie-parser\*\* - Cookie parsing middleware

\- \*\*express-list-endpoints\*\* - List all registered endpoints



\### \*\*QR Code Generation\*\*

\- \*\*qrcode\*\* - QR code generation library



\### \*\*HTTP Client\*\*

\- \*\*axios\*\* - Promise-based HTTP client for API requests



\### \*\*Environment \& Configuration\*\*

\- \*\*dotenv\*\* - Environment variable management



\### \*\*Development Tools\*\*

\- \*\*nodemon\*\* - Development server with auto-restart



\## 📋 \*\*Detailed Technology Breakdown\*\*



\### \*\*1. Core Backend Framework\*\*

```javascript

// Express.js setup

const express = require('express');

const app = express();

app.use(express.json());

```



\### \*\*2. Database Integration\*\*

```javascript

// MongoDB with Mongoose

const mongoose = require('mongoose');

await mongoose.connect(process.env.MONGO\_URI);

```



\### \*\*3. Authentication Stack\*\*

```javascript

// JWT Authentication

const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: user.\_id, role: user.role }, JWT\_SECRET);



// Password Hashing

const bcrypt = require('bcryptjs');

const hashedPassword = await bcrypt.hash(password, salt);

```



\### \*\*4. OAuth Integration\*\*

```javascript

// Google OAuth

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({

&nbsp; clientID: GOOGLE\_CLIENT\_ID,

&nbsp; clientSecret: GOOGLE\_CLIENT\_SECRET,

&nbsp; callbackURL: "/api/auth/google/callback"

}));

```



\### \*\*5. Security Middleware\*\*

```javascript

// CORS Configuration

app.use(cors({

&nbsp; origin: 'http://localhost:5173',

&nbsp; credentials: true,

}));



// Session Management

app.use(session({

&nbsp; secret: process.env.SESSION\_SECRET,

&nbsp; resave: false,

&nbsp; saveUninitialized: false,

}));

```



\### \*\*6. QR Code Generation\*\*

```javascript

// QR Code Creation

const QRCode = require('qrcode');

const qrCodeData = await QRCode.toDataURL(qrString);

```



\## 📦 \*\*Package.json Dependencies\*\*



From your `backend/package.json`:



```json

{

&nbsp; "dependencies": {

&nbsp;   "axios": "^1.7.9",                    // HTTP client

&nbsp;   "bcrypt": "^5.1.0",                   // Password hashing

&nbsp;   "bcryptjs": "^3.0.2",                 // Alternative bcrypt

&nbsp;   "cookie-parser": "^1.4.7",            // Cookie parsing

&nbsp;   "cors": "^2.8.5",                     // CORS middleware

&nbsp;   "dotenv": "^16.4.7",                  // Environment variables

&nbsp;   "express": "^4.21.2",                 // Web framework

&nbsp;   "express-list-endpoints": "^7.1.1",   // Endpoint listing

&nbsp;   "express-session": "^1.18.1",         // Session management

&nbsp;   "jsonwebtoken": "^9.0.2",             // JWT tokens

&nbsp;   "mongoose": "^8.10.1",                // MongoDB ODM

&nbsp;   "passport": "^0.7.0",                 // Authentication

&nbsp;   "passport-github2": "^0.1.12",        // GitHub OAuth

&nbsp;   "passport-google-oauth20": "^2.0.0",  // Google OAuth

&nbsp;   "passport-jwt": "^4.0.1",             // JWT strategy

&nbsp;   "passport-linkedin-oauth2": "^2.0.0", // LinkedIn OAuth

&nbsp;   "passport-local": "^1.0.0",           // Local strategy

&nbsp;   "qrcode": "^1.5.4"                    // QR code generation

&nbsp; },

&nbsp; "devDependencies": {

&nbsp;   "nodemon": "^3.1.9"                   // Development server

&nbsp; }

}

```



\## 🏗 \*\*Architecture Pattern\*\*



Your backend follows a \*\*MVC (Model-View-Controller)\*\* pattern:



\- \*\*Models\*\*: Database schemas (`User.js`, `Event.js`, `Attendance.js`, `QRCode.js`)

\- \*\*Controllers\*\*: Business logic (`userController.js`, `eventController.js`, `qrCodeController.js`)

\- \*\*Routes\*\*: API endpoints (`auth.js`, `event.js`, `qrRoutes.js`)

\- \*\*Middleware\*\*: Authentication, authorization, and QR processing

\- \*\*Utils\*\*: Helper functions and role definitions



\## 🔧 \*\*Key Features Enabled by These Technologies\*\*



1\. \*\*RESTful API\*\* - Express.js routing

2\. \*\*Secure Authentication\*\* - JWT + Passport.js

3\. \*\*Social Login\*\* - OAuth strategies

4\. \*\*Database Operations\*\* - Mongoose ODM

5\. \*\*Password Security\*\* - bcrypt hashing

6\. \*\*Cross-Origin Support\*\* - CORS middleware

7\. \*\*Session Management\*\* - express-session

8\. \*\*QR Code Generation\*\* - qrcode library

9\. \*\*Environment Configuration\*\* - dotenv

10\. \*\*Development Efficiency\*\* - nodemon auto-restart



This technology stack provides a robust, secure, and scalable backend for your Smart Attendance system, supporting modern web development practices and security standards.











































# 

# 

# 

# 

# 

# 

# 

# FRONTEND 

# 

# 















Based on my analysis of your Smart Attendance project, here are all the technologies used in the frontend:



\## 🎨 \*\*Frontend Technologies Stack\*\*



\### \*\*Core Framework \& Build Tools\*\*

\- \*\*React.js 19.0.0\*\* - Modern JavaScript library for building user interfaces

\- \*\*Vite 6.2.0\*\* - Fast build tool and development server

\- \*\*React DOM 19.0.0\*\* - React rendering library



\### \*\*Styling \& UI Framework\*\*

\- \*\*Tailwind CSS 4.0.9\*\* - Utility-first CSS framework

\- \*\*@tailwindcss/vite 4.0.9\*\* - Vite plugin for Tailwind CSS

\- \*\*Framer Motion 12.4.7\*\* - Animation library for React



\### \*\*Routing \& Navigation\*\*

\- \*\*React Router DOM 7.2.0\*\* - Client-side routing for React applications



\### \*\*QR Code \& Camera Functionality\*\*

\- \*\*qrcode.react 4.2.0\*\* - QR code generation component

\- \*\*react-qr-reader 3.0.0-beta-1\*\* - QR code reader component

\- \*\*react-qr-scanner 1.0.0-alpha.11\*\* - Alternative QR scanner

\- \*\*@zxing/library 0.18.6\*\* - Barcode/QR code scanning library

\- \*\*react-webcam 7.2.0\*\* - Webcam access for face recognition



\### \*\*HTTP Client \& API Communication\*\*

\- \*\*Axios 1.8.1\*\* - Promise-based HTTP client for API requests



\### \*\*UI Components \& Icons\*\*

\- \*\*@headlessui/react 2.2.0\*\* - Unstyled, accessible UI components

\- \*\*Lucide React 0.477.0\*\* - Beautiful \& consistent icon toolkit

\- \*\*React Icons 5.5.0\*\* - Popular icon library



\### \*\*File Operations\*\*

\- \*\*file-saver 2.0.5\*\* - File saving functionality (CSV exports)



\### \*\*Development Tools\*\*

\- \*\*ESLint 9.21.0\*\* - JavaScript linting tool

\- \*\*@eslint/js 9.21.0\*\* - ESLint JavaScript configuration

\- \*\*eslint-plugin-react-hooks 5.1.0\*\* - React Hooks linting rules

\- \*\*eslint-plugin-react-refresh 0.4.19\*\* - React refresh linting



\### \*\*TypeScript Support\*\*

\- \*\*@types/react 19.0.10\*\* - TypeScript definitions for React

\- \*\*@types/react-dom 19.0.4\*\* - TypeScript definitions for React DOM



\### \*\*Build \& Development\*\*

\- \*\*@vitejs/plugin-react 4.3.4\*\* - Vite plugin for React

\- \*\*globals 15.15.0\*\* - Global variables for ESLint



\## 📦 \*\*Package.json Dependencies\*\*



From your `frontend/package.json`:



```json

{

&nbsp; "dependencies": {

&nbsp;   "@headlessui/react": "^2.2.0",        // UI components

&nbsp;   "@tailwindcss/vite": "^4.0.9",        // Tailwind Vite plugin

&nbsp;   "@zxing/library": "^0.18.6",          // QR scanning library

&nbsp;   "axios": "^1.8.1",                    // HTTP client

&nbsp;   "file-saver": "^2.0.5",               // File saving

&nbsp;   "framer-motion": "^12.4.7",           // Animations

&nbsp;   "headlessui": "^0.0.0",               // UI components

&nbsp;   "lucide-react": "^0.477.0",           // Icons

&nbsp;   "qrcode.react": "^4.2.0",             // QR code generation

&nbsp;   "react": "^19.0.0",                   // Core React

&nbsp;   "react-dom": "^19.0.0",               // React DOM

&nbsp;   "react-icons": "^5.5.0",              // Icon library

&nbsp;   "react-qr-reader": "^3.0.0-beta-1",   // QR reader

&nbsp;   "react-qr-scanner": "^1.0.0-alpha.11", // QR scanner

&nbsp;   "react-router-dom": "^7.2.0",         // Routing

&nbsp;   "react-webcam": "^7.2.0",             // Webcam access

&nbsp;   "tailwindcss": "^4.0.9"               // CSS framework

&nbsp; },

&nbsp; "devDependencies": {

&nbsp;   "@eslint/js": "^9.21.0",              // ESLint config

&nbsp;   "@types/react": "^19.0.10",           // React types

&nbsp;   "@types/react-dom": "^19.0.4",        // React DOM types

&nbsp;   "@vitejs/plugin-react": "^4.3.4",     // Vite React plugin

&nbsp;   "eslint": "^9.21.0",                  // Linting

&nbsp;   "eslint-plugin-react-hooks": "^5.1.0", // React hooks linting

&nbsp;   "eslint-plugin-react-refresh": "^0.4.19", // React refresh linting

&nbsp;   "globals": "^15.15.0",                // Global variables

&nbsp;   "vite": "^6.2.0"                      // Build tool

&nbsp; }

}

```



\## 🏗 \*\*Frontend Architecture\*\*



\### \*\*1. Component Structure\*\*

```

src/

├── components/          # Reusable UI components

│   ├── Header.jsx

│   ├── Sidebar.jsx

│   ├── QRScanner.jsx

│   ├── FaceRecognition.jsx

│   └── ...

├── pages/              # Route components

│   ├── admin/          # Admin-specific pages

│   ├── user/           # User-specific pages

│   └── Auth.jsx

├── context/            # React Context for state

│   ├── AuthContext.jsx

│   └── EventContext.jsx

└── utils/              # Helper functions

&nbsp;   ├── api.js

&nbsp;   ├── auth.js

&nbsp;   └── helpers.js

```



\### \*\*2. State Management\*\*

\- \*\*React Context API\*\* - Global state management

\- \*\*useState Hook\*\* - Local component state

\- \*\*useEffect Hook\*\* - Side effects and lifecycle

\- \*\*localStorage\*\* - Client-side data persistence



\### \*\*3. Routing System\*\*

```javascript

// React Router DOM setup

import { BrowserRouter, Routes, Route } from "react-router-dom";



// Protected routes with role-based access

const ProtectedRoute = ({ element, allowedRoles }) => {

&nbsp; const { role, isAuthenticated } = useAuth();

&nbsp; // Role-based access control

};

```



\## 🎨 \*\*UI/UX Technologies\*\*



\### \*\*1. Styling Framework\*\*

```javascript

// Tailwind CSS classes

className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl"

```



\### \*\*2. Animation Library\*\*

```javascript

// Framer Motion animations

import { motion, AnimatePresence } from "framer-motion";



<motion.div

&nbsp; initial={{ opacity: 0, y: 50 }}

&nbsp; animate={{ opacity: 1, y: 0 }}

&nbsp; exit={{ opacity: 0, y: -50 }}

&nbsp; transition={{ duration: 0.3 }}

>

```



\### \*\*3. Icon System\*\*

```javascript

// Lucide React icons

import { Mail, Phone, LockKeyhole } from "lucide-react";



// React Icons

import { FaGoogle, FaGithub } from "react-icons/fa";

```



\##    \*\*Feature-Specific Technologies\*\*



\### \*\*1. QR Code Functionality\*\*

```javascript

// QR Code Generation

import QRCode from "qrcode.react";



// QR Code Scanning

import { QrReader } from "react-qr-reader";

import { BrowserMultiFormatReader } from "@zxing/library";

```



\### \*\*2. Camera \& Webcam\*\*

```javascript

// Webcam access for face recognition

import Webcam from "react-webcam";



// Camera permissions and video capture

const webcamRef = useRef(null);

```



\### \*\*3. File Operations\*\*

```javascript

// CSV export functionality

import { saveAs } from "file-saver";



// Generate and download CSV files

const csvData = generateCSV(attendanceData);

saveAs(csvData, "attendance.csv");

```



\## 🔧 \*\*Development \& Build Tools\*\*



\### \*\*1. Vite Configuration\*\*

```javascript

// vite.config.js

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'



export default defineConfig({

&nbsp; plugins: \[react()],

&nbsp; server: {

&nbsp;   port: 5173,

&nbsp;   proxy: {

&nbsp;     '/api': 'http://localhost:3000'

&nbsp;   }

&nbsp; }

})

```



\### \*\*2. ESLint Configuration\*\*

```javascript

// eslint.config.js

import js from '@eslint/js'

import globals from 'globals'

import reactHooks from 'eslint-plugin-react-hooks'

import reactRefresh from 'eslint-plugin-react-refresh'



export default \[

&nbsp; js.configs.recommended,

&nbsp; {

&nbsp;   files: \['\*\*/\*.{js,jsx}'],

&nbsp;   languageOptions: {

&nbsp;     globals: globals.browser,

&nbsp;   },

&nbsp;   plugins: {

&nbsp;     'react-hooks': reactHooks,

&nbsp;     'react-refresh': reactRefresh,

&nbsp;   },

&nbsp; },

]

```



\## 🚀 \*\*Key Features Enabled by These Technologies\*\*



1\. \*\*Modern React Development\*\* - React 19 with hooks and context

2\. \*\*Fast Development\*\* - Vite for instant hot reload

3\. \*\*Responsive Design\*\* - Tailwind CSS utility classes

4\. \*\*Smooth Animations\*\* - Framer Motion transitions

5\. \*\*QR Code Integration\*\* - Multiple QR libraries for generation/scanning

6\. \*\*Camera Access\*\* - Webcam integration for face recognition

7\. \*\*File Downloads\*\* - CSV export functionality

8\. \*\*Icon System\*\* - Comprehensive icon libraries

9\. \*\*Type Safety\*\* - TypeScript definitions

10\. \*\*Code Quality\*\* - ESLint for code linting

11\. \*\*Accessibility\*\* - Headless UI components

12\. \*\*Routing\*\* - Client-side navigation with React Router



\## 📊 \*\*Technology Categories Summary\*\*



| Category | Technologies |

|----------|-------------|

| \*\*Core Framework\*\* | React 19, React DOM, Vite |

| \*\*Styling\*\* | Tailwind CSS, Framer Motion |

| \*\*Routing\*\* | React Router DOM |

| \*\*QR/Camera\*\* | qrcode.react, @zxing/library, react-webcam |

| \*\*HTTP Client\*\* | Axios |

| \*\*Icons\*\* | Lucide React, React Icons |

| \*\*UI Components\*\* | Headless UI |

| \*\*File Operations\*\* | file-saver |

| \*\*Development\*\* | ESLint, TypeScript types |

| \*\*Build Tool\*\* | Vite with React plugin |











