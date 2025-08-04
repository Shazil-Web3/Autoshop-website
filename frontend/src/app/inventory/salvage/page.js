"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import FilterModal from '../../../components/FilterModal';

const SalvagePage = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Sample salvage vehicles data
  const salvageVehicles = [
    {
      id: 1,
      title: "2015 TOYOTA CAMRY SALVAGE",
      price: "$3,500",
      totalPrice: "$5,200",
      image: "/images/salvage/toyota-camry-salvage.jpg",
      stockNo: "SV001",
      mileage: "85,000 km",
      year: "2015",
      engine: "2,500cc",
      transmission: "AT",
      location: "Japan",
      color: "Silver",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      steering: "Left",
      chassisNo: "4T1BF1FK5CU123456",
      engineCode: "-",
      modelCode: "0",
      registrationYear: "2015/-",
      manufactureYear: "N/A",
      dimension: "3.59×1.59×1.48 m",
      weight: "870 kg",
      maxCap: "5 persons",
      condition: "Front end damage, engine intact. Good for parts or restoration project.",
      features: ["Power Steering", "A/C", "Airbag", "Radio", "Central Locking", "Jack", "Spare Tire", "Wheel Spanner"],
      seller: "3RD PARTY seller"
    },
    {
      id: 2,
      title: "2017 HONDA CIVIC SALVAGE",
      price: "$2,800",
      totalPrice: "$4,100",
      image: "/images/salvage/honda-civic-salvage.jpg",
      stockNo: "SV002",
      mileage: "95,000 km",
      year: "2017",
      engine: "1,800cc",
      transmission: "AT",
      location: "Japan",
      color: "Blue",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      steering: "Left",
      chassisNo: "1HGCV1F30HA123456",
      engineCode: "-",
      modelCode: "0",
      registrationYear: "2017/-",
      manufactureYear: "N/A",
      dimension: "3.45×1.75×1.45 m",
      weight: "1,250 kg",
      maxCap: "5 persons",
      condition: "Side impact damage, interior in good condition. Engine runs well.",
      features: ["Power Steering", "A/C", "Airbag", "Radio", "Central Locking", "Jack", "Spare Tire"],
      seller: "3RD PARTY seller"
    },
    {
      id: 3,
      title: "2016 NISSAN ALTIMA SALVAGE",
      price: "$3,200",
      totalPrice: "$4,800",
      image: "/images/salvage/nissan-altima-salvage.jpg",
      stockNo: "SV003",
      mileage: "120,000 km",
      year: "2016",
      engine: "2,500cc",
      transmission: "AT",
      location: "Japan",
      color: "Black",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      steering: "Left",
      chassisNo: "1N4AL3AP5GC123456",
      engineCode: "-",
      modelCode: "0",
      registrationYear: "2016/-",
      manufactureYear: "N/A",
      dimension: "3.85×1.80×1.50 m",
      weight: "1,450 kg",
      maxCap: "5 persons",
      condition: "Rear end collision, transmission and engine salvageable.",
      features: ["Power Steering", "A/C", "Airbag", "Radio", "Central Locking", "Jack", "Spare Tire"],
      seller: "3RD PARTY seller"
    },
    {
      id: 4,
      title: "2018 MAZDA 3 SALVAGE",
      price: "$4,100",
      totalPrice: "$5,900",
      image: "/images/salvage/mazda-3-salvage.jpg",
      stockNo: "SV004",
      mileage: "65,000 km",
      year: "2018",
      engine: "2,000cc",
      transmission: "AT",
      location: "Japan",
      color: "Red",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      steering: "Left",
      chassisNo: "JM1BL1H48K1123456",
      engineCode: "-",
      modelCode: "0",
      registrationYear: "2018/-",
      manufactureYear: "N/A",
      dimension: "3.65×1.80×1.45 m",
      weight: "1,300 kg",
      maxCap: "5 persons",
      condition: "Flood damage, electrical components may need replacement.",
      features: ["Power Steering", "A/C", "Airbag", "Radio", "Central Locking", "Jack", "Spare Tire"],
      seller: "3RD PARTY seller"
    },
    {
      id: 5,
      title: "2014 TOYOTA COROLLA SALVAGE",
      price: "$2,500",
      totalPrice: "$3,800",
      image: "/images/salvage/toyota-corolla-salvage.jpg",
      stockNo: "SV005",
      mileage: "150,000 km",
      year: "2014",
      engine: "1,800cc",
      transmission: "AT",
      location: "Japan",
      color: "White",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      steering: "Left",
      chassisNo: "1NXBU4EE0EZ123456",
      engineCode: "-",
      modelCode: "0",
      registrationYear: "2014/-",
      manufactureYear: "N/A",
      dimension: "3.55×1.75×1.45 m",
      weight: "1,200 kg",
      maxCap: "5 persons",
      condition: "Rollover damage, body panels and interior parts available.",
      features: ["Power Steering", "A/C", "Airbag", "Radio", "Central Locking", "Jack", "Spare Tire"],
      seller: "3RD PARTY seller"
    },
    {
      id: 6,
      title: "2019 HONDA ACCORD SALVAGE",
      price: "$5,200",
      totalPrice: "$7,100",
      image: "/images/salvage/honda-accord-salvage.jpg",
      stockNo: "SV006",
      mileage: "45,000 km",
      year: "2019",
      engine: "2,000cc",
      transmission: "AT",
      location: "Japan",
      color: "Gray",
      fuel: "Petrol",
      drive: "2WD",
      seats: "5",
      doors: "4",
      steering: "Left",
      chassisNo: "1HGCV2F30KA123456",
      engineCode: "-",
      modelCode: "0",
      registrationYear: "2019/-",
      manufactureYear: "N/A",
      dimension: "3.90×1.85×1.45 m",
      weight: "1,500 kg",
      maxCap: "5 persons",
      condition: "Minor front damage, excellent mechanical condition. Great for restoration.",
      features: ["Power Steering", "A/C", "Airbag", "Radio", "Central Locking", "Jack", "Spare Tire"],
      seller: "3RD PARTY seller"
    }
  ];

  const SalvageCard = ({ vehicle }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={vehicle.image} 
          alt={vehicle.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-vehicle.jpg';
          }}
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
          {vehicle.stockNo}
        </div>
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
          20 pts
        </div>
        <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
          SALVAGE
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">Ref No. {vehicle.stockNo}</div>
        <div className="text-xs text-gray-500 mb-3">{vehicle.seller}</div>
        
        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">
          {vehicle.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div>Mileage: {vehicle.mileage}</div>
          <div>Year: {vehicle.year}</div>
          <div>Engine: {vehicle.engine}</div>
          <div>Trans: {vehicle.transmission}</div>
          <div>Location: {vehicle.location}</div>
          <div>Model code: {vehicle.modelCode}</div>
          <div>Engine code: {vehicle.engineCode}</div>
          <div>Steering: {vehicle.steering}</div>
          <div>Color: {vehicle.color}</div>
          <div>Fuel: {vehicle.fuel}</div>
          <div>Drive: {vehicle.drive}</div>
          <div>Seats: {vehicle.seats}</div>
          <div>Doors: {vehicle.doors}</div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Features:</div>
          <div className="flex flex-wrap gap-1">
            {vehicle.features.slice(0, 5).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
            <span className="text-blue-600 text-xs">and more...</span>
          </div>
        </div>

        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <div className="text-sm font-medium text-yellow-800 mb-1">Condition:</div>
          <div className="text-xs text-yellow-700">{vehicle.condition}</div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-red-600">{vehicle.price}</span>
            <span className="text-sm text-gray-500">Total: {vehicle.totalPrice}</span>
          </div>
          <div className="text-xs text-gray-500 mb-3">CIF to Bahrain (RORO)</div>
          
          <div className="flex gap-2">
            <Link 
              href={`/inventory/salvage/${vehicle.id}`}
              className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              INQUIRY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const SalvageListItem = ({ vehicle }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        <div className="w-1/3 relative">
          <img 
            src={vehicle.image} 
            alt={vehicle.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = '/images/placeholder-vehicle.jpg';
            }}
          />
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
            {vehicle.stockNo}
          </div>
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
            20 pts
          </div>
          <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            SALVAGE
          </div>
        </div>
        
        <div className="w-2/3 p-4">
          <div className="text-xs text-gray-500 mb-2">Ref No. {vehicle.stockNo}</div>
          <div className="text-xs text-gray-500 mb-3">{vehicle.seller}</div>
          
          <h3 className="font-semibold text-gray-800 mb-3">
            {vehicle.title}
          </h3>
          
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
            <div>Mileage: {vehicle.mileage}</div>
            <div>Year: {vehicle.year}</div>
            <div>Engine: {vehicle.engine}</div>
            <div>Trans: {vehicle.transmission}</div>
            <div>Location: {vehicle.location}</div>
            <div>Color: {vehicle.color}</div>
            <div>Fuel: {vehicle.fuel}</div>
            <div>Drive: {vehicle.drive}</div>
            <div>Seats: {vehicle.seats}</div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">Features:</div>
            <div className="flex flex-wrap gap-1">
              {vehicle.features.slice(0, 8).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {feature}
                </span>
              ))}
              <span className="text-blue-600 text-xs">and more...</span>
            </div>
          </div>

          <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-sm font-medium text-yellow-800 mb-1">Condition:</div>
            <div className="text-xs text-yellow-700">{vehicle.condition}</div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-red-600">{vehicle.price}</span>
              <div className="text-xs text-gray-500">Total: {vehicle.totalPrice}</div>
            </div>
            
            <Link 
              href={`/inventory/salvage/${vehicle.id}`}
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
              <h1 className="text-3xl font-bold text-gray-900">Salvage Vehicles</h1>
              <p className="text-gray-600 mt-2">Browse our selection of salvage vehicles for parts or restoration</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
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
                  placeholder="Search salvage vehicles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
              {salvageVehicles.length} salvage vehicles found
            </h2>
          </div>
        </div>

        {/* Salvage Vehicles Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {salvageVehicles.map((vehicle) => (
            viewMode === 'grid' ? (
              <SalvageCard key={vehicle.id} vehicle={vehicle} />
            ) : (
              <SalvageListItem key={vehicle.id} vehicle={vehicle} />
            )
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md">
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

export default SalvagePage; 