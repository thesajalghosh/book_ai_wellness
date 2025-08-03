import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const token = localStorage.getItem("access-token");

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleProfile = () => {
    navigate("/profile-page");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {pathname === "/" && (
        <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-black px-6 py-4 flex items-center justify-end">
          <div className="flex space-x-4 items-center">
            {!token ? (
              <>
                {location.pathname !== "/login" && (
                  <button
                    onClick={handleLogin}
                    className="px-5 py-2 rounded-full border border-gray-300 bg-white text-black hover:bg-gray-200 transition-all duration-200 font-medium shadow-sm"
                  >
                    Login
                  </button>
                )}
                {location.pathname !== "/register" && (
                  <button
                    onClick={handleRegister}
                    className="px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm"
                  >
                    Register
                  </button>
                )}
              </>
            ) : (
              <>
                <FaUserCircle
                  size={28}
                  className="cursor-pointer hover:text-white transition text-white"
                  onClick={handleProfile}
                  title="Profile"
                />
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
