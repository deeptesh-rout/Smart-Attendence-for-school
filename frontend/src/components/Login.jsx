import { useState, useRef } from "react";
import { Mail, Phone, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api"; 
import { useAuth } from "../context/AuthContext"; 

export default function Login({ className, handleClick }) {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password, phoneNumber };
      const response = await login(userData);

      if (response.token && response.user) {
        loginUser(response.user, response.token); 

        // Redirect based on role
        if (response.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.user.role === "user") {
          navigate("/user-dashboard");
        } else {
          navigate("/auth"); // Fallback (unauthorized role)
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleChange = (value) => {
    setPhoneNumber(value);
    setIsValid(validatePhoneNumber(value));
  };

  return (
    <div className={`p-8 w-full max-w-sm md:max-w-md lg:max-w-lg ${className}`}>
      <h2 className="text-4xl font-bold text-center text-white mb-10">Login</h2>
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 md:p-10"
      >
        {/* Email Input */}
        <div className="mb-4">
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border-md bg-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-300"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <div className="relative w-full">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="tel"
              className="w-full pl-10 pr-4 py-2 border-md bg-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-300"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => handleChange(e.target.value)}
              required
            />
          </div>
          {!isValid && <p className="text-red-500 text-sm mt-1">Please enter a valid phone number.</p>}
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <div className="relative w-full">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border-md bg-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Forgot Password */}
        <div className="flex justify-between items-center mb-4">
          <button type="button" className="text-indigo-500 font-normal hover:underline text-md cursor-pointer">
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold mb-4 py-2 rounded-lg text-lg hover:bg-indigo-500 transition duration-300 cursor-pointer"
        >
          Login
        </button>

        {/* OR Divider */}
        <div className="flex items-center justify-center mb-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Google Login (Optional) */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border-md py-2 rounded-lg bg-white/30 transition duration-300 cursor-pointer hover:bg-white/50 text-white"
        >
          <img
            className="w-6 h-6"
            src="https://img.icons8.com/?size=100&id=17949&format=png&color=FFFFFF"
            alt="Google Logo"
          />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-center font-medium mt-2 md:hidden text-white">
          Don't have an account?{" "}
          <a onClick={handleClick} className="text-indigo-500 font-semibold cursor-pointer hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}