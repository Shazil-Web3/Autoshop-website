"use client";
import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const PartsPage = () => {
  const [searchFilters, setSearchFilters] = useState({
    make: '',
    model: '',
    year: '',
    modelCode: '',
    category: ''
  });

  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  const makes = [
    "Toyota", "Nissan", "Honda", "Mazda", "Mitsubishi", "Subaru", "Suzuki", 
    "Isuzu", "Daihatsu", "Hino", "Lexus", "Mercedes-Benz", "BMW", "Volkswagen", 
    "Audi", "Peugeot", "Ford", "Volvo", "Land Rover", "Jaguar", "Jeep", 
    "Chevrolet", "Hyundai", "Kia", "Ssangyong", "Renault Samsung"
  ];

  const years = Array.from({ length: 46 }, (_, i) => 2024 - i);

  const categories = [
    { name: "Engine & Components", count: 102368 },
    { name: "Transmission & Drivetrain", count: 182936 },
    { name: "Suspension & Components", count: 122083 },
    { name: "Lightings", count: 580039 },
    { name: "Computers & Sensors", count: 127741 },
    { name: "Chassis", count: 65019 },
    { name: "Body Parts", count: 391105 },
    { name: "Door Parts", count: 271686 },
    { name: "Car Electronics", count: 38454 },
    { name: "Cooling Components", count: 267074 },
    { name: "Electrical Parts", count: 404808 },
    { name: "Exhaust & Components", count: 78686 },
    { name: "Exterior Parts", count: 33480 },
    { name: "Interior Parts", count: 114073 },
    { name: "Tires & Wheels", count: 46128 },
    { name: "Brake", count: 120804 },
    { name: "Mirrors & Windshields", count: 286638 },
    { name: "All Other Parts", count: 16304 }
  ];

  // Sample parts data
  const sampleParts = [
    {
      id: 1,
      name: "Toyota Camry Engine Oil Filter",
      make: "Toyota",
      model: "Camry",
      year: "2018",
      category: "Engine & Components",
      price: "$15.99",
      stock: "In Stock",
      image: "/images/parts/oil-filter.jpg"
    },
    {
      id: 2,
      name: "Honda Civic Brake Pads Set",
      make: "Honda",
      model: "Civic",
      year: "2020",
      category: "Brake",
      price: "$45.50",
      stock: "In Stock",
      image: "/images/parts/brake-pads.jpg"
    },
    {
      id: 3,
      name: "Nissan Altima Headlight Assembly",
      make: "Nissan",
      model: "Altima",
      year: "2019",
      category: "Lightings",
      price: "$89.99",
      stock: "Limited Stock",
      image: "/images/parts/headlight.jpg"
    }
  ];

  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching with filters:', searchFilters);
    // In real app, this would trigger API call
  };

  const handlePartInquiry = (part) => {
    setSelectedPart(part);
    setShowInquiryForm(true);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // Handle inquiry form submission
    alert('Parts inquiry submitted successfully!');
    setShowInquiryForm(false);
    setSelectedPart(null);
  };

  const CategoryCard = ({ category }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{category.name}</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
          {category.count.toLocaleString()}
        </span>
      </div>
    </div>
  );

  const PartCard = ({ part }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={part.image} 
          alt={part.name}
          className="w-full h-32 object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-part.jpg';
          }}
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
          part.stock === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {part.stock}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{part.name}</h3>
        <div className="text-sm text-gray-600 mb-2">
          <div>{part.make} {part.model} ({part.year})</div>
          <div>{part.category}</div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-red-600">{part.price}</span>
          <button
            onClick={() => handlePartInquiry(part)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            INQUIRY
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Auto Parts</h1>
          <p className="text-gray-600 mt-2">Search for new and used auto parts by make, model, and category</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FunnelIcon className="h-6 w-6 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Parts Search Tool</h2>
          </div>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Maker</label>
              <select
                value={searchFilters.make}
                onChange={(e) => handleFilterChange('make', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Model</label>
              <input
                type="text"
                value={searchFilters.model}
                onChange={(e) => handleFilterChange('model', e.target.value)}
                placeholder="Enter model"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
              <select
                value={searchFilters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model Code</label>
              <input
                type="text"
                value={searchFilters.modelCode}
                onChange={(e) => handleFilterChange('modelCode', e.target.value)}
                placeholder="Enter model code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">All Categories</h2>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <CategoryCard key={index} category={category} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Parts Results */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Search Results</h2>
                <span className="text-sm text-gray-600">{sampleParts.length} parts found</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleParts.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>

              {sampleParts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔧</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No parts found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inquiry Form Modal */}
        {showInquiryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Parts Inquiry - {selectedPart?.name}
              </h3>
              
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination Port</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows="3"
                    placeholder="Additional details about your inquiry..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowInquiryForm(false);
                      setSelectedPart(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsPage; 