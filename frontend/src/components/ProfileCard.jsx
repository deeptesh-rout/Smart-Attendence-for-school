import React from "react";

const ProfileCard = ({ name, profilePic, isNewUser }) => {
  return (
    <div className="profile-card bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-2xl p-6 flex items-center gap-4 transition-all">
      <img
        src={profilePic || "/default-avatar.png"}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
      />
      <div>
        <h2 className="text-2xl font-bold text-white">Hi, {name || "User"}!</h2>
        <p className="text-md text-gray-200">Let’s Optimize Your Events.</p>
      </div>
    </div>
  );
};

export default ProfileCard;
