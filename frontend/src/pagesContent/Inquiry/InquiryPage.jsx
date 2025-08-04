"use client";
import { useState } from 'react';

const InquiryPage = () => {
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    tel: '',
    address: '',
    
    // Destination Information
    destinationCountry: '',
    destinationPort: '',
    
    // Vehicle Information
    make: '',
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    console.log('Form submitted:', formData);
    alert('Inquiry submitted successfully! We will contact you soon.');
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Inquiry Form</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Please fill out both Vehicle & Contact information fields. *required fields.
          </p>
        </div>
      </section>

      {/* Login Notice */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">ℹ️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Please login / sign up for My Page!
                  </h3>
                  <p className="text-blue-700">
                    Logging in makes it easier and more convenient to use AUTEXLINE services. 
                    Please check our FAQ section for commonly asked questions. If you still need help, 
                    feel free to contact us through the form below or contact your sales rep. via WhatsApp/Viber.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Vehicle & Contact Information
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                    Your Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tel *
                      </label>
                      <input
                        type="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination Country *
                      </label>
                      <select
                        name="destinationCountry"
                        value={formData.destinationCountry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select-Destination Country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination Port *
                      </label>
                      <select
                        name="destinationPort"
                        value={formData.destinationPort}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Make
                      </label>
                      <select
                        name="make"
                        value={formData.make}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Make</option>
                        {makes.map((make, index) => (
                          <option key={index} value={make}>{make}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Body Type
                      </label>
                      <select
                        name="bodyType"
                        value={formData.bodyType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Make Body Type</option>
                        {bodyTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transmission
                      </label>
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Transmission</option>
                        {transmissions.map((trans, index) => (
                          <option key={index} value={trans}>{trans}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Steering
                      </label>
                      <select
                        name="steering"
                        value={formData.steering}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year From
                      </label>
                      <input
                        type="number"
                        name="yearFrom"
                        value={formData.yearFrom}
                        onChange={handleInputChange}
                        min="1990"
                        max="2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="From"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year To
                      </label>
                      <input
                        type="number"
                        name="yearTo"
                        value={formData.yearTo}
                        onChange={handleInputChange}
                        min="1990"
                        max="2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="To"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price From
                      </label>
                      <input
                        type="number"
                        name="priceFrom"
                        value={formData.priceFrom}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="From"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price To
                      </label>
                      <input
                        type="number"
                        name="priceTo"
                        value={formData.priceTo}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="To"
                      />
                    </div>
                  </div>

                  {/* Mileage Range */}
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mileage From
                      </label>
                      <input
                        type="number"
                        name="mileageFrom"
                        value={formData.mileageFrom}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="From"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mileage To
                      </label>
                      <input
                        type="number"
                        name="mileageTo"
                        value={formData.mileageTo}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="To"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Please provide any additional details about your inquiry, specific requirements, or questions you may have..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 text-lg"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Need Immediate Assistance?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Phone Support</h3>
                <p className="text-gray-600">0312-0339999</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">WhatsApp</h3>
                <p className="text-gray-600">Click the WhatsApp button below</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Email</h3>
                <p className="text-gray-600">info@autexline.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InquiryPage; 