import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="admin" />

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-10">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} dashboardUrl="/admin-dashboard" />

        {/* Greeting */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 text-center 
        text-white font-extrabold text-3xl md:text-4xl lg:text-5xl 
        animate-fadeIn drop-shadow-lg mt-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to the Admin Dashboard!
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg flex items-center justify-center gap-2"
            onClick={() => navigate("/admin-create-event")}
          >
            <i className="fas fa-calendar-plus"></i> Create Event
          </button>
          <button
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-green-500 shadow-lg flex items-center justify-center gap-2"
            onClick={() => navigate("/admin-attendance-records")}
          >
            <i className="fas fa-file-alt"></i> View Attendance Records
          </button>
          <button
            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-purple-500 shadow-lg flex items-center justify-center gap-2"
            onClick={() => navigate("/admin-my-events")}
          >
            <i className="fas fa-calendar-alt"></i> My Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;