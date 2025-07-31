import React from 'react'
import { BiChevronUp } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import Logo from "../Images/logo.svg"
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Check for auth token
  const token = localStorage.getItem("authToken")


  const handleLogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/register")
  }

  const handleProfile = () => {
    navigate("/profile") // or your profile/dashboard route
  }
  const handleLogout = ()=> {
    localStorage.clear()
    navigate("/")
  }

  return (
    <nav className="bg-black rounded-t-2xl text-white px-6 py-4 flex items-center justify-between shadow-lg">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="h-[50px] w-[140px]" />
      </div>

      {/* Middle: Navigation */}
      <div className="flex items-center space-x-6 text-sm">
        <a href="#" className="hover:underline">Home</a>
        <div className="flex items-center space-x-1 cursor-pointer hover:underline">
          <span>Solutions</span>
          <BiChevronUp className="w-4 h-4" />
        </div>
        <a href="#" className="hover:underline">Marketplace</a>
      </div>

      {/* Right: Conditional Buttons */}
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
            className="cursor-pointer hover:text-gray-300"
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
  )
}

export default Header
