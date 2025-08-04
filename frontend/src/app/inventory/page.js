"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const InventoryPage = () => {
  const [openSections, setOpenSections] = useState({
    stockCars: true,
    salvageVehicles: false,
    constructionMachinery: false,
    bikes: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sample data - in real app, this would come from API
  const stockCars = [
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
      features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Sun Roof", "Radio", "Push Start", "Power Seat"]
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
      features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Sun Roof", "Radio", "Push Start", "Power Seat"]
    }
  ];

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
      condition: "Front end damage, engine intact"
    }
  ];

  const constructionMachinery = [
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
      capacity: "20 tons",
      condition: "Excellent working condition"
    }
  ];

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
      features: ["ABS", "Traction Control", "LED Headlight", "Digital Display", "Sport Mode"]
    }
  ];

  const VehicleCard = ({ vehicle, type }) => (
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
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
          {vehicle.stockNo}
        </div>
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
          20 pts
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {vehicle.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div>Mileage: {vehicle.mileage}</div>
          <div>Year: {vehicle.year}</div>
          <div>Engine: {vehicle.engine}</div>
          <div>Trans: {vehicle.transmission}</div>
          <div>Location: {vehicle.location}</div>
          <div>Color: {vehicle.color}</div>
          <div>Fuel: {vehicle.fuel}</div>
          <div>Drive: {vehicle.drive}</div>
          <div>Seats: {vehicle.seats}</div>
          <div>Doors: {vehicle.doors}</div>
        </div>

        {vehicle.features && (
          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">Features:</div>
            <div className="flex flex-wrap gap-1">
              {vehicle.features.slice(0, 5).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {feature}
                </span>
              ))}
              {vehicle.features.length > 5 && (
                <span className="text-blue-600 text-xs">and more...</span>
              )}
            </div>
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-red-600">{vehicle.price}</span>
            <span className="text-sm text-gray-500">Total: {vehicle.totalPrice}</span>
          </div>
          <div className="text-xs text-gray-500 mb-3">CIF to Bahrain (RORO)</div>
          
          <div className="flex gap-2">
            <Link 
              href={`/inventory/${type}/${vehicle.id}`}
              className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              INQUIRY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, count, isOpen, onToggle, icon }) => (
    <div 
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-lg cursor-pointer hover:from-blue-700 hover:to-blue-900 transition-all duration-200"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon}
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
            {count} items
          </span>
        </div>
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6" />
        ) : (
          <ChevronDownIcon className="h-6 w-6" />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-2">Browse our comprehensive selection of vehicles and machinery</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stock Cars Section */}
        <div className="mb-8">
          <SectionHeader
            title="Stock Cars"
            count={stockCars.length}
            isOpen={openSections.stockCars}
            onToggle={() => toggleSection('stockCars')}
            icon={<span className="text-2xl">🚗</span>}
          />
          
          {openSections.stockCars && (
            <div className="bg-white rounded-b-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stockCars.map((car) => (
                  <VehicleCard key={car.id} vehicle={car} type="cars" />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link 
                  href="/inventory/cars"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  View All Stock Cars
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Salvage Vehicles Section */}
        <div className="mb-8">
          <SectionHeader
            title="Salvage Vehicles"
            count={salvageVehicles.length}
            isOpen={openSections.salvageVehicles}
            onToggle={() => toggleSection('salvageVehicles')}
            icon={<span className="text-2xl">🚙</span>}
          />
          
          {openSections.salvageVehicles && (
            <div className="bg-white rounded-b-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {salvageVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} type="salvage" />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link 
                  href="/inventory/salvage"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                >
                  View All Salvage Vehicles
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Construction Machinery Section */}
        <div className="mb-8">
          <SectionHeader
            title="Construction Machinery"
            count={constructionMachinery.length}
            isOpen={openSections.constructionMachinery}
            onToggle={() => toggleSection('constructionMachinery')}
            icon={<span className="text-2xl">🚜</span>}
          />
          
          {openSections.constructionMachinery && (
            <div className="bg-white rounded-b-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {constructionMachinery.map((machinery) => (
                  <VehicleCard key={machinery.id} vehicle={machinery} type="machinery" />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link 
                  href="/inventory/machinery"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors"
                >
                  View All Construction Machinery
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bikes Section */}
        <div className="mb-8">
          <SectionHeader
            title="Stock Bikes"
            count={bikes.length}
            isOpen={openSections.bikes}
            onToggle={() => toggleSection('bikes')}
            icon={<span className="text-2xl">🏍️</span>}
          />
          
          {openSections.bikes && (
            <div className="bg-white rounded-b-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bikes.map((bike) => (
                  <VehicleCard key={bike.id} vehicle={bike} type="bikes" />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link 
                  href="/inventory/bikes"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  View All Bikes
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Parts Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Auto Parts</h2>
            <p className="text-gray-600 mb-6">Search for new and used auto parts by make, model, and category</p>
            <Link 
              href="/inventory/parts"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Browse Auto Parts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage; 