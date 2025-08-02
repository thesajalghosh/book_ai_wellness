import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("authToken");

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-black px-6 py-4 flex items-center justify-end">
      <div className="flex space-x-3 items-center">
        {!token ? (
          <>
            {location.pathname !== "/login" && (
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
            {location.pathname !== "/register" && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={handleRegister}
              >
                Register
              </button>
            )}
          </>
        ) : (
          <>
            <FaUserCircle
              size={28}
              className="cursor-pointer hover:text-gray-600"
              onClick={handleProfile}
              title="Profile"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
