# 📌 InstaMark – Smart Attendance System 🚀  
[![Made with Love](https://img.shields.io/badge/Made%20with-Love-red.svg)](#)  
[![Node.js](https://img.shields.io/badge/Backend-Node.js-brightgreen)](#)  
[![React](https://img.shields.io/badge/Frontend-React-blue)](#)  

## 📢 About InstaMark  

**InstaMark** is a **web-based attendance tracking system** designed to simplify event-based attendance management. It eliminates manual errors using **Dynamic QR Codes** and provides **secure and efficient check-ins** for **hackathons, workshops, corporate events, and educational sessions**.  

With **real-time attendance tracking**, InstaMark enables **organizers, instructors, and event managers** to manage participant check-ins **seamlessly and securely**.  

---

## 🚀 Features  

✅ **📅 Event-Based Attendance** – Create and manage attendance for different events.  
✅ **📸 Dynamic QR Code System** – Auto-refreshing QR codes prevent unauthorized check-ins.  
✅ **🔑 Role-Based Access Control (RBAC)** – Secure admin and participant roles.  
✅ **📊 Real-Time Attendance Insights** – Instantly view and export attendance reports.  
✅ **📜 Attendance Logs** – Maintain a history of all attendance records for future reference.  
✅ **🔗 Secure Login & Authentication** – Ensures only authorized users can access the system.  
✅ **📨 Email Notifications** – Send automated attendance confirmations and reminders.  
✅ **📥 Data Export** – Download attendance data in CSV format.  

---

## 🛠 Tech Stack  

| **Technology** | **Used For** |
|---------------|-------------|
| **React.js** | Frontend UI |
| **Tailwind CSS** | Styling |
| **Node.js & Express.js** | Backend API |
| **MongoDB** | Database |
| **Passport.js & JWT** | Authentication |
| **QR Code Generator API** | Dynamic QR Code System |

---

# Clone the Repository  
git clone --recurse-submodules https://github.com/Suryakantapani/InstaMark-Smart_Attendance-.git

cd InstaMark-Smart_Attendance-

# Install Dependencies  
cd frontend

npm install

cd ../backend

npm install

# Set Up Environment Variables  
# Backend (.env)
 
MONGO_URI=<your-mongo-uri-here>

PORT=3000

JWT_SECRET=<your-jwt-secret-here>

GOOGLE_CLIENT_ID=<your-google-client-id-here>

GOOGLE_CLIENT_SECRET=<your-google-client-secret-here>

SESSION_SECRET=<your-session-secret-here>

QR_CODE_EXPIRY=your_expiry_time

# Run the Backend  
cd backend

npm start

# Run the Frontend  
cd frontend

npm run dev

# Access the App  
http://localhost:3000
