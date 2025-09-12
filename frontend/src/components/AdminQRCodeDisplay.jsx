import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminQRCodeDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || {};

  const [eventCode, setEventCode] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(20);

  useEffect(() => {
    if (!event) {
      navigate("/admin-my-events");
      return;
    }

    const generateCode = () => {
      const newCode = `EVENT-${Date.now()}`;
      setEventCode(newCode);
      setTimeRemaining(20);
    };

    generateCode();

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === 1) {
          generateCode();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [event, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-indigo-500">{event.name}</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <QRCodeCanvas value={eventCode} size={300} />
      </div>
      <p className="text-gray-300 mt-4">QR Code refreshes in {timeRemaining} seconds</p>
      <button
        onClick={() => navigate("/admin-my-events")}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg"
      >
        Back to My Events
      </button>
    </div>
  );
};

export default AdminQRCodeDisplay;