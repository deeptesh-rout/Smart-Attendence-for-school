import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const AdminProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white relative overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #0f172a, #1e293b)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 p-6 md:p-10">
        <Header toggleSidebar={toggleSidebar} />
        <div ref={sidebarRef}>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex flex-col justify-center items-center text-center w-full max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl font-bold mb-6 text-blue-500 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Admin Profile
          </h1>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full transform transition-transform hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex justify-center mb-6">
              <img
                src="/admin-avatar.png"
                alt="Admin Profile"
                className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-400">Admin Information</h2>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm font-bold mb-2">Admin Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value="Admin Name"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value="admin@example.com"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-400">Account Settings</h2>
                <button
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-purple-500 shadow-lg mb-4"
                  onClick={() => navigate("/admin-dashboard")}
                >
                  View Dashboard
                </button>
                <button
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-purple-500 shadow-lg"
                  onClick={() => navigate("/admin-manage-users")}
                >
                  Manage Users
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-400">System Controls</h2>
                <button
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg mb-4"
                  onClick={() => navigate("/admin-manage-events")}
                >
                  Manage Events
                </button>
                <button
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg"
                  onClick={() => navigate("/admin-view-logs")}
                >
                  View Logs
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-400">Security</h2>
                <button
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-red-500 shadow-lg mb-4"
                  onClick={() => navigate("/change-password")}
                >
                  Change Password
                </button>
                <button
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-red-500 shadow-lg"
                  onClick={() => navigate("/logout")}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;