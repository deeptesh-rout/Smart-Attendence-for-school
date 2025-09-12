import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaQrcode } from "react-icons/fa";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getEvents } from "../../utils/api"; 

const AdminMyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleGenerateQR = (event) => {
    try {
      navigate("/admin-qr-display", { state: { event } });
    } catch (error) {
      console.error("Error navigating to QR display:", error);
    }
  };

  const handleEditEvent = (event) => {
    try {
      navigate("/admin-edit-event", { state: { event } });
    } catch (error) {
      console.error("Error navigating to edit event:", error);
    }
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
            My Events
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto mt-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 md:p-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">Event List</h2>

            <div className="space-y-4">
              {events.length === 0 ? (
                <p className="text-gray-300 text-center">No events found.</p>
              ) : (
                events.map((event) => (
                  <div key={event._id} className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
                    <div className="flex-grow mb-4 md:mb-0">
                      <h2 className="text-xl md:text-2xl font-bold mb-2">{event.title}</h2>
                      <p className="text-gray-300 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                      <p className="text-gray-300 mb-4">Time: {event.time}</p>
                      <p className="text-gray-300 mb-4">Location: {event.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm md:text-lg transition-transform hover:scale-105 hover:bg-yellow-500 shadow-lg flex items-center"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleGenerateQR(event)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm md:text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg flex items-center"
                      >
                        <FaQrcode className="mr-2" /> Generate QR
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMyEvents;