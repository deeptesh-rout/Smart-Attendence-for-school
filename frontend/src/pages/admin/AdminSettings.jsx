import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const AdminSettings = () => {
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
            AdminSettings
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto mt-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 md:p-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">Admin AdminSettings</h2>

            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Profile AdminSettings</h3>
                <p className="text-gray-300 mb-4">Manage your profile AdminSettings.</p>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg">
                  Edit Profile
                </button>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Account AdminSettings</h3>
                <p className="text-gray-300 mb-4">Manage your account AdminSettings.</p>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg">
                  Edit Account
                </button>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Notification AdminSettings</h3>
                <p className="text-gray-300 mb-4">Manage your notification AdminSettings.</p>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg">
                  Edit Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;