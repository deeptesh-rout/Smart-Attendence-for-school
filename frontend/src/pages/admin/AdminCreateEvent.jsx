import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { createEvent } from "../../utils/api"; 

const AdminCreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState(""); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleCreateEvent = async () => {
    try {
      const eventData = { title: eventName, date: eventDate, time: eventTime, location: eventLocation };
      await createEvent(eventData);
      navigate("/admin-my-events", { state: { successMessage: "Event created successfully!" } });
    } catch (error) {
      setError(error.message || "Failed to create event");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current) {
        inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            Create a New Event
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-md mx-auto mt-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 md:p-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">Event Details</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <label className="block text-gray-300 mb-2" htmlFor="eventName">Event Name</label>
            <input
              id="eventName"
              type="text"
              placeholder="Enter Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-300 placeholder-gray-500"
              ref={inputRef}
            />

            <label className="block text-gray-300 mb-2" htmlFor="eventDate">Set Event Date</label>
            <input
              id="eventDate"
              type="date"
              placeholder="Event Date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-300 placeholder-gray-200"
            />

            <label className="block text-gray-300 mb-2" htmlFor="eventTime">Event Time</label>
            <input
              id="eventTime"
              type="time"
              placeholder="Event Time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-300 placeholder-gray-200"
            />

            <label className="block text-gray-300 mb-2" htmlFor="eventLocation">Event Location</label>
            <input
              id="eventLocation"
              type="text"
              placeholder="Enter Event Location"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-300 placeholder-gray-500"
            />

            <button 
              onClick={handleCreateEvent} 
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateEvent;