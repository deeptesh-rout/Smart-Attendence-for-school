import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceCard from "../../components/AttendanceCard"; 
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const UserHistory = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sample past event data
  const pastEvents = [
    { id: 1, name: "Tech Conference 2025", date: "Feb 10, 2025", time: "10:00 AM" },
    { id: 2, name: "AI Workshop", date: "Feb 15, 2025", time: "2:00 PM" },
  ];

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
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div ref={sidebarRef}>
          <Sidebar isOpen={sidebarOpen} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Attendance History</h2>
          <div className="grid gap-4">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <AttendanceCard 
                  key={event.id} 
                  event={event} 
                  className="bg-white/10 p-4 rounded-lg shadow-md transform transition hover:scale-102 hover:bg-white/20 text-gray-300"
                />
              ))
            ) : (
              <p>No past events found.</p>
            )}
          </div>

          {/* Back Button */}
          <button
            className="mt-6 bg-gray-600 text-white py-3 px-6 rounded-lg text-lg w-full transition-transform hover:scale-102 hover:bg-gray-500 shadow-lg"
            onClick={() => navigate("/user-dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;