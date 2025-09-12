import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QRCodeGenerator = ({ eventName }) => {
  const [eventCode, setEventCode] = useState("");
  const navigate = useNavigate();

  const handleGenerateQR = () => {
    if (!eventName) return alert("Enter event name");

    // Generate a unique event code
    const generatedCode = `EVENT-${Date.now()}`;
    setEventCode(generatedCode);

    // Navigate to QRCodeDisplay component
    navigate("/admin-qr-display", { state: { eventCode: generatedCode } });
  };

  return (
    <div className="bg-indigo-900 text-white p-1 rounded-lg shadow-lg">
      <button 
        onClick={handleGenerateQR} 
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg "
      >
        Generate QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;