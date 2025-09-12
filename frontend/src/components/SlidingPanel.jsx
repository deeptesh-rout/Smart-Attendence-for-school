import React, { useRef, useEffect } from 'react';

const SlidingPanel = ({ login, handleShift }) => {
  const elRef = useRef(null);

  useEffect(() => {
    if (elRef.current) {
      if (login) {
        elRef.current.style.transform = "translateX(0)";
      } else {
        elRef.current.style.transform = "translateX(-100%)";
      }
    }
  }, [login]);

  return (
    <div 
      ref={elRef} 
      className={`hidden md:flex w-1/2 absolute h-full top-0 z-10 overflow-hidden transition-transform duration-500 ${login ? "rounded-r-[125px]" : "rounded-l-[125px]"}`}
    >
      <div className="flex bg-gradient-to-r from-indigo-600 to-purple-400 flex-col justify-center items-center text-white p-6 h-full w-full">
        <h1 className="text-3xl font-bold">{login ? "Hello, Friend!" : "Welcome Back!"}</h1>
        <p className="text-center text-md mt-2 max-w-xs">{login ? "Register with your personal details to use all site features." : "Enter your personal details to use all of site features."}</p>
        <button
          className="mt-5 border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-500 cursor-pointer transition"
          onClick={handleShift}
        >
          {login ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default SlidingPanel;