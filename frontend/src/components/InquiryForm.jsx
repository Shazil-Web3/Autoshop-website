"use client";
import { useState } from 'react';

const InquiryForm = ({ productInfo = null, onClose = null }) => {
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    tel: '',
    address: '',
    
    // Destination Information
    destinationCountry: '',
    destinationPort: '',
    
    // Vehicle Information (pre-filled if productInfo is provided)
    make: productInfo?.make || '',
    bodyType: '',
    transmission: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: '',
    mileageFrom: '',
    mileageTo: '',
    steering: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Inquiry submitted:', formData);
    alert('Inquiry submitted successfully! We will contact you soon.');
    if (onClose) onClose();
  };

  const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", 
    "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark", 
    "Finland", "Poland", "Czech Republic", "Hungary", "Romania", "Bulgaria", "Greece", 
    "Portugal", "Ireland", "Luxembourg", "Slovakia", "Slovenia", "Croatia", "Estonia", 
    "Latvia", "Lithuania", "Malta", "Cyprus", "Australia", "New Zealand", "Japan", 
    "South Korea", "China", "India", "Singapore", "Malaysia", "Thailand", "Vietnam", 
    "Philippines", "Indonesia", "Brazil", "Argentina", "Chile", "Mexico", "Colombia", 
    "Peru", "Venezuela", "Uruguay", "Paraguay", "Ecuador", "Bolivia", "Guyana", 
    "Suriname", "French Guiana", "South Africa", "Nigeria", "Kenya", "Ghana", 
    "Uganda", "Tanzania", "Ethiopia", "Morocco", "Egypt", "Tunisia", "Algeria", 
    "Libya", "Sudan", "Saudi Arabia", "UAE", "Qatar", "Kuwait", "Bahrain", "Oman", 
    "Yemen", "Jordan", "Lebanon", "Syria", "Iraq", "Iran", "Turkey", "Israel", 
    "Palestine", "Pakistan", "Afghanistan", "Bangladesh", "Sri Lanka", "Nepal", 
    "Bhutan", "Maldives", "Myanmar", "Cambodia", "Laos", "Mongolia", "Kazakhstan", 
    "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Azerbaijan", 
    "Georgia", "Armenia", "Ukraine", "Belarus", "Moldova", "Russia"
  ];

  const makes = [
    "Toyota", "Nissan", "Honda", "Mazda", "Mitsubishi", "Subaru", "Suzuki", 
    "Isuzu", "Daihatsu", "Hino", "Lexus", "Mercedes-Benz", "BMW", "Volkswagen", 
    "Audi", "Peugeot", "Ford", "Volvo", "Land Rover", "Jaguar", "Jeep", 
    "Chevrolet", "Hyundai", "Kia", "Ssangyong", "Renault Samsung", "Other"
  ];

  const bodyTypes = [
    "Sedan", "SUV", "Hatchback", "Wagon", "Coupe", "Convertible", "Pickup", 
    "Van", "Mini Van", "Bus", "Truck", "Machinery", "Motorcycle", "Other"
  ];

  const transmissions = [
    "Automatic", "Manual", "CVT", "Semi-Automatic", "Other"
  ];

  const steeringOptions = [
    "Left Hand Drive", "Right Hand Drive", "Either"
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <span className="font-medium">STEP 2</span>
          <span className="text-orange-500">&gt;</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-medium">GET A QUOTE</span>
        </div>
        
        <p className="text-sm text-gray-600 mt-3">Please fill the *required fields.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
            Your Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Tel *
              </label>
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Your Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Enter your address"
              />
            </div>
          </div>
        </div>

        {/* Destination Information */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
            Destination Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Destination Country *
              </label>
              <select
                name="destinationCountry"
                value={formData.destinationCountry}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              >
                <option value="">Select-Destination Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Destination Port *
              </label>
              <select
                name="destinationPort"
                value={formData.destinationPort}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              >
                <option value="">Select-Destination Port</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="New York">New York</option>
                <option value="Miami">Miami</option>
                <option value="Seattle">Seattle</option>
                <option value="Houston">Houston</option>
                <option value="Vancouver">Vancouver</option>
                <option value="Toronto">Toronto</option>
                <option value="Montreal">Montreal</option>
                <option value="London">London</option>
                <option value="Rotterdam">Rotterdam</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Antwerp">Antwerp</option>
                <option value="Dubai">Dubai</option>
                <option value="Singapore">Singapore</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Shanghai">Shanghai</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Sydney">Sydney</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
            Vehicle Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Make
              </label>
              <select
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              >
                <option value="">Make</option>
                {makes.map((make, index) => (
                  <option key={index} value={make}>{make}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Body Type
              </label>
              <select
                name="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              >
                <option value="">Make Body Type</option>
                {bodyTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              >
                <option value="">Transmission</option>
                {transmissions.map((trans, index) => (
                  <option key={index} value={trans}>{trans}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Steering
              </label>
              <select
                name="steering"
                value={formData.steering}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              >
                <option value="">Steering</option>
                {steeringOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Year Range */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Year From
              </label>
              <input
                type="number"
                name="yearFrom"
                value={formData.yearFrom}
                onChange={handleInputChange}
                min="1990"
                max="2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="From"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Year To
              </label>
              <input
                type="number"
                name="yearTo"
                value={formData.yearTo}
                onChange={handleInputChange}
                min="1990"
                max="2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="To"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Price From
              </label>
              <input
                type="number"
                name="priceFrom"
                value={formData.priceFrom}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="From"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Price To
              </label>
              <input
                type="number"
                name="priceTo"
                value={formData.priceTo}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="To"
              />
            </div>
          </div>

          {/* Mileage Range */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Mileage From
              </label>
              <input
                type="number"
                name="mileageFrom"
                value={formData.mileageFrom}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="From"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Mileage To
              </label>
              <input
                type="number"
                name="mileageTo"
                value={formData.mileageTo}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="To"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Please provide any additional details about your inquiry, specific requirements, or questions you may have..."
          ></textarea>
        </div>

        {/* Submit Buttons */}
        <div className="space-y-4 pt-6">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>GET A PRICE QUOTE NOW</span>
          </button>
          
          <div className="text-center text-gray-500 font-medium">OR</div>
          
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>BUY NOW</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm; 