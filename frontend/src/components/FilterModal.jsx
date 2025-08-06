"use client";
import { useState, useEffect } from 'react';

const FilterModal = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    modelCode: '',
    fuelType: '',
    priceFrom: '',
    priceTo: '',
    bodyType: '',
    steering: '',
    transmission: '',
    yearFrom: '',
    yearTo: '',
    mileageFrom: '',
    mileageTo: '',
    engineFrom: '',
    engineTo: '',
    drivetrain: '',
    color: '',
    stockCountry: '',
    stockLocation: '',
    capacityFrom: '',
    capacityTo: '',
    subBodyType: '',
    machineryType: '',
    bikeType: '',
    // Feature checkboxes
    cdPlayer: false,
    sunRoof: false,
    leatherSeat: false,
    alloyWheels: false,
    powerSteering: false,
    powerWindow: false,
    ac: false,
    abs: false,
    airbag: false,
    radio: false,
    cdChanger: false,
    dvd: false,
    tv: false,
    powerSeat: false,
    backTire: false,
    grillGuard: false,
    rearSpoiler: false,
    centralLocking: false,
    jack: false,
    spareTire: false,
    wheelSpanner: false,
    fogLights: false,
    backCamera: false,
    pushStart: false,
    keylessEntry: false,
    esc: false,
    camera360: false,
    bodyKit: false,
    sideAirbag: false,
    powerMirror: false,
    sideSkirts: false,
    frontLipSpoiler: false,
    navigation: false,
    turbo: false,
    powerSlideDoor: false
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const makes = [
    "Toyota", "Nissan", "Honda", "Mazda", "Mitsubishi", "Subaru", "Suzuki", 
    "Isuzu", "Daihatsu", "Hino", "Lexus", "Mercedes-Benz", "BMW", "Volkswagen", 
    "Audi", "Peugeot", "Ford", "Volvo", "Land Rover", "Jaguar", "Jeep", 
    "Chevrolet", "Hyundai", "Kia", "Ssangyong", "Renault Samsung"
  ];

  const bodyTypes = [
    "SUV", "Truck", "Pick up", "Van", "Sedan", "Bus", "Mini Van", "Hatchback", 
    "Coupe", "Convertible", "Wagon", "Mini Bus", "Machinery", "Forklift", 
    "Tractor", "Tractor Head", "Motorcycle"
  ];

  const fuelTypes = ["HYBRID", "ELECTRIC", "PETROL", "DIESEL", "PETROL-HYBRID", "DIESEL-HYBRID", "LPG"];
  const transmissions = ["Semi Auto", "Automatic", "Manual", "Unspecified"];
  const steeringOptions = ["left", "right", "center"];
  const drivetrainOptions = ["4 Wheel drive", "2 Wheel drive"];
  const colors = ["White", "Black", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Brown", "Pink", "Gold", "Bronze", "Other"];
  
  const stockCountries = ["Japan", "Korea", "USA", "Germany", "UK", "Australia", "Thailand", "Singapore", "UAE", "Other"];
  const stockLocations = ["Tokyo", "Seoul", "Los Angeles", "Hamburg", "London", "Sydney", "Bangkok", "Singapore", "Dubai", "Other"];

  const subBodyTypes = [
    "Tow Truck", "Wingbody Truck", "Vacuum Truck", "Trailer Head Truck", "Tanker Trucks",
    "Semi-tractors", "Self Loader Truck", "Refrigerator Trucks", "Garbage Truck", "Flatbed Trucks",
    "Fire Fighting Truck", "Dump Trucks", "Drilling Truck", "Double Cabin Truck", "Concrete Pump Truck",
    "Concrete Mixer Truck", "Cargo Truck", "Car Carrier Truck", "Box Body Truck", "Aerial Work Platform"
  ];

  const machineryTypes = [
    "Excavator", "Dragline Excavator", "Backhoe", "Bulldozer", "Grader", "Wheel Tractor Scraper",
    "Trencher", "Loader", "Tower Crane", "Paver", "Stevens"
  ];

  const bikeTypes = [
    "Cruisers", "Sport bikes", "Touring motorcycles", "Dual sport", "Moped", "Scooter",
    "Adventure bikes", "Road bicycle", "Naked bikes", "Cafe Racer", "Dirt bike", "Vintage motorcycles",
    "Bobber Motorcycles", "Other types of motorcycles", "Electric motorcycles", "Standard bikes",
    "Standards", "Adventure or adv bikes", "Bagger motorcycles", "Choppers"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Filters applied:', filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      make: '',
      model: '',
      modelCode: '',
      fuelType: '',
      priceFrom: '',
      priceTo: '',
      bodyType: '',
      steering: '',
      transmission: '',
      yearFrom: '',
      yearTo: '',
      mileageFrom: '',
      mileageTo: '',
      engineFrom: '',
      engineTo: '',
      drivetrain: '',
      color: '',
      stockCountry: '',
      stockLocation: '',
      capacityFrom: '',
      capacityTo: '',
      subBodyType: '',
      machineryType: '',
      bikeType: '',
      cdPlayer: false,
      sunRoof: false,
      leatherSeat: false,
      alloyWheels: false,
      powerSteering: false,
      powerWindow: false,
      ac: false,
      abs: false,
      airbag: false,
      radio: false,
      cdChanger: false,
      dvd: false,
      tv: false,
      powerSeat: false,
      backTire: false,
      grillGuard: false,
      rearSpoiler: false,
      centralLocking: false,
      jack: false,
      spareTire: false,
      wheelSpanner: false,
      fogLights: false,
      backCamera: false,
      pushStart: false,
      keylessEntry: false,
      esc: false,
      camera360: false,
      bodyKit: false,
      sideAirbag: false,
      powerMirror: false,
      sideSkirts: false,
      frontLipSpoiler: false,
      navigation: false,
      turbo: false,
      powerSlideDoor: false
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 transition-all duration-300 ease-in-out z-50 p-4 flex items-center justify-center ${
        isOpen 
          ? 'bg-transparent backdrop-blur-sm' 
          : 'bg-transparent backdrop-blur-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`transition-all duration-300 ease-in-out transform ${
          isOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-4 opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">Advanced Vehicle Filter</h2>
              <button
                onClick={onClose}
                className="text-black hover:text-gray-700 text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-black">Basic Information</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Make</label>
                    <select
                      name="make"
                      value={filters.make}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Make</option>
                      {makes.map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={filters.model}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Enter model"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Model Code</label>
                    <input
                      type="text"
                      name="modelCode"
                      value={filters.modelCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Enter model code"
                    />
                  </div>
                </div>
              </div>

              {/* Price and Year Range */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-black">Price & Year Range</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Price From ($)</label>
                    <input
                      type="number"
                      name="priceFrom"
                      value={filters.priceFrom}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Min price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Price To ($)</label>
                    <input
                      type="number"
                      name="priceTo"
                      value={filters.priceTo}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Max price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Year From</label>
                    <input
                      type="number"
                      name="yearFrom"
                      value={filters.yearFrom}
                      onChange={handleInputChange}
                      min="1980"
                      max="2025"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="1980"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Year To</label>
                    <input
                      type="number"
                      name="yearTo"
                      value={filters.yearTo}
                      onChange={handleInputChange}
                      min="1980"
                      max="2025"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="2025"
                    />
                  </div>
                </div>
              </div>

              {/* Mileage and Engine */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-black">Mileage & Engine</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Mileage From (km)</label>
                    <input
                      type="number"
                      name="mileageFrom"
                      value={filters.mileageFrom}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Min mileage"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Mileage To (km)</label>
                    <input
                      type="number"
                      name="mileageTo"
                      value={filters.mileageTo}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Max mileage"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Engine From (cc)</label>
                    <input
                      type="number"
                      name="engineFrom"
                      value={filters.engineFrom}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Min engine cc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Engine To (cc)</label>
                    <input
                      type="number"
                      name="engineTo"
                      value={filters.engineTo}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Max engine cc"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Specifications */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-black">Vehicle Specifications</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Fuel Type</label>
                    <select
                      name="fuelType"
                      value={filters.fuelType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Fuel Type</option>
                      {fuelTypes.map((fuel, index) => (
                        <option key={index} value={fuel}>{fuel}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Transmission</label>
                    <select
                      name="transmission"
                      value={filters.transmission}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Transmission</option>
                      {transmissions.map((trans, index) => (
                        <option key={index} value={trans}>{trans}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Body Type</label>
                    <select
                      name="bodyType"
                      value={filters.bodyType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Body Type</option>
                      {bodyTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Steering</label>
                    <select
                      name="steering"
                      value={filters.steering}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Steering</option>
                      {steeringOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Drivetrain</label>
                    <select
                      name="drivetrain"
                      value={filters.drivetrain}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Drivetrain</option>
                      {drivetrainOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Color</label>
                    <select
                      name="color"
                      value={filters.color}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Color</option>
                      {colors.map((color, index) => (
                        <option key={index} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Capacity From</label>
                    <input
                      type="number"
                      name="capacityFrom"
                      value={filters.capacityFrom}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Min capacity"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Capacity To</label>
                    <input
                      type="number"
                      name="capacityTo"
                      value={filters.capacityTo}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder="Max capacity"
                    />
                  </div>
                </div>
              </div>

              {/* Stock Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-black">Stock Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Stock Country</label>
                    <select
                      name="stockCountry"
                      value={filters.stockCountry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Country</option>
                      {stockCountries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Stock Location</label>
                    <select
                      name="stockLocation"
                      value={filters.stockLocation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Location</option>
                      {stockLocations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Specialized Types */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-black">Specialized Types</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Sub Body Type</label>
                    <select
                      name="subBodyType"
                      value={filters.subBodyType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Sub Body Type</option>
                      {subBodyTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Machinery Type</label>
                    <select
                      name="machineryType"
                      value={filters.machineryType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Machinery Type</option>
                      {machineryTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Bike Type</label>
                    <select
                      name="bikeType"
                      value={filters.bikeType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    >
                      <option value="">Select Bike Type</option>
                      {bikeTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-black">Features</h3>
                <div className="grid md:grid-cols-4 gap-3">
                  {[
                    { name: 'cdPlayer', label: 'CD Player' },
                    { name: 'sunRoof', label: 'Sun Roof' },
                    { name: 'leatherSeat', label: 'Leather Seat' },
                    { name: 'alloyWheels', label: 'Alloy Wheels' },
                    { name: 'powerSteering', label: 'Power Steering' },
                    { name: 'powerWindow', label: 'Power Window' },
                    { name: 'ac', label: 'A/C' },
                    { name: 'abs', label: 'ABS' },
                    { name: 'airbag', label: 'Airbag' },
                    { name: 'radio', label: 'Radio' },
                    { name: 'cdChanger', label: 'CD Changer' },
                    { name: 'dvd', label: 'DVD' },
                    { name: 'tv', label: 'TV' },
                    { name: 'powerSeat', label: 'Power Seat' },
                    { name: 'backTire', label: 'Back Tire' },
                    { name: 'grillGuard', label: 'Grill Guard' },
                    { name: 'rearSpoiler', label: 'Rear Spoiler' },
                    { name: 'centralLocking', label: 'Central Locking' },
                    { name: 'jack', label: 'Jack' },
                    { name: 'spareTire', label: 'Spare Tire' },
                    { name: 'wheelSpanner', label: 'Wheel Spanner' },
                    { name: 'fogLights', label: 'Fog Lights' },
                    { name: 'backCamera', label: 'Back Camera' },
                    { name: 'pushStart', label: 'Push Start' },
                    { name: 'keylessEntry', label: 'Keyless Entry' },
                    { name: 'esc', label: 'ESC' },
                    { name: 'camera360', label: '360° Camera' },
                    { name: 'bodyKit', label: 'Body Kit' },
                    { name: 'sideAirbag', label: 'Side Airbag' },
                    { name: 'powerMirror', label: 'Power Mirror' },
                    { name: 'sideSkirts', label: 'Side Skirts' },
                    { name: 'frontLipSpoiler', label: 'Front Lip Spoiler' },
                    { name: 'navigation', label: 'Navigation' },
                    { name: 'turbo', label: 'Turbo' },
                    { name: 'powerSlideDoor', label: 'Power Slide Door' }
                  ].map((feature) => (
                    <div key={feature.name} className="flex items-center">
                      <input
                        type="checkbox"
                        id={feature.name}
                        name={feature.name}
                        checked={filters[feature.name]}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={feature.name} className="ml-2 text-sm text-black">
                        {feature.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors bg-white"
                >
                  Reset All
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal; 