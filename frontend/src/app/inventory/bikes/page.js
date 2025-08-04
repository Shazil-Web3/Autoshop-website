"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import FilterModal from '../../../components/FilterModal';

const BikesPage = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Sample bikes data
  const bikes = [
    {
      id: 1,
      title: "2020 HONDA CBR1000RR",
      price: "$8,500",
      totalPrice: "$10,200",
      image: "/images/bikes/honda-cbr1000rr.jpg",
      stockNo: "BK001",
      mileage: "12,000 km",
      year: "2020",
      engine: "1,000cc",
      transmission: "6-speed",
      location: "Japan",
      color: "Red",
      fuel: "Petrol",
      drive: "2WD",
      seats: "2",
      doors: "0",
      steering: "Left",
      chassisNo: "HONDA123456789",
      engineCode: "-",
      modelCode: "CBR1000RR",
      registrationYear: "2020/04",
      manufactureYear: "2020/03",
      dimension: "2.1×0.7×1.1 m",
      weight: "201 kg",
      maxCap: "2 persons",
      features: ["Brembo Brakes", "ABS", "Traction Control", "LED Headlight", "Digital Display", "Sport Mode", "TCA", "Rad Guard", "Frame Protection", "Twin Seat", "Tail Tidy", "Sports Exhaust", "Keyless Ride", "Driving Modes Pro", "ABS Pro", "Showa Forks", "Finance Available", "HPI Clear", "Delivery Available", "Part Exchange Welcome"],
      seller: "3RD PARTY seller"
    },
    {
      id: 2,
      title: "2019 YAMAHA YZF-R1",
      price: "$9,200",
      totalPrice: "$11,000",
      image: "/images/bikes/yamaha-r1.jpg",
      stockNo: "BK002",
      mileage: "8,500 km",
      year: "2019",
      engine: "1,000cc",
      transmission: "6-speed",
      location: "Japan",
      color: "Blue",
      fuel: "Petrol",
      drive: "2WD",
      seats: "2",
      doors: "0",
      steering: "Left",
      chassisNo: "YAMAHA123456789",
      engineCode: "-",
      modelCode: "YZF-R1",
      registrationYear: "2019/06",
      manufactureYear: "2019/05",
      dimension: "2.05×0.69×1.15 m",
      weight: "199 kg",
      maxCap: "2 persons",
      features: ["Brembo Brakes", "ABS", "Traction Control", "LED Headlight", "Digital Display", "Sport Mode", "TCA", "Rad Guard", "Frame Protection", "Twin Seat", "Tail Tidy", "Sports Exhaust", "Keyless Ride", "Driving Modes Pro", "ABS Pro", "Showa Forks", "Finance Available", "HPI Clear", "Delivery Available", "Part Exchange Welcome"],
      seller: "3RD PARTY seller"
    },
    {
      id: 3,
      title: "2021 KAWASAKI NINJA ZX-10R",
      price: "$10,500",
      totalPrice: "$12,600",
      image: "/images/bikes/kawasaki-ninja.jpg",
      stockNo: "BK003",
      mileage: "5,200 km",
      year: "2021",
      engine: "1,000cc",
      transmission: "6-speed",
      location: "Japan",
      color: "Green",
      fuel: "Petrol",
      drive: "2WD",
      seats: "2",
      doors: "0",
      steering: "Left",
      chassisNo: "KAWA123456789",
      engineCode: "-",
      modelCode: "ZX-10R",
      registrationYear: "2021/03",
      manufactureYear: "2021/02",
      dimension: "2.08×0.71×1.13 m",
      weight: "207 kg",
      maxCap: "2 persons",
      features: ["Brembo Brakes", "ABS", "Traction Control", "LED Headlight", "Digital Display", "Sport Mode", "TCA", "Rad Guard", "Frame Protection", "Twin Seat", "Tail Tidy", "Sports Exhaust", "Keyless Ride", "Driving Modes Pro", "ABS Pro", "Showa Forks", "Finance Available", "HPI Clear", "Delivery Available", "Part Exchange Welcome"],
      seller: "3RD PARTY seller"
    },
    {
      id: 4,
      title: "2018 SUZUKI GSX-R1000",
      price: "$7,800",
      totalPrice: "$9,400",
      image: "/images/bikes/suzuki-gsxr.jpg",
      stockNo: "BK004",
      mileage: "15,000 km",
      year: "2018",
      engine: "1,000cc",
      transmission: "6-speed",
      location: "Japan",
      color: "White",
      fuel: "Petrol",
      drive: "2WD",
      seats: "2",
      doors: "0",
      steering: "Left",
      chassisNo: "SUZU123456789",
      engineCode: "-",
      modelCode: "GSX-R1000",
      registrationYear: "2018/08",
      manufactureYear: "2018/07",
      dimension: "2.07×0.70×1.14 m",
      weight: "203 kg",
      maxCap: "2 persons",
      features: ["Brembo Brakes", "ABS", "Traction Control", "LED Headlight", "Digital Display", "Sport Mode", "TCA", "Rad Guard", "Frame Protection", "Twin Seat", "Tail Tidy", "Sports Exhaust", "Keyless Ride", "Driving Modes Pro", "ABS Pro", "Showa Forks", "Finance Available", "HPI Clear", "Delivery Available", "Part Exchange Welcome"],
      seller: "3RD PARTY seller"
    },
    {
      id: 5,
      title: "2020 DUCATI PANIGALE V4",
      price: "$15,500",
      totalPrice: "$18,600",
      image: "/images/bikes/ducati-panigale.jpg",
      stockNo: "BK005",
      mileage: "3,800 km",
      year: "2020",
      engine: "1,103cc",
      transmission: "6-speed",
      location: "Italy",
      color: "Red",
      fuel: "Petrol",
      drive: "2WD",
      seats: "2",
      doors: "0",
      steering: "Left",
      chassisNo: "DUCA123456789",
      engineCode: "-",
      modelCode: "Panigale V4",
      registrationYear: "2020/05",
      manufactureYear: "2020/04",
      dimension: "2.10×0.78×1.12 m",
      weight: "175 kg",
      maxCap: "2 persons",
      features: ["Brembo Brakes", "ABS", "Traction Control", "LED Headlight", "Digital Display", "Sport Mode", "TCA", "Rad Guard", "Frame Protection", "Twin Seat", "Tail Tidy", "Sports Exhaust", "Keyless Ride", "Driving Modes Pro", "ABS Pro", "Ohlins", "Finance Available", "HPI Clear", "Delivery Available", "Part Exchange Welcome"],
      seller: "3RD PARTY seller"
    },
    {
      id: 6,
      title: "2019 BMW S1000RR",
      price: "$11,200",
      totalPrice: "$13,400",
      image: "/images/bikes/bmw-s1000rr.jpg",
      stockNo: "BK006",
      mileage: "7,500 km",
      year: "2019",
      engine: "999cc",
      transmission: "6-speed",
      location: "Germany",
      color: "Black",
      fuel: "Petrol",
      drive: "2WD",
      seats: "2",
      doors: "0",
      steering: "Left",
      chassisNo: "BMW123456789",
      engineCode: "-",
      modelCode: "S1000RR",
      registrationYear: "2019/07",
      manufactureYear: "2019/06",
      dimension: "2.06×0.72×1.13 m",
      weight: "197 kg",
      maxCap: "2 persons",
      features: ["Brembo Brakes", "ABS", "Traction Control", "LED Headlight", "Digital Display", "Sport Mode", "TCA", "Rad Guard", "Frame Protection", "Twin Seat", "Tail Tidy", "Sports Exhaust", "Keyless Ride", "Driving Modes Pro", "ABS Pro", "Showa Forks", "Finance Available", "HPI Clear", "Delivery Available", "Part Exchange Welcome"],
      seller: "3RD PARTY seller"
    }
  ];

  const BikeCard = ({ bike }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={bike.image} 
          alt={bike.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-vehicle.jpg';
          }}
        />
        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
          {bike.stockNo}
        </div>
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
          20 pts
        </div>
        <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
          BIKE
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">Ref No. {bike.stockNo}</div>
        <div className="text-xs text-gray-500 mb-3">{bike.seller}</div>
        
        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">
          {bike.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div>Mileage: {bike.mileage}</div>
          <div>Year: {bike.year}</div>
          <div>Engine: {bike.engine}</div>
          <div>Trans: {bike.transmission}</div>
          <div>Location: {bike.location}</div>
          <div>Model code: {bike.modelCode}</div>
          <div>Engine code: {bike.engineCode}</div>
          <div>Steering: {bike.steering}</div>
          <div>Color: {bike.color}</div>
          <div>Fuel: {bike.fuel}</div>
          <div>Drive: {bike.drive}</div>
          <div>Seats: {bike.seats}</div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Features:</div>
          <div className="flex flex-wrap gap-1">
            {bike.features.slice(0, 5).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
            <span className="text-blue-600 text-xs">and more...</span>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-red-600">{bike.price}</span>
            <span className="text-sm text-gray-500">Total: {bike.totalPrice}</span>
          </div>
          <div className="text-xs text-gray-500 mb-3">CIF to Bahrain (RORO)</div>
          
          <div className="flex gap-2">
            <Link 
              href={`/inventory/bikes/${bike.id}`}
              className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              INQUIRY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const BikeListItem = ({ bike }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        <div className="w-1/3 relative">
          <img 
            src={bike.image} 
            alt={bike.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = '/images/placeholder-vehicle.jpg';
            }}
          />
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
            {bike.stockNo}
          </div>
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
            20 pts
          </div>
          <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
            BIKE
          </div>
        </div>
        
        <div className="w-2/3 p-4">
          <div className="text-xs text-gray-500 mb-2">Ref No. {bike.stockNo}</div>
          <div className="text-xs text-gray-500 mb-3">{bike.seller}</div>
          
          <h3 className="font-semibold text-gray-800 mb-3">
            {bike.title}
          </h3>
          
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
            <div>Mileage: {bike.mileage}</div>
            <div>Year: {bike.year}</div>
            <div>Engine: {bike.engine}</div>
            <div>Trans: {bike.transmission}</div>
            <div>Location: {bike.location}</div>
            <div>Color: {bike.color}</div>
            <div>Fuel: {bike.fuel}</div>
            <div>Drive: {bike.drive}</div>
            <div>Seats: {bike.seats}</div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">Features:</div>
            <div className="flex flex-wrap gap-1">
              {bike.features.slice(0, 8).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {feature}
                </span>
              ))}
              <span className="text-blue-600 text-xs">and more...</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-red-600">{bike.price}</span>
              <div className="text-xs text-gray-500">Total: {bike.totalPrice}</div>
            </div>
            
            <Link 
              href={`/inventory/bikes/${bike.id}`}
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
              <h1 className="text-3xl font-bold text-gray-900">Stock Bikes</h1>
              <p className="text-gray-600 mt-2">Browse our selection of motorcycles and bikes</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
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
                  placeholder="Search bikes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
              {bikes.length} bikes found
            </h2>
          </div>
        </div>

        {/* Bikes Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {bikes.map((bike) => (
            viewMode === 'grid' ? (
              <BikeCard key={bike.id} bike={bike} />
            ) : (
              <BikeListItem key={bike.id} bike={bike} />
            )
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md">
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

export default BikesPage; 