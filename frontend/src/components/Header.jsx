"use client";
import React, { useState, useEffect } from 'react';
import { Search, Phone, ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import Link from 'next/link';
import FilterModal from './FilterModal';
import apiService from '../services/api';

const Header = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = apiService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    apiService.logout();
    setCurrentUser(null);
    window.location.href = '/';
  };

  const isDealerOrAgent = currentUser && ['dealer', 'agent'].includes(currentUser.role) && currentUser.status === 'approved';

  // Function to get the appropriate dashboard link based on user role
  const getDashboardLink = () => {
    if (!currentUser) return null;
    
    switch (currentUser.role) {
      case 'admin':
        return '/admin';
      case 'dealer':
        return '/dealer';
      case 'agent':
        return '/agent';
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink();

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

              {/* User actions */}
              <div className="hidden sm:flex items-center space-x-3">
                {currentUser ? (
                  <div className="flex items-center space-x-3">
                    {/* User info */}
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {currentUser.firstName} {currentUser.lastName}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {currentUser.role}
                      </div>
                    </div>
                    
                    {/* Dashboard link - updated to use role-based navigation */}
                    {dashboardLink && (
                      <Link
                        href={dashboardLink}
                        className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                      >
                        {currentUser.role === 'admin' ? 'Admin Panel' : 
                         currentUser.role === 'dealer' ? 'Dealer Dashboard' : 
                         currentUser.role === 'agent' ? 'Agent Dashboard' : 'Dashboard'}
                      </Link>
                    )}
                    
                    {/* Dealer/Agent specific links */}
                    {isDealerOrAgent && (
                      <>
                        {currentUser.role === 'dealer' && (
                          <Link
                            href="/submit-product-request"
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                          >
                            Submit Product
                          </Link>
                        )}
                        <Link
                          href={currentUser.role === 'dealer' ? '/my-product-requests' : '/my-invoices'}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                        >
                          {currentUser.role === 'dealer' ? 'My Requests' : 'My Invoices'}
                        </Link>
                      </>
                    )}
                    
                    {/* Logout button */}
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center space-x-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <a 
                      href="/signup" 
                      className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Sign Up
                    </a>
                    <a 
                      href="/login" 
                      className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      Login
                    </a>
                  </>
                )}
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
                
                {/* Mobile user info */}
                {currentUser ? (
                  <div className="pb-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">
                      {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {currentUser.role}
                    </div>
                  </div>
                ) : (
                  /* Mobile auth buttons */
                  <div className="flex space-x-3 pb-2 border-b border-gray-200">
                    <a 
                      href="/signup" 
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center text-sm"
                    >
                      Sign Up
                    </a>
                    <a 
                      href="/login" 
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-center text-sm"
                    >
                      Login
                    </a>
                  </div>
                )}

                {/* Mobile user actions */}
                {currentUser && (
                  <div className="pb-2 border-b border-gray-200 space-y-2">
                    {/* Dashboard link - updated to use role-based navigation */}
                    {dashboardLink && (
                      <Link
                        href={dashboardLink}
                        className="block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center text-sm"
                      >
                        {currentUser.role === 'admin' ? 'Admin Panel' : 
                         currentUser.role === 'dealer' ? 'Dealer Dashboard' : 
                         currentUser.role === 'agent' ? 'Agent Dashboard' : 'Dashboard'}
                      </Link>
                    )}
                    {isDealerOrAgent && (
                      <>
                        {currentUser.role === 'dealer' && (
                          <Link
                            href="/submit-product-request"
                            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center text-sm"
                          >
                            Submit Product
                          </Link>
                        )}
                        <Link
                          href={currentUser.role === 'dealer' ? '/my-product-requests' : '/my-invoices'}
                          className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-center text-sm"
                        >
                          {currentUser.role === 'dealer' ? 'My Requests' : 'My Invoices'}
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center justify-center space-x-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}

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