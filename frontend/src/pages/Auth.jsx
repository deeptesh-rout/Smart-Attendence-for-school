import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialLoginState = queryParams.get('login') !== 'false';
  const [login, setLogin] = useState(initialLoginState);
  const elRef = useRef(null);
  const { loginUser } = useAuth();
  
  // State to handle success message visibility
  const [showSuccessMessage, setShowSuccessMessage] = useState({ type: "", message: "" });

  useEffect(() => {
    if (elRef.current) {
      elRef.current.style.transform = login ? "translateX(100%)" : "translateX(0%)";
      elRef.current.style.width = "50%";
    }
  }, [login]);

  useEffect(() => {
    navigate(`?login=${login}`);
  }, [login, navigate]);

  function handleShift() {
    setLogin((prev) => !prev);
  }

  const handleLogin = async (email, password) => {
    const mockLogin = (email, password) => {
      if (email === "admin@example.com" && password === "admin") {
        return { role: "admin", token: "admin-token", user: { email, role: "admin" } };
      } else if (email === "user@example.com" && password === "user") {
        return { role: "user", token: "user-token", user: { email, role: "user" } };
      } else {
        throw new Error("Invalid credentials");
      }
    };

    try {
      const { role, token, user } = mockLogin(email, password);
      loginUser(user, token);

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "user") {
        navigate("/user-dashboard");
      }
      
      // Show success message on successful login
      setShowSuccessMessage({ type: "login", message: "Login Successful!" });
      setTimeout(() => setShowSuccessMessage({ type: "", message: "" }), 3000);
      
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleSignupSuccess = () => {
    // Show success message on successful signup
    setShowSuccessMessage({ type: "signup", message: "Signup Successful!" });
    setTimeout(() => setShowSuccessMessage({ type: "", message: "" }), 3000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-900"
      style={{
        backgroundImage: "url('bg-pattern.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Success message */}
      {showSuccessMessage.message && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {showSuccessMessage.message}
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl w-full max-w-4xl h-auto overflow-hidden relative">
        <div className='flex flex-row h-auto'>
          <Login 
            className={`flex-1 duration-700 ${login ? "block" : "hidden md:block md:opacity-0"}`} 
            handleClick={handleShift} 
            handleLogin={handleLogin} 
          />
          <Signup 
            className={`flex-1 duration-700 ${login ? "hidden md:block md:opacity-0" : "block"}`} 
            handleClick={handleShift} 
            onSignupSuccess={handleSignupSuccess} 
          />
        </div>

        <div ref={elRef} className={`hidden md:block absolute h-full top-0 overflow-hidden ${login ? "rounded-l-[125px]" : "rounded-r-[125px]"} duration-500`} style={{ width: "50%", transform: "translateX(100%)" }}>
          <div className={`flex bg-gradient-to-r from-indigo-600 to-purple-400 flex-col justify-center items-center text-white p-6 h-full w-full absolute`}>
            <h1 className="text-3xl font-bold">{login ? "Welcome Back!" : "Hello, Friend!"}</h1>
            <p className="text-center text-md mt-2 w-70">{login ? "Enter your personal details to use all site features." : "Register with your personal details to use all site features."}</p>
            <button
              className="mt-5 border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-500 cursor-pointer transition"
              onClick={handleShift}
            >
              {login ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
