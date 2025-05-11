import React from "react";
import { Link } from "react-router-dom";
import Notifications from "../components/Notifications";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-3 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="text-xl font-semibold">
        <Link to="/">
          <span className="block leading-5">Creator</span>
          <span className="block leading-5">collab</span>
        </Link>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex space-x-8 text-sm">
        <Link to="/deals" className="hover:underline">Find Deals</Link>
        <Link to="/brand/adddeal" className="hover:underline">Make deals</Link>
        <Link to="/community" className="hover:underline">Community</Link>
        <Link to="/faq" className="hover:underline">FAQ</Link>
      </div>

      {/* Right: Location + Notifications + MacOS-like dots */}
      <div className="flex items-center space-x-4">
        <span className="text-xs">Roorkee, India</span>
        <Notifications />
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
