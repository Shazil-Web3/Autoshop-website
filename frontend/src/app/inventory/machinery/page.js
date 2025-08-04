"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import FilterModal from '../../../components/FilterModal';

const MachineryPage = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Sample construction machinery data
  const machinery = [
    {
      id: 1,
      title: "2019 CATERPILLAR EXCAVATOR 320",
      price: "$45,000",
      totalPrice: "$52,000",
      image: "/images/machinery/cat-excavator.jpg",
      stockNo: "CM001",
      mileage: "2,500 hours",
      year: "2019",
      engine: "6,000cc",
      transmission: "Hydraulic",
      location: "USA",
      color: "Yellow",
      fuel: "Diesel",
      drive: "4WD",
      seats: "1",
      doors: "1",
      steering: "Center",
      chassisNo: "CAT123456789",
      engineCode: "-",
      modelCode: "320",
      registrationYear: "2019/06",
      manufactureYear: "2019/05",
      dimension: "8.5×2.8×2.6 m",
      weight: "20,000 kg",
      maxCap: "20 tons",
      condition: "Excellent working condition. Well maintained with full service history.",
      features: ["Power Steering", "A/C", "ABS", "Radio", "Power Seat", "Grill Guard", "Fog Lights", "Back Camera", "Push Start", "ESC", "360° Camera", "Navigation", "Turbo"],
      seller: "3RD PARTY seller"
    },
    {
      id: 2,
      title: "2018 KOMATSU BULLDOZER D65",
      price: "$38,500",
      totalPrice: "$45,000",
      image: "/images/machinery/komatsu-bulldozer.jpg",
      stockNo: "CM002",
      mileage: "3,200 hours",
      year: "2018",
      engine: "7,500cc",
      transmission: "Power Shift",
      location: "Japan",
      color: "Yellow",
      fuel: "Diesel",
      drive: "4WD",
      seats: "1",
      doors: "1",
      steering: "Center",
      chassisNo: "KOM123456789",
      engineCode: "-",
      modelCode: "D65",
      registrationYear: "2018/08",
      manufactureYear: "2018/07",
      dimension: "7.2×3.2×3.1 m",
      weight: "18,500 kg",
      maxCap: "18 tons",
      condition: "Good working condition. Blade and tracks in excellent shape.",
      features: ["Power Steering", "A/C", "ABS", "Radio", "Power Seat", "Grill Guard", "Fog Lights", "Back Camera", "Push Start", "ESC", "Navigation", "Turbo"],
      seller: "3RD PARTY seller"
    },
    {
      id: 3,
      title: "2020 HITACHI WHEEL LOADER ZW220",
      price: "$52,000",
      totalPrice: "$59,000",
      image: "/images/machinery/hitachi-loader.jpg",
      stockNo: "CM003",
      mileage: "1,800 hours",
      year: "2020",
      engine: "5,500cc",
      transmission: "Automatic",
      location: "Japan",
      color: "Orange",
      fuel: "Diesel",
      drive: "4WD",
      seats: "1",
      doors: "1",
      steering: "Center",
      chassisNo: "HIT123456789",
      engineCode: "-",
      modelCode: "ZW220",
      registrationYear: "2020/03",
      manufactureYear: "2020/02",
      dimension: "9.1×2.8×3.2 m",
      weight: "22,000 kg",
      maxCap: "22 tons",
      condition: "Like new condition. Low hours, excellent for heavy lifting operations.",
      features: ["Power Steering", "A/C", "ABS", "Radio", "Power Seat", "Grill Guard", "Fog Lights", "Back Camera", "Push Start", "ESC", "360° Camera", "Navigation", "Turbo"],
      seller: "3RD PARTY seller"
    },
    {
      id: 4,
      title: "2017 VOLVO EXCAVATOR EC220",
      price: "$41,000",
      totalPrice: "$48,000",
      image: "/images/machinery/volvo-excavator.jpg",
      stockNo: "CM004",
      mileage: "4,500 hours",
      year: "2017",
      engine: "5,800cc",
      transmission: "Hydraulic",
      location: "Sweden",
      color: "Blue",
      fuel: "Diesel",
      drive: "4WD",
      seats: "1",
      doors: "1",
      steering: "Center",
      chassisNo: "VOL123456789",
      engineCode: "-",
      modelCode: "EC220",
      registrationYear: "2017/11",
      manufactureYear: "2017/10",
      dimension: "8.8×2.7×2.5 m",
      weight: "21,500 kg",
      maxCap: "21 tons",
      condition: "Reliable machine with good maintenance history. Ready for work.",
      features: ["Power Steering", "A/C", "ABS", "Radio", "Power Seat", "Grill Guard", "Fog Lights", "Back Camera", "Push Start", "ESC", "Navigation", "Turbo"],
      seller: "3RD PARTY seller"
    },
    {
      id: 5,
      title: "2019 LIEBHERR CRANE LTM 1050",
      price: "$85,000",
      totalPrice: "$95,000",
      image: "/images/machinery/liebherr-crane.jpg",
      stockNo: "CM005",
      mileage: "1,200 hours",
      year: "2019",
      engine: "8,000cc",
      transmission: "Automatic",
      location: "Germany",
      color: "Yellow",
      fuel: "Diesel",
      drive: "4WD",
      seats: "2",
      doors: "2",
      steering: "Center",
      chassisNo: "LIE123456789",
      engineCode: "-",
      modelCode: "LTM 1050",
      registrationYear: "2019/04",
      manufactureYear: "2019/03",
      dimension: "12.5×2.5×3.8 m",
      weight: "48,000 kg",
      maxCap: "50 tons",
      condition: "Professional crane in excellent condition. Perfect for construction projects.",
      features: ["Power Steering", "A/C", "ABS", "Radio", "Power Seat", "Grill Guard", "Fog Lights", "Back Camera", "Push Start", "ESC", "360° Camera", "Navigation", "Turbo"],
      seller: "3RD PARTY seller"
    },
    {
      id: 6,
      title: "2018 DOOSAN EXCAVATOR DX300",
      price: "$35,000",
      totalPrice: "$42,000",
      image: "/images/machinery/doosan-excavator.jpg",
      stockNo: "CM006",
      mileage: "3,800 hours",
      year: "2018",
      engine: "5,200cc",
      transmission: "Hydraulic",
      location: "Korea",
      color: "Orange",
      fuel: "Diesel",
      drive: "4WD",
      seats: "1",
      doors: "1",
      steering: "Center",
      chassisNo: "DOO123456789",
      engineCode: "-",
      modelCode: "DX300",
      registrationYear: "2018/09",
      manufactureYear: "2018/08",
      dimension: "8.2×2.6×2.4 m",
      weight: "19,800 kg",
      maxCap: "20 tons",
      condition: "Solid machine with good performance. Ideal for medium excavation work.",
      features: ["Power Steering", "A/C", "ABS", "Radio", "Power Seat", "Grill Guard", "Fog Lights", "Back Camera", "Push Start", "ESC", "Navigation", "Turbo"],
      seller: "3RD PARTY seller"
    }
  ];

  const MachineryCard = ({ machine }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={machine.image} 
          alt={machine.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-vehicle.jpg';
          }}
        />
        <div className="absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs">
          {machine.stockNo}
        </div>
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
          20 pts
        </div>
        <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
          MACHINERY
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">Ref No. {machine.stockNo}</div>
        <div className="text-xs text-gray-500 mb-3">{machine.seller}</div>
        
        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">
          {machine.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div>Hours: {machine.mileage}</div>
          <div>Year: {machine.year}</div>
          <div>Engine: {machine.engine}</div>
          <div>Trans: {machine.transmission}</div>
          <div>Location: {machine.location}</div>
          <div>Model code: {machine.modelCode}</div>
          <div>Engine code: {machine.engineCode}</div>
          <div>Steering: {machine.steering}</div>
          <div>Color: {machine.color}</div>
          <div>Fuel: {machine.fuel}</div>
          <div>Drive: {machine.drive}</div>
          <div>Capacity: {machine.maxCap}</div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Features:</div>
          <div className="flex flex-wrap gap-1">
            {machine.features.slice(0, 5).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
            <span className="text-blue-600 text-xs">and more...</span>
          </div>
        </div>

        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded">
          <div className="text-sm font-medium text-green-800 mb-1">Working Condition:</div>
          <div className="text-xs text-green-700">{machine.condition}</div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-red-600">{machine.price}</span>
            <span className="text-sm text-gray-500">Total: {machine.totalPrice}</span>
          </div>
          <div className="text-xs text-gray-500 mb-3">CIF to Bahrain (RORO)</div>
          
          <div className="flex gap-2">
            <Link 
              href={`/inventory/machinery/${machine.id}`}
              className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              INQUIRY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const MachineryListItem = ({ machine }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        <div className="w-1/3 relative">
          <img 
            src={machine.image} 
            alt={machine.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = '/images/placeholder-vehicle.jpg';
            }}
          />
          <div className="absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs">
            {machine.stockNo}
          </div>
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
            20 pts
          </div>
          <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
            MACHINERY
          </div>
        </div>
        
        <div className="w-2/3 p-4">
          <div className="text-xs text-gray-500 mb-2">Ref No. {machine.stockNo}</div>
          <div className="text-xs text-gray-500 mb-3">{machine.seller}</div>
          
          <h3 className="font-semibold text-gray-800 mb-3">
            {machine.title}
          </h3>
          
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
            <div>Hours: {machine.mileage}</div>
            <div>Year: {machine.year}</div>
            <div>Engine: {machine.engine}</div>
            <div>Trans: {machine.transmission}</div>
            <div>Location: {machine.location}</div>
            <div>Capacity: {machine.maxCap}</div>
            <div>Fuel: {machine.fuel}</div>
            <div>Drive: {machine.drive}</div>
            <div>Weight: {machine.weight}</div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">Features:</div>
            <div className="flex flex-wrap gap-1">
              {machine.features.slice(0, 8).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {feature}
                </span>
              ))}
              <span className="text-blue-600 text-xs">and more...</span>
            </div>
          </div>

          <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded">
            <div className="text-sm font-medium text-green-800 mb-1">Working Condition:</div>
            <div className="text-xs text-green-700">{machine.condition}</div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-red-600">{machine.price}</span>
              <div className="text-xs text-gray-500">Total: {machine.totalPrice}</div>
            </div>
            
            <Link 
              href={`/inventory/machinery/${machine.id}`}
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
              <h1 className="text-3xl font-bold text-gray-900">Construction Machinery</h1>
              <p className="text-gray-600 mt-2">Browse our selection of heavy construction equipment</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
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
                  placeholder="Search machinery..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="hours-low">Hours: Low to High</option>
                <option value="hours-high">Hours: High to Low</option>
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
              {machinery.length} machinery items found
            </h2>
          </div>
        </div>

        {/* Machinery Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {machinery.map((machine) => (
            viewMode === 'grid' ? (
              <MachineryCard key={machine.id} machine={machine} />
            ) : (
              <MachineryListItem key={machine.id} machine={machine} />
            )
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-yellow-600 border border-yellow-600 rounded-md">
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

export default MachineryPage; 