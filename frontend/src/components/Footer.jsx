import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AUTEXLINE</h3>
            <p className="text-gray-300">
              Leading the Future of Automotive Sourcing, Sales, and Export
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/inventory" className="text-gray-300 hover:text-white transition-colors">Inventory</a></li>
              <li><a href="/auto-parts" className="text-gray-300 hover:text-white transition-colors">Auto Parts</a></li>
              <li><a href="/career" className="text-gray-300 hover:text-white transition-colors">Career</a></li>
              <li><a href="/investment" className="text-gray-300 hover:text-white transition-colors">Investment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/auctions" className="text-gray-300 hover:text-white transition-colors">Auctions</a></li>
              <li><a href="/buy-from-stock" className="text-gray-300 hover:text-white transition-colors">How to Buy</a></li>
              <li><a href="/inquiry" className="text-gray-300 hover:text-white transition-colors">Inquiry</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Export Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📞 +1 (555) 123-4567</li>
              <li>📧 info@autexline.com</li>
              <li>🌐 www.autexline.com</li>
              <li>📍 Global Trade Center</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Autexline. All rights reserved. | 
            <a href="/about" className="text-blue-400 hover:text-blue-300 ml-2 transition-colors">About Us</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 