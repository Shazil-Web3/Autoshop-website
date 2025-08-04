"use client";
import React, { useState } from 'react';
import { Search, Phone, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import FilterModal from './FilterModal';

const Header = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Top promotional banner */}
      <div className="bg-gray-100 text-center py-2 text-xs sm:text-sm px-2">
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
              <Link href="/" className="text-xl sm:text-2xl font-bold hover:opacity-80 transition-opacity">
                <span className="text-red-600">AUTEX</span>
                <span className="text-green-600">LINE</span>
                <span className="text-xs text-gray-500 ml-1">.PK</span>
              </Link>
            </div>

            {/* Search bar - hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-black"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contact and user actions */}
            <div className="flex items-center space-x-2 sm:space-x-6">
              {/* Phone number - hidden on mobile */}
              <div className="hidden sm:flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-gray-700 font-medium text-sm">0312-0339999</span>
              </div>

              {/* Customer Register and Login buttons - hidden on mobile */}
              <div className="hidden sm:flex items-center space-x-3">
                <a 
                  href="/signup" 
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Register
                </a>
                <a 
                  href="/login" 
                  className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                >
                  Login
                </a>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-black"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation section */}
          <div className="border-t border-gray-200">
            <div className="flex items-center justify-between py-3">
              {/* Shop by Category button */}
              <button 
                onClick={() => setIsFilterModalOpen(true)}
                className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors text-sm"
              >
                <Menu className="w-4 h-4" />
                <span className="font-medium hidden sm:inline">Shop by Category</span>
                <span className="font-medium sm:hidden">Categories</span>
              </button>

              {/* Navigation links - hidden on mobile */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">HOME</a>
                <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">ABOUT</a>
                <a href="/inventory" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">INVENTORY</a>
                <a href="/inventory/parts" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">AUTO PARTS</a>
                <a href="/auctions" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">AUCTIONS</a>
                <a href="/buy-from-stock" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">HOW TO BUY</a>
                <a href="/inquiry" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">INQUIRY</a>
              </nav>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                {/* Mobile contact info */}
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-gray-700 font-medium text-sm">0312-0339999</span>
                </div>
                
                {/* Mobile auth buttons */}
                <div className="flex space-x-3 pb-2 border-b border-gray-200">
                  <a 
                    href="/signup" 
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center text-sm"
                  >
                    Register
                  </a>
                  <a 
                    href="/login" 
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-center text-sm"
                  >
                    Login
                  </a>
                </div>

                {/* Mobile navigation */}
                <nav className="space-y-2">
                  <a href="/" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">HOME</a>
                  <a href="/about" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">ABOUT</a>
                  <a href="/inventory" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">INVENTORY</a>
                  <a href="/inventory/parts" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">AUTO PARTS</a>
                  <a href="/auctions" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">AUCTIONS</a>
                  <a href="/buy-from-stock" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">HOW TO BUY</a>
                  <a href="/inquiry" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">INQUIRY</a>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
      />
    </div>
  );
};

export default Header;