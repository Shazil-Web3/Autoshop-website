"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '../../services/api';
import { 
  PlusIcon, 
  TruckIcon, 
  WrenchScrewdriverIcon,
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const SubmitProductRequest = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [requestType, setRequestType] = useState('vehicle');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    location: '',
    // Vehicle specific fields
    make: '',
    model: '',
    year: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    color: '',
    engine: '',
    stockNo: '',
    totalPrice: '',
    drive: '',
    seats: '',
    doors: '',
    features: [],
    condition: '',
    // Part specific fields
    category: '',
    brand: '',
    stock: '',
    compatibleVehicles: [],
    // Machinery specific fields
    capacity: ''
  });
  const [newFeature, setNewFeature] = useState('');
  const [newCompatibleVehicle, setNewCompatibleVehicle] = useState('');

  // Check if user is authenticated and has permission
  useEffect(() => {
    const user = apiService.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (!['dealer', 'agent'].includes(user.role)) {
      router.push('/');
      return;
    }
    
    if (user.status !== 'approved') {
      router.push('/');
      return;
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addCompatibleVehicle = () => {
    if (newCompatibleVehicle.trim() && !formData.compatibleVehicles.includes(newCompatibleVehicle.trim())) {
      setFormData(prev => ({
        ...prev,
        compatibleVehicles: [...prev.compatibleVehicles, newCompatibleVehicle.trim()]
      }));
      setNewCompatibleVehicle('');
    }
  };

  const removeCompatibleVehicle = (index) => {
    setFormData(prev => ({
      ...prev,
      compatibleVehicles: prev.compatibleVehicles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Validate required fields
      if (!formData.title || !formData.price || !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      const requestData = {
        requestType,
        productData: {
          ...formData,
          price: parseFloat(formData.price),
          year: formData.year ? parseInt(formData.year) : undefined,
          mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
          stock: formData.stock ? parseInt(formData.stock) : undefined
        }
      };

      await apiService.createProductRequest(requestData);
      setMessage('Product request submitted successfully! It will be reviewed by admin.');
      
      // Reset form
      setFormData({
        title: '',
        price: '',
        description: '',
        location: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        fuelType: '',
        transmission: '',
        color: '',
        engine: '',
        stockNo: '',
        totalPrice: '',
        drive: '',
        seats: '',
        doors: '',
        features: [],
        condition: '',
        category: '',
        brand: '',
        stock: '',
        compatibleVehicles: [],
        capacity: ''
      });
    } catch (error) {
      setMessage(error.message || 'Error submitting product request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Submit Product Request</h1>
              <p className="text-gray-600 mt-2">Submit a new product for admin review and approval</p>
            </div>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Back
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className={`border rounded-lg p-4 mb-4 ${
              message.includes('successfully') 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Request Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Product Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRequestType('vehicle')}
                  className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                    requestType === 'vehicle'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <TruckIcon className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Vehicle</div>
                    <div className="text-sm text-gray-500">Cars, trucks, motorcycles</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRequestType('part')}
                  className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                    requestType === 'part'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <WrenchScrewdriverIcon className="w-6 h-6 text-green-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Part</div>
                    <div className="text-sm text-gray-500">Auto parts, accessories</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2018 Toyota Camry XSE"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="15000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., New York, USA"
                />
              </div>

              {requestType === 'vehicle' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Make
                    </label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Toyota"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Camry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="2018"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mileage
                    </label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fuel Type
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select fuel type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="LPG">LPG</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Transmission
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select transmission</option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                      <option value="CVT">CVT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Silver"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Engine Size
                    </label>
                    <input
                      type="text"
                      name="engine"
                      value={formData.engine}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 2.5L"
                    />
                  </div>
                </>
              )}

              {requestType === 'part' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select category</option>
                      <option value="Engine">Engine</option>
                      <option value="Transmission">Transmission</option>
                      <option value="Brakes">Brakes</option>
                      <option value="Suspension">Suspension</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Body">Body</option>
                      <option value="Interior">Interior</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Bosch"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="10"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide a detailed description of the product..."
              />
            </div>

            {/* Features (for vehicles) */}
            {requestType === 'vehicle' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features
                </label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a feature..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                {formData.features.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Compatible Vehicles (for parts) */}
            {requestType === 'part' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Compatible Vehicles
                </label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    value={newCompatibleVehicle}
                    onChange={(e) => setNewCompatibleVehicle(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add compatible vehicle..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompatibleVehicle())}
                  />
                  <button
                    type="button"
                    onClick={addCompatibleVehicle}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
                {formData.compatibleVehicles.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.compatibleVehicles.map((vehicle, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {vehicle}
                        <button
                          type="button"
                          onClick={() => removeCompatibleVehicle(index)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5" />
                    <span>Submit Product Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitProductRequest; 