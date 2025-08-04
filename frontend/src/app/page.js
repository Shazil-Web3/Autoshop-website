"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FilterModal from "../components/FilterModal";
import Header from "../components/Header";

export default function Home() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 19,
    hours: 7,
    minutes: 34,
    seconds: 21
  });
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonialIndex(prev => 
        prev >= testimonials.length - 2 ? 0 : prev + 2
      );
    }, 5000);

    return () => clearInterval(testimonialTimer);
  }, []);

  const makes = [
    "Toyota", "Nissan", "Honda", "Mazda", "Mitsubishi", "Subaru", "Suzuki", 
    "Isuzu", "Daihatsu", "Hino", "Lexus", "Mercedes-Benz", "BMW", "Volkswagen", 
    "Audi", "Peugeot", "Ford", "Volvo", "Land Rover", "Jaguar", "Jeep", 
    "Chevrolet", "Hyundai", "Kia", "Ssangyong", "Renault Samsung"
  ];

  const categories = [
    { name: "SUV", count: "115,461", icon: "🚗" },
    { name: "Truck", count: "24,123", icon: "🚛" },
    { name: "Pick up", count: "7,245", icon: "🛻" },
    { name: "Van", count: "24,626", icon: "🚐" },
    { name: "Sedan", count: "96,528", icon: "🚙" },
    { name: "Bus", count: "858", icon: "🚌" },
    { name: "Mini Van", count: "44,297", icon: "🚐" },
    { name: "Hatchback", count: "44,270", icon: "🚗" },
    { name: "Coupe", count: "11,046", icon: "🏎️" },
    { name: "Convertible", count: "5,351", icon: "🚗" },
    { name: "Wagon", count: "12,849", icon: "🚗" },
    { name: "Mini Bus", count: "443", icon: "🚐" },
    { name: "Machinery", count: "89", icon: "🏗️" },
    { name: "Forklift", count: "26", icon: "🔧" },
    { name: "Tractor", count: "20", icon: "🚜" },
    { name: "Tractor Head", count: "1,416", icon: "🚛" },
    { name: "Motorcycle", count: "0", icon: "🏍️" }
  ];

  const otherCategories = [
    { name: "Left Hand Drive", count: "165,066", icon: "🚗" },
    { name: "Fuel Efficient Vehicles", count: "170,640", icon: "⛽" },
    { name: "Hybrid", count: "15,727", icon: "🔋" },
    { name: "Electric", count: "1,573", icon: "⚡" },
    { name: "Diesel", count: "100,443", icon: "⛽" },
    { name: "Manual", count: "36,170", icon: "⚙️" },
    { name: "For Handicapped", count: "CANTER", icon: "♿" }
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      company: "Auto Parts Plus",
      text: "Autexline has been our trusted partner for over 3 years. Their quality and service are unmatched!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      company: "Global Motors",
      text: "The best automotive sourcing company we've worked with. Professional service and competitive prices!",
      rating: 5
    },
    {
      name: "Carlos Rodriguez",
      company: "Latin Auto Imports",
      text: "Excellent communication and reliable shipping. Highly recommended for international buyers!",
      rating: 5
    },
    {
      name: "Maria Garcia",
      company: "European Auto Solutions",
      text: "Outstanding quality control and transparent pricing. A pleasure to do business with!",
      rating: 5
    },
    {
      name: "David Chen",
      company: "Asian Motors Ltd",
      text: "Fast response times and excellent customer support. The best choice for quality vehicles!",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      company: "American Auto Group",
      text: "Professional team with deep industry knowledge. They make international trade easy!",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(prev => 
      prev >= testimonials.length - 2 ? 0 : prev + 2
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(prev => 
      prev <= 0 ? testimonials.length - 2 : prev - 2
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Banner Image */}
      <section className="relative h-96">
        {/* Banner Image */}
        <Image
          src="/2.jpg"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        
        {/* Filter Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-white transition-all duration-300 shadow-lg"
          >
            🔍 Filter by Car
          </button>
        </div>
      </section>

      {/* Three Image Grids Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-6">
            {/* Left Section */}
            <div className="relative w-80 h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/3.jpg"
                alt="Left Grid"
                fill
                className="object-cover"
              />
            </div>

            {/* Middle Section: Flash Sale countdown */}
            <div className="relative w-[520px] h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gray-100"></div>
              <Image
                src="/1.jpg"
                alt="Flash Sale Background"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-24 bg-white/90 backdrop-blur-sm border-2 border-red-500 text-red-600 flex flex-col justify-center items-center text-center p-3 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">FLASH SALE</div>
                <div className="text-3xl font-bold mt-1">
                  {countdown.days.toString().padStart(2, '0')}:{countdown.hours.toString().padStart(2, '0')}:{countdown.minutes.toString().padStart(2, '0')}:{countdown.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm">DAYS HRS MINS SECS</div>
              </div>
            </div>

            {/* Right Section */}
            <div className="relative w-80 h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/3.jpg"
                alt="Right Grid"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-1/4 space-y-4">
            {/* Shop by Make */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold mb-3 text-black">Shop by Make</h3>
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {makes.map((make, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="font-medium text-sm text-black">{make}</span>
                    <span className="text-gray-500 text-xs">({Math.floor(Math.random() * 50000) + 1000})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shop by Categories */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold mb-3 text-black">Shop by Categories</h3>
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {categories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">{category.icon}</span>
                      <span className="font-medium text-sm text-black">{category.name}</span>
                    </div>
                    <span className="text-gray-500 text-xs">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Categories */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold mb-3 text-black">Other Categories</h3>
              <div className="space-y-1">
                {otherCategories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">{category.icon}</span>
                      <span className="font-medium text-sm text-black">{category.name}</span>
                    </div>
                    <span className="text-gray-500 text-xs">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-3/4 space-y-6">
            {/* Featured Vehicles */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-black">Featured Vehicles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="relative h-32 rounded mb-3 overflow-hidden">
                      <Image
                        src={item === 1 ? "/4.jpg" : item === 2 ? "/5.jpeg" : item === 3 ? "/6.jpeg" : "/7.jpeg"}
                        alt="Vehicle"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-black">Toyota Camry 2022</h3>
                    <p className="text-gray-600 text-sm">Sedan • Petrol • 15,000 km</p>
                    <p className="text-blue-600 font-bold mt-2">$25,000</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Salvage Cars */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-black">Salvage Cars</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="relative h-32 rounded mb-3 overflow-hidden">
                      <Image
                        src={item === 1 ? "/4.jpg" : item === 2 ? "/5.jpeg" : item === 3 ? "/6.jpeg" : "/7.jpeg"}
                        alt="Salvage Vehicle"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-black">Honda Civic 2021</h3>
                    <p className="text-gray-600 text-sm">Salvage • Repairable</p>
                    <p className="text-red-600 font-bold mt-2">$8,500</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Construction Machinery */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-black">Construction Machinery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="relative h-32 rounded mb-3 overflow-hidden">
                      <Image
                        src={item === 1 ? "/4.jpg" : item === 2 ? "/5.jpeg" : item === 3 ? "/6.jpeg" : "/7.jpeg"}
                        alt="Construction Machinery"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-black">Excavator CAT 320</h3>
                    <p className="text-gray-600 text-sm">Construction • 2019</p>
                    <p className="text-green-600 font-bold mt-2">$45,000</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Motorcycles */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-black">Motorcycles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="relative h-32 rounded mb-3 overflow-hidden">
                      <Image
                        src={item === 1 ? "/4.jpg" : item === 2 ? "/5.jpeg" : item === 3 ? "/6.jpeg" : "/7.jpeg"}
                        alt="Motorcycle"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-black">Honda CBR 600RR</h3>
                    <p className="text-gray-600 text-sm">Sport • 2020</p>
                    <p className="text-purple-600 font-bold mt-2">$12,000</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How it Works */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-black text-center">How it Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="font-semibold text-black mb-2">1. Search</h3>
                  <p className="text-gray-600">Browse our extensive inventory of vehicles and parts</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-semibold text-black mb-2">2. Purchase</h3>
                  <p className="text-gray-600">Select your items and complete the purchase process</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚢</span>
                  </div>
                  <h3 className="font-semibold text-black mb-2">3. Ship</h3>
                  <p className="text-gray-600">We handle all shipping and export documentation</p>
                </div>
              </div>
            </div>

            {/* Testimonials Carousel */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-black text-center">Customer Testimonials</h2>
              <div className="relative overflow-hidden">
                {/* Carousel Container */}
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonialIndex * 50}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-1/2 px-4 flex-shrink-0">
                      <div className="text-center p-6 border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-yellow-400 text-xl mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-gray-700 mb-4 italic text-sm leading-relaxed font-medium">"{testimonial.text}"</p>
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="font-semibold text-black mb-1">{testimonial.name}</h4>
                          <p className="text-gray-500 text-xs">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl z-10"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl z-10"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 space-x-3">
                  {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonialIndex(i * 2)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentTestimonialIndex === i * 2 
                          ? 'bg-red-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <span className="text-2xl">💬</span>
        </button>
      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
      />
    </div>
  );
}
