import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional icons

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-pink-100 shadow-md px-6 py-3 flex justify-between items-center relative">
      {/* Brand */}
      <div className="text-2xl font-bold text-pink-700">
        <span className="text-pink-600">Skin</span>Theory
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-pink-800 font-medium items-center">
        <Link to="/" className="hover:text-pink-600 transition">
          Home
        </Link>
        <Link to="/login" className="hover:text-pink-600 transition">
          Login
        </Link>
        <Link to="/signup" className="hover:text-pink-600 transition">
          Signup
        </Link>
        <Link to="/productsection" className="hover:text-pink-600 transition">
          Products
        </Link>

        {/* Tips Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="hover:text-pink-600 transition">Tips</button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10 flex flex-col">
              <Link
                to="/tipsection"
                className="block w-full px-4 py-2 hover:bg-pink-100 text-sm"
              >
                Read Tips
              </Link>
              <Link
                to="/submittipsection"
                className="block w-full px-4 py-2 hover:bg-pink-100 text-sm"
              >
                Share Tips
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-md md:hidden z-20">
          <div className="flex flex-col px-6 py-4 text-pink-800 font-medium space-y-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
              Signup
            </Link>
            <Link to="/productsection" onClick={() => setMobileMenuOpen(false)}>
              Products
            </Link>

            {/* Tips Dropdown in Mobile */}
            <div className="border-t pt-2">
              <p className="font-semibold mb-1">Tips</p>
              <Link
                to="/tipsection"
                className="pl-2 py-1 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Read Tips
              </Link>
              <Link
                to="/submittipsection"
                className="pl-2 py-1 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Share Tips
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
