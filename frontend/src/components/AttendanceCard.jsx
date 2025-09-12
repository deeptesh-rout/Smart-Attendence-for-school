import React from "react";

const AttendanceCard = ({ event }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-4 transform transition hover:scale-102 hover:bg-white/20 text-gray-300">
      <h3 className="text-lg font-semibold text-white">{event.name}</h3>
      <p className="text-gray-400">{event.date} at {event.time}</p>
    </div>
  );
};

export default AttendanceCard;