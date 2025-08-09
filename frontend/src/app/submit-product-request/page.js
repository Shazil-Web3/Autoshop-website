"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '../../services/api';
import { 
  PlusIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const MAX_IMAGES = 25;

const SubmitProductRequest = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    category: 'stockCars',
    title: '',
    // Pricing (dealer has no commission input)
    vehiclePrice: '',
    negotiation: '',
    price: '',
    totalPrice: '',
    // Media
    images: [],
    imagePreviews: [],
    videoFile: null,
    // Common
    stockNo: '',
    location: '',
    description: '',
    // Vehicle/machinery/bike fields
    year: '',
    mileage: '',
    engine: '',
    transmission: '',
    color: '',
    fuel: '',
    drive: '',
    seats: '',
    doors: '',
    condition: '',
    // Extended specs
    chassisNo: '',
    engineCode: '',
    modelCode: '',
    steering: '',
    versionClass: '',
    registrationYearMonth: '',
    manufactureYearMonth: '',
    dimension: '',
    weight: '',
    maxCapacity: '',
    capacity: '',
    // Parts specific
    partCategory: '',
    brand: '',
    stock: '',
    compatibleVehicles: [],
    make: '',
    model: ''
  });
  const [newCompatibleVehicle, setNewCompatibleVehicle] = useState('');

  // Auth guard
  useEffect(() => {
    const user = apiService.getCurrentUser();
    if (!user) return router.push('/login');
    if (!['dealer', 'agent'].includes(user.role)) return router.push('/');
    if (user.status !== 'approved') return router.push('/');
  }, [router]);

  const categories = [
    { value: 'stockCars', label: 'Stock Cars', icon: '🚗' },
    { value: 'salvageVehicles', label: 'Salvage Vehicles', icon: '🚛' },
    { value: 'constructionMachinery', label: 'Construction Machinery', icon: '🏗️' },
    { value: 'bikes', label: 'Motorcycles', icon: '🏍️' },
    { value: 'autoParts', label: 'Auto Parts', icon: '🧰' }
  ];

  const carFeatureOptions = [
    'CD Player','Sun Roof','Leather Seat','Alloy Wheels','Power Steering','Power Window','A/C','ABS','Airbag','Radio','CD Changer','DVD','TV','Power Seat','Back Tire','Grill Guard','Rear Spoiler','Central Locking','Jack','Spare Tire','Wheel Spanner','Fog Lights','Back Camera','Push Start','Keyless Entry','ESC','360 Degree Camera','Body Kit','Side Airbag','Power Mirror','Side Skirts','Front Lip Spoiler','Navigation','Turbo','Power Slide Door'
  ];
  const bikeFeatureOptions = [
    'Brembo Brakes','Seat Cowl','Tinted Screen','ABS','Cruise Control','Modes','Heated Grips','TC','Akrapovic','Super Charged','Rad Gaurd','Electric Suspension','Leo Vince','Panniers','Top Box','Frame Protection','Twin Seat','Ohlins','Single Seat','Tail Tidy','Sports Exhaust','LED headlight','Keyless Ride','Driving modes Pro','Comfort Package','Cruise control','ABS pro','Showa Forks','R&G Carbon','Finance Available','HPI Clear','Delivery Available','Part Exchange Welcome'
  ];
  const makes = [
    "Toyota","Nissan","Honda","Mazda","Mitsubishi","Subaru","Suzuki","Isuzu","Daihatsu","Hino","Lexus","Mercedes-Benz","BMW","Volkswagen","Audi","Peugeot","Ford","Volvo","Land Rover","Jaguar","Jeep","Chevrolet","Hyundai","Kia","Ssangyong","Renault Samsung"
  ];
  const years = Array.from({ length: 46 }, (_, i) => 2024 - i);
  const partCategories = [
    "Engine & Components","Transmission & Drivetrain","Suspension & Components","Lightings","Computers & Sensors","Chassis","Body Parts","Door Parts","Car Electronics","Cooling Components","Electrical Parts","Exhaust & Components","Exterior Parts","Interior Parts","Tires & Wheels","Brake","Mirrors & Windshields","All Other Parts"
  ];

  const displayPrice = useMemo(() => {
    const v = parseFloat(formData.vehiclePrice) || 0;
    const n = parseFloat(formData.negotiation) || 0;
    return Math.max(0, Math.round((v + n) * 100) / 100);
  }, [formData.vehiclePrice, formData.negotiation]);

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.replace(/[^0-9.]/g, '') }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const remainingSlots = MAX_IMAGES - formData.images.length;
    const toAdd = files.slice(0, remainingSlots);
    const previews = toAdd.map(f => URL.createObjectURL(f));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...toAdd],
      imagePreviews: [...prev.imagePreviews, ...previews]
    }));
    e.target.value = '';
  };

  const removeImageAt = (index) => {
    setFormData(prev => {
      const images = prev.images.slice();
      const previews = prev.imagePreviews.slice();
      images.splice(index, 1);
      const removedPreview = previews.splice(index, 1)[0];
      if (removedPreview) URL.revokeObjectURL(removedPreview);
      return { ...prev, images, imagePreviews: previews };
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData(prev => ({ ...prev, videoFile: file }));
    e.target.value = '';
  };

  const toggleFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...(prev.features || []), feature]
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

  const handleLogout = () => {
    apiService.logout();
    router.push('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formattedPrice = displayPrice ? `$${displayPrice.toLocaleString()}` : '';
      const payload = {
        ...formData,
        price: formattedPrice,
        totalPrice: formattedPrice,
        features: (formData.features || []).filter(Boolean),
        image: formData.imagePreviews[0] || ''
      };
      await apiService.createProductRequest({ requestType: formData.category, productData: payload });
      setMessage('Product request submitted successfully!');
      // Revoke previews
      formData.imagePreviews.forEach(url => URL.revokeObjectURL(url));
      // Reset
      setFormData({
        category: 'stockCars',
        title: '',
        vehiclePrice: '',
        negotiation: '',
        price: '',
        totalPrice: '',
        images: [],
        imagePreviews: [],
        videoFile: null,
        stockNo: '',
        location: '',
        description: '',
        year: '',
        mileage: '',
        engine: '',
        transmission: '',
        color: '',
        fuel: '',
        drive: '',
        seats: '',
        doors: '',
        condition: '',
        chassisNo: '',
        engineCode: '',
        modelCode: '',
        steering: '',
        versionClass: '',
        registrationYearMonth: '',
        manufactureYearMonth: '',
        dimension: '',
        weight: '',
        maxCapacity: '',
        capacity: '',
        partCategory: '',
        brand: '',
        stock: '',
        compatibleVehicles: [],
        make: '',
        model: ''
      });
    } catch (err) {
      setMessage(err?.message || 'Error submitting product request');
    } finally {
      setIsLoading(false);
    }
  };

  const showFeatures = formData.category === 'stockCars' || formData.category === 'bikes';
  const staticFeatureOptions = formData.category === 'stockCars' ? carFeatureOptions : bikeFeatureOptions;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Submit Product Request</h1>
              <p className="text-gray-600 mt-2">Add a new product for admin review</p>
            </div>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
          {message && (
            <div className={`p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>{message}</div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Product Category *</label>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {categories.map((category) => (
                <label key={category.value} className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.category === category.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="category" value={category.value} checked={formData.category === category.value} onChange={handleInputChange} className="sr-only" />
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-900 text-center">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Product Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 2018 KIA STINGER / SMART KEY, BACK CAMERA" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Stock Number *</label>
              <input type="text" name="stockNo" value={formData.stockNo} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., BW803567" />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Pricing</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Vehicle Price</label>
                <input type="text" name="vehiclePrice" value={formData.vehiclePrice} onChange={handleNumericChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 10330" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Negotiation</label>
                <input type="text" name="negotiation" value={formData.negotiation} onChange={handleNumericChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Display Price</label>
                <input type="text" value={displayPrice ? `$${displayPrice.toLocaleString()}` : ''} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-black" placeholder="$0" />
              </div>
            </div>
          </div>

          {/* Specifications (non-parts) */}
          {formData.category !== 'autoParts' && (
            <div>
              <h3 className="text-lg font-medium text-black mb-4">Specifications</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Year *</label>
                  <input type="text" name="year" value={formData.year} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 2018" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Mileage/Hours *</label>
                  <input type="text" name="mileage" value={formData.mileage} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 162,182 km" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Engine *</label>
                  <input type="text" name="engine" value={formData.engine} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 3,342cc" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Transmission *</label>
                  <input type="text" name="transmission" value={formData.transmission} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., AT" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Location *</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., Korea" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Color *</label>
                  <input type="text" name="color" value={formData.color} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., Gray" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Fuel Type *</label>
                  <input type="text" name="fuel" value={formData.fuel} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., Petrol" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Drive Type</label>
                  <input type="text" name="drive" value={formData.drive} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 4WD" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Seats</label>
                  <input type="text" name="seats" value={formData.seats} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Doors</label>
                  <input type="text" name="doors" value={formData.doors} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 4" />
                </div>
                {/* Extended */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Chassis No.</label>
                  <input type="text" name="chassisNo" value={formData.chassisNo} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., XXXXXXXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Engine Code</label>
                  <input type="text" name="engineCode" value={formData.engineCode} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 1NZ-FE" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Model Code</label>
                  <input type="text" name="modelCode" value={formData.modelCode} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., DBA-XXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Steering</label>
                  <select name="steering" value={formData.steering} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                    <option value="">Select</option>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                    <option value="Center">Center</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Version/Class</label>
                  <input type="text" name="versionClass" value={formData.versionClass} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., Back Camera" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Registration Year/Month</label>
                  <input type="text" name="registrationYearMonth" value={formData.registrationYearMonth} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 2015/07" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Manufacture Year/Month</label>
                  <input type="text" name="manufactureYearMonth" value={formData.manufactureYearMonth} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 2014/12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Dimension</label>
                  <input type="text" name="dimension" value={formData.dimension} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 3.59×1.59×1.48 m" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Weight</label>
                  <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 870 kg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Max. Cap</label>
                  <input type="text" name="maxCapacity" value={formData.maxCapacity} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 3.0L / 1000kg" />
                </div>
                {formData.category === 'constructionMachinery' && (
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Capacity (for machinery)</label>
                    <input type="text" name="capacity" value={formData.capacity} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 20 tons" />
                  </div>
                )}
                {formData.category === 'salvageVehicles' && (
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-black mb-2">Condition (comments)</label>
                    <textarea name="condition" value={formData.condition} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="Enter condition details" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Parts specific fields */}
          {formData.category === 'autoParts' && (
            <div>
              <h3 className="text-lg font-medium text-black mb-4">Part Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Part Category *</label>
                  <select name="partCategory" value={formData.partCategory} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                    <option value="">Select Category</option>
                    {partCategories.map(pc => (<option key={pc} value={pc} className="text-black">{pc}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Brand</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., Toyota OEM" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Select Maker</label>
                  <select name="make" value={formData.make} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                    <option value="">Select Maker</option>
                    {makes.map(m => (<option key={m} value={m} className="text-black">{m}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Select Model</label>
                  <input type="text" name="model" value={formData.model} onChange={handleInputChange} placeholder="Enter model" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Select Year</label>
                  <select name="year" value={formData.year} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                    <option value="">Select Year</option>
                    {years.map(y => (<option key={y} value={y} className="text-black">{y}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Model Code</label>
                  <input type="text" name="modelCode" value={formData.modelCode} onChange={handleInputChange} placeholder="Enter model code" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Stock Quantity</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., 5" />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-black mb-2">Compatible Vehicles</label>
                  <div className="flex gap-2">
                    <input type="text" value={newCompatibleVehicle} onChange={(e) => setNewCompatibleVehicle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCompatibleVehicle())} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500" placeholder="e.g., Toyota Corolla 2014-2018" />
                    <button type="button" onClick={addCompatibleVehicle} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Add</button>
                  </div>
                  {formData.compatibleVehicles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.compatibleVehicles.map((cv, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                          {cv}
                          <button type="button" onClick={() => removeCompatibleVehicle(index)} className="ml-2 text-blue-600 hover:text-blue-800"><XMarkIcon className="w-4 h-4" /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Media */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Media</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Pictures (max {MAX_IMAGES})</label>
                <input
                  id="dealerImageUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  disabled={formData.images.length >= MAX_IMAGES}
                  className="sr-only"
                />
                <label
                  htmlFor="dealerImageUpload"
                  className={`inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-medium ${formData.images.length >= MAX_IMAGES ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  <span className="w-5 h-5 mr-2">📷</span>
                  <span>Select Images</span>
                </label>
                <div className="mt-2 text-sm text-black">{formData.images.length} / {MAX_IMAGES} selected</div>
                {formData.imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {formData.imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative group">
                        <img src={src} alt={`preview-${idx}`} className="w-full h-16 object-cover rounded" />
                        <button type="button" onClick={() => removeImageAt(idx)} className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-600 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="w-4 h-4">✕</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Video (max 1)</label>
                <input
                  id="dealerVideoUpload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  disabled={!!formData.videoFile}
                  className="sr-only"
                />
                <label
                  htmlFor="dealerVideoUpload"
                  className={`inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-medium ${!!formData.videoFile ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  <span className="w-5 h-5 mr-2">🎬</span>
                  <span>Select Video</span>
                </label>
                {formData.videoFile && (
                  <div className="mt-2 text-sm text-black flex items-center justify-between">
                    <span>{formData.videoFile.name}</span>
                    <button type="button" className="text-red-600" onClick={() => setFormData(prev => ({ ...prev, videoFile: null }))}>Remove</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features (cars/bikes only) */}
          {showFeatures && (
            <div>
              <label className="block text-sm font-medium text-black mb-3">Features</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {staticFeatureOptions.map((feature) => (
                  <button type="button" key={feature} onClick={() => toggleFeature(feature)} className={`px-3 py-1 rounded-full text-sm border transition-colors ${(formData.features || []).includes(feature) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-black border-gray-300 hover:border-blue-400'}`}>{feature}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
              <PlusIcon className="w-5 h-5" />
              <span>{isLoading ? 'Submitting...' : 'Submit Product Request'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProductRequest; 