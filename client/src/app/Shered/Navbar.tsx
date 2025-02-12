'use client'

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    return (
        <nav className="bg-amber-700 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <span>Logo</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg text-white font-bold">
          <li><a href="#" className="hover:text-gray-300">Home</a></li>
          <Link href='/users'>Users</Link>
          <li><a href="#" className="hover:text-gray-300">Webbook</a></li>
        </ul>
        <div className="text-white font-bold text-xl">
          <span>Login</span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-blue-700 text-white p-4 space-y-4">
          <li><a href="#" className="block">Home</a></li>
          <li><a href="#" className="block">All Users</a></li>
          <li><a href="#" className="block">Add User</a></li>
          <li><a href="#" className="block">Webbook</a></li>
        </ul>
      )}
    </nav>
    );
};

export default Navbar;