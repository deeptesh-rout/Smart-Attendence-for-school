import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import QRScanner from "../../components/QRScanner";
import FaceRecognition from "../../components/FaceRecognition";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const UserScanAttendance = () => {
  const { user } = useAuth(); // Get user context
  const userId = user?.id; // Extract user ID

  const [qrVerified, setQrVerified] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg-pattern.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.9, 
      }}
    >
      <div className="relative z-10 p-6 md:p-10">
        <Header toggleSidebar={toggleSidebar} />
        <div ref={sidebarRef}>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex flex-col justify-center items-center text-center w-full max-w-md mx-auto mt-20">
          <AnimatePresence mode="wait">
            {!qrVerified ? (
              <motion.div
                key="qr"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <QRScanner onSuccess={() => setQrVerified(true)} userId={userId} />
              </motion.div>
            ) : !faceVerified ? (
              <motion.div
                key="face"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FaceRecognition onSuccess={() => setFaceVerified(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-8 px-10 rounded-lg shadow-2xl">
                  <p className="text-4xl font-extrabold mb-6 animate-pulse">
                    Attendance Marked Successfully
                  </p>
                  <button
                    className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg"
                    onClick={() => navigate("/user-dashboard")}
                  >
                    Go to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserScanAttendance;
