import React from 'react'
import { BiChevronUp } from 'react-icons/bi'
import Logo from "../Images/logo.svg"

const Header = () => {
  return (
   <nav className="bg-black rounded-t-2xl text-white px-6 py-4 flex items-center justify-between shadow-lg">
      {/* Left: Logo & Brand */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="h-[50px] w-[140px]" /> {/* Replace with actual logo path */}
   
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

      {/* Right: Contact Us Button */}
      <div>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
          Contact Us
        </button>
      </div>
    </nav>
  )
}

export default Header