import React, { useState } from "react";
import {
  BellDot,
  BellDotIcon,
  MenuIcon,
  MessageSquareDot,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate=useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  
  const logout = () => {
    navigate('/login')
    localStorage.clear()
  }

  return (
    <nav className="bg-white shadow-lg rounded-2xl">
      <div className=" flex  items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center gap-2">
          <span
            style={{ fontFamily: "sans-serif" }}
            className="text-3xl font-bold text-teal-700"
          >
            Teemify
          </span>
        </Link>

        <div className="hidden md:flex bg-[#f7f7f7] items-center px-3 py-2 rounded-full shadow-inner w-[30%]">
          <Search className="text-gray-600 " />

          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent text-sm px-2 w-full"
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ul className="flex space-x-4 font-medium text-gray-700">
            <li>
              <MessageSquareDot className="cursor-pointer" />
            </li>
            <li>
              <BellDot className="cursor-pointer" />
            </li>
          </ul>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex cursor-pointer items-center gap-2 px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-50"
            >
              <img
                src="https://freesvg.org/img/abstract-user-flat-3.png"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">{user.user_name}</span>
              {dropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-500 " />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-5 w-full bg-white border overflow-hidden border-gray-200 rounded-lg shadow-md z-50">
                <ul className="text-sm text-gray-700 ">
                  <li>
                    <button
                      className="w-full cursor-pointer flex items-center justify-between  px-4 py-2 hover:bg-gray-100"
                      onClick={logout}
                    >
                      <span>Logout</span>
                      <LogOut className="w-5 h-5 text-gray-600" />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <div className="flex items-center justify-between  px-4 py-2 rounded-full bg-[#f7f7f7] shadow-inner w-full">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://freesvg.org/img/abstract-user-flat-3.png"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">Hiba</span>
            </div>
            <button
              onClick={logout}
              className="text-sm text-gray-600 font-medium hover:underline cursor-pointer"
            >
              Logout
            </button>
          </div>

          <ul className="flex flex-col space-y-3 font-medium text-gray-700">
            <li className="flex items-center  cursor-pointer justify-between px-4 py-2 rounded-full bg-[#f7f7f7] shadow-inner w-full">
              <span>Messages</span>
              <MessageSquareDot className="w-6 h-6 flex-shrink-0 text-gray-600" />
            </li>
            <li className="flex items-center  cursor-pointer justify-between px-4 py-2 rounded-full bg-[#f7f7f7] shadow-inner w-full">
              <span>Notifications</span>
              <BellDotIcon className="w-6 h-6 flex-shrink-0 text-gray-600 " />
            </li>
          </ul>

          <div className="flex items-center px-4 py-2 rounded-full bg-[#f7f7f7] shadow-inner w-full">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent text-sm flex-grow"
            />
            <Search className="w-6 h-6 flex-shrink-0 text-gray-600" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
