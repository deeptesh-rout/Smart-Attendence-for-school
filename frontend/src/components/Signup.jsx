import { useState } from "react";
import { User, Mail, LockKeyhole, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/api"; // signup function

export default function Signup({ className, handleClick }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(null);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate phone number format (10 digits)
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Validate password (at least 6 characters)
  const validatePassword = (password) => password.length >= 6;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return setError("Invalid email format.");
    if (!validatePhoneNumber(phoneNumber))
      return setError("Invalid phone number.");
    if (!validatePassword(password))
      return setError("Password must be at least 6 characters.");
    if (!role) return setError("Please select a role.");

    try {
      const userData = { username, email, password, phoneNumber, role };

      console.log("📤 Final signup data:", userData);

      const response = await signup(userData);
      console.log("✅ Signup successful:", response);

      navigate("/auth?login=true"); 
    } catch (error) {
      console.error("❌ Signup error:", error);

      if (error.errors) {
        console.error("⚠ Detailed backend errors:", error.errors); 
        setError(JSON.stringify(error.errors)); 
      } else {
        setError(error.message || "Signup failed");
      }
    }
  };

  return (
    <div
      className={`p-4 md:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto ${className}`}
    >
      <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-6 md:mb-10">
        Sign Up
      </h2>
      <form
        onSubmit={handleSignup}
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-4 md:p-10"
      >
        {/* Username Input */}
        <div className="mb-4 relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-300"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="email"
            className="w-full pl-10 pr-4 py-2 bg-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-300"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Phone Number Input */}
        <div className="mb-4 relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="tel"
            className="w-full pl-10 pr-4 py-2 bg-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-300"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">Invalid phone number.</p>
          )}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <select
            className="w-full px-4 py-2 bg-white/30 rounded-xl focus:outline-none text-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" className="bg-indigo-900">
              Select your role
            </option>
            <option value="admin" className="bg-indigo-900">
              Admin
            </option>
            <option value="user" className="bg-indigo-900">
              User
            </option>
          </select>
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="password"
            className="w-full pl-10 pr-4 py-2 bg-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-300"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold mb-4 py-2 rounded-lg text-lg hover:bg-indigo-500 transition duration-300 cursor-pointer"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center mb-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Google Signup Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border-md py-2 rounded-lg bg-white/30 hover:bg-white/50 transition duration-300 cursor-pointer text-white"
        >
          <img
            className="w-6 h-6"
            src="https://img.icons8.com/?size=100&id=17949&format=png&color=FFFFFF"
            alt="Google Logo"
          />
          Sign Up with Google
        </button>

        {/* Login Link */}
        <p className="text-center font-medium mt-2 md:hidden text-white">
          Already have an account?{" "}
          <a
            onClick={handleClick}
            className="text-indigo-500 font-semibold cursor-pointer hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
