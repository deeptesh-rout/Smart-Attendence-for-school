import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", 
  headers: { "Content-Type": "application/json" },
});

// Automatically attach authentication token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("🔑 Using token for request:", config.url);
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("⚠️ No authentication token found for request:", config.url);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle authentication errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized or 403 Forbidden responses
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log("🚨 Authentication error:", error.response.status, error.response.data);
      localStorage.removeItem("token");
      
      // If you want to automatically redirect to login page:
      // window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Function to register a new user
export const signup = async (userData) => {
  try {
    console.log("📤 Sending signup request:", userData);
    const response = await API.post("/auth/signup", userData);
    console.log("✅ Signup response:", response.data);
    
    // Store token if it's in the response
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("🔑 Token saved after signup");
    }
    
    return response.data;
  } catch (error) {
    console.error("❌ Signup error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Signup failed" };
  }
};

// Function to log in a user
export const login = async (userData) => {
  try {
    console.log("📤 Sending login request:", userData);
    const response = await API.post("/auth/login", userData);
    console.log("✅ Login response:", response.data);
    
    // Store token if it's in the response
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("🔑 Token saved after login");
    } else {
      console.warn("⚠️ No token received in login response");
    }
    
    return response.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

// Function to log out a user
export const logout = () => {
  localStorage.removeItem("token");
  console.log("🚪 User logged out, token removed");
 
};

// Function to authenticate with Google OAuth
export const googleAuth = () => {
  console.log("🔗 Redirecting to Google OAuth...");
  window.location.href = "http://localhost:3000/api/auth/google";
};

// Function to handle OAuth callback and token storage
export const handleOAuthCallback = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    console.log("🔑 OAuth token saved");
    return true;
  }
  return false;
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; 
};

// Function to fetch user profile
export const fetchUserProfile = async () => {
  try {
    console.log("📤 Fetching user profile...");
    const response = await API.get("/auth/user/profile");
    console.log("✅ User profile fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    throw error;
  }
};

// Function to fetch all events (Admin Dashboard)
export const getEvents = async () => {
  try {
    console.log("📤 Fetching events...");
    const response = await API.get("/events/all");
    console.log("✅ Events fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching events:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch events" };
  }
};

// Function to create a new event (Admin)
export const createEvent = async (eventData) => {
  try {
    console.log("📤 Creating event:", eventData);
    const response = await API.post("/events/create", eventData);
    console.log("✅ Event created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating event:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to create event" };
  }
};

// Function to mark attendance (User)
export const checkInAttendance = async (eventId, userId) => {
  try {
    console.log("📤 Marking attendance for:", { eventId, userId });
    const response = await API.post("/attendance/check-in", { eventId, userId });
    console.log("✅ Attendance marked:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Attendance error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to mark attendance" };
  }
};