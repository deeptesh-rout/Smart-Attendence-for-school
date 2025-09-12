// src/components/EventCard.jsx
import React from "react";

const EventCard = ({ title, date, time, status }) => {
  const statusColors = status === "Upcoming" ? "bg-green-500" : "bg-gray-500";

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{date} • {time}</p>
      </div>
      <span className={`text-white py-1 px-3 rounded-full ${statusColors}`}>
        {status}
      </span>
    </div>
  );
};

export default EventCard;
