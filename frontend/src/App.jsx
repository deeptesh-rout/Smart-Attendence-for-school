import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import UserDashboard from "./pages/user/UserDashboard";
import UserHistory from "./pages/user/UserHistory";
import UserScanAttendance from "./pages/user/UserScanAttendance";
import UserProfile from "./pages/user/UserProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCreateEvent from "./pages/admin/AdminCreateEvent";
import AdminAttendanceRecords from "./pages/admin/AdminAttendanceRecords";
import AdminQRCodeDisplay from "./components/AdminQRCodeDisplay";
import AdminMyEvents from "./pages/admin/AdminMyEvents";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from "./pages/admin/AdminProfile";
import Auth from "./pages/Auth";
import Logout from "./pages/Logout";
import Unauthorized from "./pages/Unauthorized";

// Role-Based Route Protection Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) return <Navigate to="/auth" />;
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 User Routes */}
        <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />} />
        <Route path="/user-history" element={<ProtectedRoute element={<UserHistory />} allowedRoles={["user"]} />} />
        <Route path="/user-scan-attendance" element={<ProtectedRoute element={<UserScanAttendance />} allowedRoles={["user"]} />} />
        <Route path="/user-profile" element={<ProtectedRoute element={<UserProfile />} allowedRoles={["user"]} />} />

        {/* 🔹 Admin Routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />
        <Route path="/admin-create-event" element={<ProtectedRoute element={<AdminCreateEvent />} allowedRoles={["admin"]} />} />
        <Route path="/admin-attendance-records" element={<ProtectedRoute element={<AdminAttendanceRecords />} allowedRoles={["admin"]} />} />
        <Route path="/admin-qr-display" element={<ProtectedRoute element={<AdminQRCodeDisplay />} allowedRoles={["admin"]} />} />
        <Route path="/admin-my-events" element={<ProtectedRoute element={<AdminMyEvents />} allowedRoles={["admin"]} />} />
        <Route path="/admin-settings" element={<ProtectedRoute element={<AdminSettings />} allowedRoles={["admin"]} />} />
        <Route path="/admin-profile" element={<ProtectedRoute element={<AdminProfile />} allowedRoles={["admin"]} />} />

        {/* Authentication */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/logout" element={<Logout />} />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;