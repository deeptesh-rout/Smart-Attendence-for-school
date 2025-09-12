import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <Link to="/auth" className="text-indigo-500 hover:underline">
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;