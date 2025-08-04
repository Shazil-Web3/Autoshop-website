"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useGlobalState } from '../../context/GlobalStateContext';

const InventoryPage = () => {
  const { inventory } = useGlobalState();
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

  const VehicleCard = ({ vehicle, type }) => (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Car Image Section */}
        <div className="relative w-full lg:w-64 flex-shrink-0">
          <div className="relative">
            <img 
              src={vehicle.image} 
              alt={vehicle.title}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/images/placeholder-vehicle.jpg';
              }}
            />
            {/* Heart Icon */}
            <button className="absolute top-3 left-3 text-gray-400 hover:text-red-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Badge */}
            <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 text-sm rounded font-medium">
              {vehicle.year}
            </span>
          </div>
          <div className="mt-4 text-base">
            <div className="font-medium text-black">Ref No. {vehicle.stockNo}</div>
            <div className="text-sm text-black mt-2">
              <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm inline-block">{type.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-blue-600 text-xl font-medium hover:underline cursor-pointer mb-4">
              {vehicle.title}
            </h3>
            <div className="flex flex-wrap gap-8 text-base">
              <div>
                <span className="text-black text-sm font-medium">Mileage</span>
                <div className="font-bold text-lg text-black">{vehicle.mileage}</div>
              </div>
              <div>
                <span className="text-black text-sm font-medium">Year</span>
                <div className="font-medium text-lg text-black">{vehicle.year}</div>
              </div>
              <div>
                <span className="text-black text-sm font-medium">Engine</span>
                <div className="font-medium text-lg text-black">{vehicle.engine}</div>
              </div>
              <div>
                <span className="text-black text-sm font-medium">Trans</span>
                <div className="font-medium text-lg text-black">{vehicle.transmission}</div>
              </div>
              <div>
                <span className="text-black text-sm font-medium">Location</span>
                <div className="font-medium text-lg text-black flex items-center gap-2">
                  <span>🇰🇷</span> {vehicle.location}
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2 text-sm bg-gray-100 text-gray-600 font-normal">Model code</td>
                <td className="border border-gray-200 p-2 text-sm bg-white text-gray-700 font-medium">-</td>
                <td className="border border-gray-200 p-2 text-sm bg-gray-100 text-gray-600 font-normal">Steering</td>
                <td className="border border-gray-200 p-2 text-sm bg-white text-gray-700 font-medium">Left</td>
                <td className="border border-gray-200 p-2 text-sm bg-gray-100 text-gray-600 font-normal">Fuel</td>
                <td className="border border-gray-200 p-2 text-sm bg-white text-gray-700 font-medium">{vehicle.fuel}</td>
                <td className="border border-gray-200 p-2 text-sm bg-gray-100 text-gray-600 font-normal">Seats</td>
                <td className="border border-gray-200 p-2 text-sm bg-white text-gray-700 font-medium">{vehicle.seats || "ASK"}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2 text-sm bg-gray-100 text-gray-600 font-normal">Engine code</td>
                <td className="border border-gray-200 p-2 text-sm bg-white text-gray-700 font-medium">-</td>
                <td className="border border-gray-200 p-2 text-sm bg-gray-100 text-gray-600 font-normal">Color</td>
                <td className="border border-gray-200 p-2 text-sm bg-white text-gray-700 font-medium">{vehicle.color}</td>
                <td className="border border-gray-200 p-2 text-sm bg-gray-100 text-gray-600 font-normal">Drive</td>
                <td className="border border-gray-200 p-2 text-sm bg-white text-gray-700 font-medium">{vehicle.drive || "ASK"}</td>
                <td className="border border-gray-200 p-2 text-sm bg-gray-100 text-gray-600 font-normal">Doors</td>
                <td className="border border-gray-200 p-2 text-sm bg-white text-gray-700 font-medium">{vehicle.doors || "ASK"}</td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-3 text-sm text-gray-600">
            {vehicle.features ? vehicle.features.slice(0, 6).join(", ") : "Power Steering, AC, Airbag, Leather Seat, Back Camera"} 
            <Link 
              href={`/inventory/${type.toLowerCase()}/${vehicle.id}`}
              className="text-blue-600 cursor-pointer hover:underline ml-1"
            >
              and more...
            </Link>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="w-full lg:w-56 flex-shrink-0 text-right">
          <div className="mb-4">
            <span className="text-black text-sm font-medium">Price</span>
            <div className="text-red-600 text-2xl font-bold">{vehicle.price}</div>
            {vehicle.originalPrice && (
              <div className="text-sm text-gray-400 line-through">{vehicle.originalPrice}</div>
            )}
          </div>
          <div className="mb-6">
            <span className="text-black text-sm font-medium">Total Price</span>
            <div className="text-red-600 text-lg font-semibold">{vehicle.totalPrice}</div>
            <div className="text-sm text-black">CIF to Bahrain (RO/RO)</div>
          </div>
          <Link 
            href={`/inventory/${type.toLowerCase()}/${vehicle.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded text-base font-medium w-full inline-block text-center transition-colors"
          >
            <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
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
      className="flex items-center justify-between p-6 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center space-x-4">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-base font-medium">
          {count}
        </span>
      </div>
      {isOpen ? (
        <ChevronUpIcon className="h-7 w-7 text-black" />
      ) : (
        <ChevronDownIcon className="h-7 w-7 text-black" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-black">Inventory</h1>
              <p className="text-black mt-3 text-lg">Browse our extensive collection of vehicles, machinery, and parts</p>
            </div>
            <Link 
              href="/admin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Product</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stock Cars Section */}
          <div>
            <SectionHeader
              title="Stock Cars"
              count={inventory.stockCars.length}
              icon="🚗"
              isOpen={openSections.stockCars}
              onToggle={() => toggleSection('stockCars')}
            />
            {openSections.stockCars && (
              <div className="mt-6 space-y-8">
                {inventory.stockCars.map((car) => (
                  <VehicleCard key={car.id} vehicle={car} type="Stock Car" />
                ))}
              </div>
            )}
          </div>

          {/* Salvage Vehicles Section */}
          <div>
            <SectionHeader
              title="Salvage Vehicles"
              count={inventory.salvageVehicles.length}
              icon="🚛"
              isOpen={openSections.salvageVehicles}
              onToggle={() => toggleSection('salvageVehicles')}
            />
            {openSections.salvageVehicles && (
              <div className="mt-6 space-y-8">
                {inventory.salvageVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} type="Salvage" />
                ))}
              </div>
            )}
          </div>

          {/* Construction Machinery Section */}
          <div>
            <SectionHeader
              title="Construction Machinery"
              count={inventory.constructionMachinery.length}
              icon="🏗️"
              isOpen={openSections.constructionMachinery}
              onToggle={() => toggleSection('constructionMachinery')}
            />
            {openSections.constructionMachinery && (
              <div className="mt-6 space-y-8">
                {inventory.constructionMachinery.map((machinery) => (
                  <VehicleCard key={machinery.id} vehicle={machinery} type="Machinery" />
                ))}
              </div>
            )}
          </div>

          {/* Bikes Section */}
          <div>
            <SectionHeader
              title="Motorcycles"
              count={inventory.bikes.length}
              icon="🏍️"
              isOpen={openSections.bikes}
              onToggle={() => toggleSection('bikes')}
            />
            {openSections.bikes && (
              <div className="mt-6 space-y-8">
                {inventory.bikes.map((bike) => (
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