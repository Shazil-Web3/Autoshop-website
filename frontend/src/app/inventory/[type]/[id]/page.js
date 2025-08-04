"use client";
import { useState } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, ShareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const ProductDetailPage = ({ params }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(true);

  // Unwrap params Promise for Next.js 15 compatibility
  const unwrappedParams = use(params);

  // Sample product data - in real app, this would come from API based on params
  const product = {
    id: unwrappedParams.id,
    type: unwrappedParams.type,
    title: "2018 MERCEDES-BENZ E-CLASS / SUN ROOF, SMART KEY, BACK CAMERA",
    price: "$12,615",
    totalPrice: "$14,724",
    referenceNumber: "BE FORWARD Ref#:BY102460",
    images: ["/4.jpg", "/5.jpeg", "/6.jpeg", "/7.jpeg", "/4.jpg", "/5.jpeg", "/6.jpeg", "/7.jpeg", "/4.jpg", "/5.jpeg", "/6.jpeg", "/7.jpeg", "/4.jpg", "/5.jpeg", "/6.jpeg", "/7.jpeg", "/4.jpg", "/5.jpeg", "/6.jpeg", "/7.jpeg"],
    specs: {
      mileage: "132,698 km",
      year: "2018",
      engine: "1,991cc",
      transmission: "AT",
      fuel: "Petrol",
      referenceNumber: "BY102460",
      chassisNumber: "WDDWF4JB0JR123456",
      engineSize: "1,991cc",
      location: "KOREA",
      version: "Sun roof, Smart Key, Back Camera",
      drive: "2wheel drive",
      transmissionType: "Automatic",
      registrationYear: "2018-",
      manufactureYear: "N/A",
      steering: "Left",
      exteriorColor: "Blue",
      seats: "5",
      doors: "4",
      m3: "13.589",
      dimension: "4.97x1.86x1.47 m",
      weight: "2,205 kg",
      subReferenceNumber: "BY102460-001"
    },
    features: [
      "Power Steering", "Airbag", "Power Seat", "Back Camera", "Side Airbag", "Power Mirror", "Navigation",
      "CD Player", "Sun Roof", "Leather Seat", "Alloy Wheels", "Radio", "A/C", "ABS", "TV", "CD Changer", 
      "DVD", "Rear Spoiler", "Back Tire", "Grill Guard", "Wheel Spanner", "Jack", "Spare Tire", 
      "Keyless Entry", "Central Looking", "Push Start", "Fog Lights", "360 Degree Camera", "Body Kit", 
      "ESC", "Side Skirts", "Front Lip Spoiler", "Turbo", "Power Slide Door"
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Image Gallery */}
            <div className="lg:w-2/3 p-6">
              {/* Main Image */}
              <div className="relative h-96 mb-4">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1}/{product.images.length}
                </div>
              </div>

              {/* Reference Number */}
              <div className="text-sm text-gray-600 mb-4">
                {product.referenceNumber}
              </div>

              {/* Thumbnails */}
              {showThumbnails && (
                <div className="mb-4">
                  <div className="grid grid-cols-5 gap-2">
                    {product.images.slice(0, 20).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`relative h-16 rounded overflow-hidden border-2 transition-all ${
                          currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                    <ShareIcon className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>Download all images</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {showThumbnails ? 'Hide thumbnails' : 'Show thumbnails'}
                </button>
              </div>
            </div>

            {/* Right Section - Product Details */}
            <div className="lg:w-1/3 p-6 bg-gray-50">
              {/* Product Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Pricing Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-red-600">{product.price}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Total Price: <span className="font-semibold">{product.totalPrice}</span> C&F BAHRAIN
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600 transition-colors w-full">
                  GET A PRICE QUOTE NOW
                </button>
              </div>

              {/* Quality Check Section */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-green-700 mb-2">
                  <span className="text-green-600">✓</span>
                  <span className="font-semibold">FREE QUALITY CHECK</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700 mb-2">
                  <span className="text-green-600">✓</span>
                  <span className="font-semibold">BEST PRICE GUARANTEED</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700 mb-2">
                  <span className="text-green-600">✓</span>
                  <span className="font-semibold">5% DISCOUNT COUPON</span>
                </div>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                  Learn more about free quality check
                </a>
              </div>

              {/* Specifications Table */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">SPECS</h2>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-gray-200">
                      {Object.entries(product.specs).slice(0, Math.ceil(Object.keys(product.specs).length / 2)).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 border-b border-gray-100">
                          <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-sm font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      {Object.entries(product.specs).slice(Math.ceil(Object.keys(product.specs).length / 2)).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 border-b border-gray-100">
                          <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-sm font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">FEATURES</h2>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded text-sm font-medium ${
                        index < 7 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 