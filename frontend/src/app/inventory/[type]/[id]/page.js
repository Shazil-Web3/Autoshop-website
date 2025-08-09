"use client";
import { useState, useRef } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useGlobalState } from '../../../../context/GlobalStateContext';
import InquiryForm from '../../../../components/InquiryForm';

const ProductDetailPage = ({ params }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const { inventory } = useGlobalState();
  const inquirySectionRef = useRef(null);

  // Unwrap params Promise for Next.js 15 compatibility
  const unwrappedParams = use(params);

  // Find the product from global state
  const categoryMap = {
    'stock-cars': 'stockCars',
    'salvage': 'salvageVehicles',
    'machinery': 'constructionMachinery',
    'motorcycle': 'bikes'
  };

  const category = categoryMap[unwrappedParams.type] || 'stockCars';
  const product = inventory[category]?.find(p => String(p.id || p._id) === String(unwrappedParams.id));

  // If product not found, show a fallback
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Use only product-provided images (Cloudinary) for gallery
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : []);

  // Create specs object from product data with shorter labels
  const specs = {
    mileage: product.mileage,
    year: product.year,
    engine: product.engine,
    engineCode: product.engineCode,
    modelCode: product.modelCode,
    transmission: product.transmission,
    fuel: product.fuel,
    refNo: product.stockNo,
    chassis: "WDDWF4JB0JR123456", // Shortened
    engineSize: product.engine,
    location: product.location,
    version: product.title.split('/')?.[1] || "Standard",
    drive: product.drive || "2WD", // Shortened
    transType: product.transmission, // Shortened
    regYear: `${product.year}-`, // Shortened
    mfgYear: "N/A", // Shortened
    steering: "Left",
    color: product.color, // Shortened
    seats: product.seats || "5",
    doors: product.doors || "4",
    m3: "13.589",
    dimension: "4.97x1.86x1.47 m",
    weight: "2,205 kg",
    subRef: `${product.stockNo}-001` // Shortened
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out this ${product.title} on Autexline`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const scrollToInquiry = () => {
    if (inquirySectionRef.current) {
      inquirySectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
                {images.length > 0 && (
                  <Image
                    src={images[currentImageIndex]}
                    alt={product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                )}
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
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
                  </>
                )}
                
                {/* Image Counter */}
                {images.length > 0 && (
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1}/{images.length}
                  </div>
                )}
              </div>

              {/* Reference Number */}
              <div className="text-sm text-gray-600 mb-4">
                BE FORWARD Ref#: {product.stockNo}
              </div>
              
              {/* Thumbnails */}
              {showThumbnails && images.length > 1 && (
                <div className="mb-4">
                  <div className="grid grid-cols-5 gap-2">
                    {images.map((image, index) => (
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <button 
                    onClick={handleShare}
                    className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    <ShareIcon className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {showThumbnails ? 'Hide thumbnails' : 'Show thumbnails'}
                </button>
              </div>

              {/* Features moved below gallery */}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3">FEATURES</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(product.features || [
                    "Power Steering","Airbag","Power Seat","Back Camera","Side Airbag","Power Mirror","Navigation",
                    "CD Player","Sun Roof","Leather Seat","Alloy Wheels","Radio","A/C","ABS","TV","CD Changer",
                    "DVD","Rear Spoiler","Back Tire","Grill Guard","Wheel Spanner","Jack","Spare Tire",
                    "Keyless Entry","Central Looking","Push Start","Fog Lights","360 Degree Camera","Body Kit",
                    "ESC","Side Skirts","Front Lip Spoiler","Turbo","Power Slide Door"
                  ]).map((feature, index) => (
                    <div key={index} className={`px-3 py-2 rounded text-sm font-medium ${index < 7 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}>
                      {feature}
                    </div>
                  ))}
                </div>
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
                <div className="flex items-center justify_between mb-2">
                  <span className="text-3xl font-bold text-red-600">{product.price}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Reference ID: <span className="font-semibold">{product.refNo || '-'}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Total Price: <span className="font-semibold">{product.totalPrice}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button 
                    onClick={scrollToInquiry}
                    className="bg-orange-500 text-white px-4 py-3 rounded font-medium hover:bg-orange-600 transition-colors w-full"
                  >
                    GET A PRICE QUOTE NOW
                  </button>
                  
                  <div className="text-center text-gray-500 font-medium">OR</div>
                  
                  <button 
                    onClick={scrollToInquiry}
                    className="bg-orange-500 text-white px-4 py-3 rounded font-medium hover:bg-orange-600 transition-colors w-full"
                  >
                    BUY NOW
                  </button>
                </div>
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
                <div className="bg-white rounded-lg border border-gray-200 overflow_hidden">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-gray-200">
                      {Object.entries(specs).slice(0, Math.ceil(Object.keys(specs).length / 2)).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 border-b border-gray-100">
                          <span className="text-xs text-gray-600 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-xs font-medium text-gray-900 text-right max-w-[60%] break-words whitespace-normal" title={value}>{value}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      {Object.entries(specs).slice(Math.ceil(Object.keys(specs).length / 2)).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 border-b border-gray-100">
                          <span className="text-xs text-gray-600 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-xs font-medium text-gray-900 text-right max-w-[60%] break-words whitespace-normal" title={value}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Section */}
        <div ref={inquirySectionRef} className="mt-8">
          <InquiryForm 
            productInfo={{
              make: product.title.split(' ')[0],
              model: product.title,
              year: product.year,
              price: product.price,
              stockNo: product.stockNo,
              refNo: product.refNo || product.stockNo
            }}
            onClose={() => setShowInquiryForm(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 