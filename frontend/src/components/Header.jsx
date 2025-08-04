import React from 'react';
import { Search, Phone, ShoppingCart, Heart, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <div className="w-full">
      {/* Top promotional banner */}
      <div className="bg-gray-100 text-center py-2 text-sm">
        <span className="text-gray-700">Why Pay More? Prepay & Enjoy </span>
        <span className="text-red-600 font-semibold">5% off</span>
        <span className="text-gray-700"> Off Anywhere in Pakistan! </span>
        
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top section with logo, search, and contact */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-red-600">AUTEX</span>
                <span className="text-green-600">LINE</span>
                <span className="text-xs text-gray-500 ml-1">.PK</span>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contact and user actions */}
            <div className="flex items-center space-x-6">
              {/* Phone number */}
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-gray-700 font-medium">0312-0339999</span>
              </div>

              {/* Customer Register and Login buttons */}
              <div className="flex items-center space-x-3">
                <a 
                  href="/signup" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Register
                </a>
                <a 
                  href="/login" 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Login
                </a>
              </div>

              {/* User actions */}
              
            </div>
          </div>

          {/* Navigation section */}
          <div className="border-t border-gray-200">
            <div className="flex items-center justify-between py-3">
              {/* Shop by Category button */}
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors">
                <Menu className="w-4 h-4" />
                <span className="font-medium">Shop by Category</span>
              </button>

              {/* Navigation links */}
              <nav className="flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">HOME</a>
                <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">ABOUT</a>
                <a href="/inventory" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">INVENTORY</a>
                <a href="/auto-parts" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">AUTO PARTS</a>
                <a href="/auctions" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">AUCTIONS</a>
                <a href="/buy-from-stock" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">HOW TO BUY</a>
                <a href="/inquiry" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">INQUIRY</a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;