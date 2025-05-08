import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-3 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="text-xl font-semibold">
        <span className="block leading-5">Influencer</span>
        <span className="block leading-5">ready</span>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex space-x-8 text-sm">
        <a href="#" className="hover:underline">Find Deals</a>
        <a href="#" className="hover:underline">Make deals</a>
        <a href="#" className="hover:underline">Community</a>
        <a href="#" className="hover:underline">FAQ</a>
      </div>

      {/* Right: Location + MacOS-like dots */}
      <div className="flex items-center space-x-4">
        <span className="text-xs">Roorkee, India</span>
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
