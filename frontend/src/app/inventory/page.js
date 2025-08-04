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
      image: "/4.jpg",
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
      image: "/5.jpeg",
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
      image: "/6.jpeg",
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
      image: "/7.jpeg",
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
      title: "2020 HONDA CBR 600RR",
      price: "$12,000",
      totalPrice: "$14,500",
      image: "/4.jpg",
      stockNo: "BK001",
      mileage: "8,500 km",
      year: "2020",
      engine: "599cc",
      transmission: "6-speed",
      location: "Japan",
      color: "Red",
      fuel: "Petrol",
      condition: "Mint condition, low mileage"
    }
  ];

  const VehicleCard = ({ vehicle, type }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Car Image Section */}
        <div className="relative w-full lg:w-48 flex-shrink-0">
          <div className="relative">
            <img 
              src={vehicle.image} 
              alt={vehicle.title}
              className="w-full h-36 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/images/placeholder-vehicle.jpg';
              }}
            />
            {/* Heart Icon */}
            <button className="absolute top-2 left-2 text-gray-400 hover:text-red-500 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Badge */}
            <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded font-medium">
              {vehicle.year}
            </span>
          </div>
          <div className="mt-3 text-sm">
            <div className="font-medium text-black">Ref No. {vehicle.stockNo}</div>
            <div className="text-xs text-black mt-1">
              <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs inline-block">{type.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer mb-3">
              {vehicle.title}
            </h3>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-black text-xs font-medium">Mileage</span>
                <div className="font-bold text-base text-black">{vehicle.mileage}</div>
              </div>
              <div>
                <span className="text-black text-xs font-medium">Year</span>
                <div className="font-medium text-black">{vehicle.year}</div>
              </div>
              <div>
                <span className="text-black text-xs font-medium">Engine</span>
                <div className="font-medium text-black">{vehicle.engine}</div>
              </div>
              <div>
                <span className="text-black text-xs font-medium">Trans</span>
                <div className="font-medium text-black">{vehicle.transmission}</div>
              </div>
              <div>
                <span className="text-black text-xs font-medium">Location</span>
                <div className="font-medium text-black flex items-center gap-1">
                  <span>🇰🇷</span> {vehicle.location}
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-xs font-medium text-center">
                Model code
              </div>
              <div className="bg-white px-3 py-2 rounded text-xs font-medium text-black text-center">
                -
              </div>
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-xs font-medium text-center">
                Steering
              </div>
              <div className="bg-white px-3 py-2 rounded text-xs font-medium text-black text-center">
                Left
              </div>
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-xs font-medium text-center">
                Fuel
              </div>
              <div className="bg-white px-3 py-2 rounded text-xs font-medium text-black text-center">
                {vehicle.fuel}
              </div>
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-xs font-medium text-center">
                Seats
              </div>
              <div className="bg-white px-3 py-2 rounded text-xs font-medium text-black text-center">
                {vehicle.seats || "ASK"}
              </div>
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-xs font-medium text-center">
                Engine code
              </div>
              <div className="bg-white px-3 py-2 rounded text-xs font-medium text-black text-center">
                -
              </div>
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-xs font-medium text-center">
                Color
              </div>
              <div className="bg-white px-3 py-2 rounded text-xs font-medium text-black text-center">
                {vehicle.color}
              </div>
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-xs font-medium text-center">
                Drive
              </div>
              <div className="bg-white px-3 py-2 rounded text-xs font-medium text-black text-center">
                {vehicle.drive || "ASK"}
              </div>
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-xs font-medium text-center">
                Doors
              </div>
              <div className="bg-white px-3 py-2 rounded text-xs font-medium text-black text-center">
                {vehicle.doors || "ASK"}
              </div>
            </div>
            <div className="mt-3 text-xs text-black">
              {vehicle.features ? vehicle.features.slice(0, 6).join(", ") : "Power Steering, AC, Airbag, Leather Seat, Back Camera"} 
              <Link 
                href={`/inventory/${type.toLowerCase()}/${vehicle.id}`}
                className="text-blue-600 cursor-pointer hover:underline ml-1"
              >
                and more...
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="w-full lg:w-48 flex-shrink-0 text-right">
          <div className="mb-3">
            <span className="text-black text-xs font-medium">Price</span>
            <div className="text-red-600 text-xl font-bold">{vehicle.price}</div>
            {vehicle.originalPrice && (
              <div className="text-xs text-gray-400 line-through">{vehicle.originalPrice}</div>
            )}
          </div>
          <div className="mb-4">
            <span className="text-black text-xs font-medium">Total Price</span>
            <div className="text-red-600 text-base font-semibold">{vehicle.totalPrice}</div>
            <div className="text-xs text-black">CIF to Bahrain (RO/RO)</div>
          </div>
          <Link 
            href={`/inventory/${type.toLowerCase()}/${vehicle.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium w-full inline-block text-center transition-colors"
          >
            <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            INQUIRY
          </Link>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, count, isOpen, onToggle, icon }) => (
    <div 
      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-bold text-black">{title}</h2>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
          {count}
        </span>
      </div>
      {isOpen ? (
        <ChevronUpIcon className="h-6 w-6 text-black" />
      ) : (
        <ChevronDownIcon className="h-6 w-6 text-black" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-black">Inventory</h1>
          <p className="text-black mt-2">Browse our extensive collection of vehicles, machinery, and parts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stock Cars Section */}
          <div>
            <SectionHeader
              title="Stock Cars"
              count={stockCars.length}
              icon="🚗"
              isOpen={openSections.stockCars}
              onToggle={() => toggleSection('stockCars')}
            />
            {openSections.stockCars && (
              <div className="mt-4 space-y-6">
                {stockCars.map((car) => (
                  <VehicleCard key={car.id} vehicle={car} type="Stock Car" />
                ))}
              </div>
            )}
          </div>

          {/* Salvage Vehicles Section */}
          <div>
            <SectionHeader
              title="Salvage Vehicles"
              count={salvageVehicles.length}
              icon="🚛"
              isOpen={openSections.salvageVehicles}
              onToggle={() => toggleSection('salvageVehicles')}
            />
            {openSections.salvageVehicles && (
              <div className="mt-4 space-y-6">
                {salvageVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} type="Salvage" />
                ))}
              </div>
            )}
          </div>

          {/* Construction Machinery Section */}
          <div>
            <SectionHeader
              title="Construction Machinery"
              count={constructionMachinery.length}
              icon="🏗️"
              isOpen={openSections.constructionMachinery}
              onToggle={() => toggleSection('constructionMachinery')}
            />
            {openSections.constructionMachinery && (
              <div className="mt-4 space-y-6">
                {constructionMachinery.map((machinery) => (
                  <VehicleCard key={machinery.id} vehicle={machinery} type="Machinery" />
                ))}
              </div>
            )}
          </div>

          {/* Bikes Section */}
          <div>
            <SectionHeader
              title="Motorcycles"
              count={bikes.length}
              icon="🏍️"
              isOpen={openSections.bikes}
              onToggle={() => toggleSection('bikes')}
            />
            {openSections.bikes && (
              <div className="mt-4 space-y-6">
                {bikes.map((bike) => (
                  <VehicleCard key={bike.id} vehicle={bike} type="Motorcycle" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage; 