"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import FilterModal from '../../../components/FilterModal';

const CarsPage = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest');

  // Sample cars data - in real app, this would come from API
  const cars = [
    {
      id: 1,
      title: "2018 KIA STINGER / SMART KEY, BACK CAMERA",
      price: "$10,330",
      totalPrice: "$12,464",
      image: "/images/cars/kia-stinger-1.jpg",
      stockNo: "BW803567",
      mileage: "162,182 km",
      year: "2018",
      engine: "3,342cc",
      transmission: "AT",
      location: "Korea",
      color: "Gray",
      fuel: "Petrol",
      drive: "4WD",
      seats: "5",
      doors: "4",
      features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Sun Roof", "Radio", "Push Start", "Power Seat"],
      seller: "3RD PARTY seller"
    },
    {
      id: 2,
      title: "2018 KIA STINGER / SUN ROOF, SMART KEY, BACK CAMERA",
      price: "$10,771",
      totalPrice: "$12,905",
      image: "/images/cars/kia-stinger-2.jpg",
      stockNo: "BX910689",
      mileage: "202,533 km",
      year: "2018",
      engine: "3,342cc",
      transmission: "AT",
      location: "Korea",
      color: "Black",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Sun Roof", "Radio", "Push Start", "Power Seat"],
      seller: "3RD PARTY seller"
    },
    {
      id: 3,
      title: "2018 KIA STINGER / BACK CAMERA, SMART KEY",
      price: "$10,833",
      originalPrice: "$11,835",
      discount: "8% off",
      totalPrice: "$13,067",
      image: "/images/cars/kia-stinger-3.jpg",
      stockNo: "BX910690",
      mileage: "185,000 km",
      year: "2018",
      engine: "3,342cc",
      transmission: "AT",
      location: "Korea",
      color: "Red",
      fuel: "Petrol",
      drive: "4WD",
      seats: "5",
      doors: "4",
      features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Radio", "Push Start", "Power Seat"],
      seller: "3RD PARTY seller"
    },
    {
      id: 4,
      title: "2018 KIA STINGER / SMART KEY, BACK CAMERA",
      price: "$11,200",
      totalPrice: "$13,434",
      image: "/images/cars/kia-stinger-4.jpg",
      stockNo: "BX910691",
      mileage: "175,000 km",
      year: "2018",
      engine: "3,342cc",
      transmission: "AT",
      location: "Korea",
      color: "White",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Sun Roof", "Radio", "Push Start", "Power Seat"],
      seller: "3RD PARTY seller"
    },
    {
      id: 5,
      title: "2018 KIA STINGER / SUN ROOF, BACK CAMERA",
      price: "$10,500",
      totalPrice: "$12,634",
      image: "/images/cars/kia-stinger-5.jpg",
      stockNo: "BX910692",
      mileage: "195,000 km",
      year: "2018",
      engine: "3,342cc",
      transmission: "AT",
      location: "Korea",
      color: "Blue",
      fuel: "Petrol",
      drive: "4WD",
      seats: "5",
      doors: "4",
      features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Sun Roof", "Radio", "Push Start", "Power Seat"],
      seller: "3RD PARTY seller"
    },
    {
      id: 6,
      title: "2018 KIA STINGER / SMART KEY, BACK CAMERA",
      price: "$10,900",
      totalPrice: "$13,134",
      image: "/images/cars/kia-stinger-6.jpg",
      stockNo: "BX910693",
      mileage: "165,000 km",
      year: "2018",
      engine: "3,342cc",
      transmission: "AT",
      location: "Korea",
      color: "Silver",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Radio", "Push Start", "Power Seat"],
      seller: "3RD PARTY seller"
    }
  ];

  const CarCard = ({ car }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={car.image} 
          alt={car.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-vehicle.jpg';
          }}
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
          {car.stockNo}
        </div>
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
          20 pts
        </div>
        <button className="absolute top-2 left-8 bg-white bg-opacity-80 p-1 rounded-full hover:bg-opacity-100 transition-all">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">Ref No. {car.stockNo}</div>
        <div className="text-xs text-gray-500 mb-3">{car.seller}</div>
        
        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">
          {car.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div>Mileage: {car.mileage}</div>
          <div>Year: {car.year}</div>
          <div>Engine: {car.engine}</div>
          <div>Trans: {car.transmission}</div>
          <div>Location: {car.location}</div>
          <div>Model code: 0</div>
          <div>Engine code: -</div>
          <div>Steering: Left</div>
          <div>Color: {car.color}</div>
          <div>Fuel: {car.fuel}</div>
          <div>Drive: {car.drive}</div>
          <div>Seats: {car.seats}</div>
          <div>Doors: {car.doors}</div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Features:</div>
          <div className="flex flex-wrap gap-1">
            {car.features.slice(0, 5).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
            <span className="text-blue-600 text-xs">and more...</span>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-2xl font-bold text-red-600">{car.price}</span>
              {car.originalPrice && (
                <div className="text-sm">
                  <span className="line-through text-gray-500">{car.originalPrice}</span>
                  <span className="text-green-600 ml-2">{car.discount}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-gray-500">Total: {car.totalPrice}</span>
          </div>
          <div className="text-xs text-gray-500 mb-3">CIF to Bahrain (RORO)</div>
          
          <div className="flex gap-2">
            <Link 
              href={`/inventory/cars/${car.id}`}
              className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              INQUIRY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const CarListItem = ({ car }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        <div className="w-1/3 relative">
          <img 
            src={car.image} 
            alt={car.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = '/images/placeholder-vehicle.jpg';
            }}
          />
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
            {car.stockNo}
          </div>
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
            20 pts
          </div>
        </div>
        
        <div className="w-2/3 p-4">
          <div className="text-xs text-gray-500 mb-2">Ref No. {car.stockNo}</div>
          <div className="text-xs text-gray-500 mb-3">{car.seller}</div>
          
          <h3 className="font-semibold text-gray-800 mb-3">
            {car.title}
          </h3>
          
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
            <div>Mileage: {car.mileage}</div>
            <div>Year: {car.year}</div>
            <div>Engine: {car.engine}</div>
            <div>Trans: {car.transmission}</div>
            <div>Location: {car.location}</div>
            <div>Color: {car.color}</div>
            <div>Fuel: {car.fuel}</div>
            <div>Drive: {car.drive}</div>
            <div>Seats: {car.seats}</div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">Features:</div>
            <div className="flex flex-wrap gap-1">
              {car.features.slice(0, 8).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {feature}
                </span>
              ))}
              <span className="text-blue-600 text-xs">and more...</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-red-600">{car.price}</span>
              {car.originalPrice && (
                <div className="text-sm">
                  <span className="line-through text-gray-500">{car.originalPrice}</span>
                  <span className="text-green-600 ml-2">{car.discount}</span>
                </div>
              )}
              <div className="text-xs text-gray-500">Total: {car.totalPrice}</div>
            </div>
            
            <Link 
              href={`/inventory/cars/${car.id}`}
              className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              INQUIRY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Stock Cars</h1>
              <p className="text-gray-600 mt-2">Browse our selection of quality used cars</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Sort Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="mileage-low">Mileage: Low to High</option>
                <option value="mileage-high">Mileage: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {cars.length} cars found
            </h2>
          </div>
        </div>

        {/* Cars Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {cars.map((car) => (
            viewMode === 'grid' ? (
              <CarCard key={car.id} car={car} />
            ) : (
              <CarListItem key={car.id} car={car} />
            )
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
      />
    </div>
  );
};

export default CarsPage; 