import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, role }) => {
  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex flex-col justify-center h-full p-4">
          <ul className="space-y-4">
            {role === "admin" ? (
              <>
                <li>
                  <Link to="/admin-dashboard" className="text-lg hover:text-blue-400" onClick={toggleSidebar}>
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin-create-event" className="text-lg hover:text-blue-400" onClick={toggleSidebar}>
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link to="/admin-my-events" className="text-lg hover:text-blue-400" onClick={toggleSidebar}>
                    My Events
                  </Link>
                </li>
                <li>
                  <Link to="/admin-attendance-records" className="text-lg hover:text-blue-400" onClick={toggleSidebar}>
                    Attendance Records
                  </Link>
                </li>
                <li>
                  <Link to="/admin-settings" className="text-lg hover:text-blue-400" onClick={toggleSidebar}>
                    Settings
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/user-dashboard" className="text-lg hover:text-blue-400" onClick={toggleSidebar}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/user-scan-attendance" className="text-lg hover:text-blue-400" onClick={toggleSidebar}>
                    Mark Attendance
                  </Link>
                </li>
                <li>
                  <Link to="/user-history" className="text-lg hover:text-blue-400" onClick={toggleSidebar}>
                    Attendance History
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;