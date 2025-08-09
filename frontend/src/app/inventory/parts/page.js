"use client";
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { partsService } from '../../../services/partsService';
import { inquiryService } from '../../../services/inquiryService';
import apiService from '../../../services/api';

const PartsPage = () => {
  const [searchFilters, setSearchFilters] = useState({
    make: '',
    model: '',
    year: '',
    modelCode: '',
    category: ''
  });

  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [parts, setParts] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const loadParts = async () => {
      try {
        const data = await partsService.getAllParts();
        const mapped = Array.isArray(data) ? data.map(p => ({
          id: p._id || p.id,
          refNo: p.refNo,
          name: p.name,
          make: p.brand || '',
          model: p.compatibleVehicles?.[0] || '',
          year: '',
          category: p.category,
          price: typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price,
          stock: (typeof p.stock === 'number' ? (p.stock > 0 ? 'In Stock' : 'Out of Stock') : (p.stock || 'In Stock')),
          image: (Array.isArray(p.images) && p.images.length > 0) ? p.images[0] : '/images/placeholder-part.jpg'
        })) : [];
        setParts(mapped);
      } catch (err) {
        setParts([]);
      }
    };
    loadParts();
  }, []);

  useEffect(() => {
    const user = apiService.getCurrentUser();
    if (user) {
      setInquiryForm(prev => ({ ...prev, name: `${user.firstName || ''} ${user.lastName || ''}`.trim(), email: user.email || '' }));
    }
  }, []);

  const makes = [
    "Toyota", "Nissan", "Honda", "Mazda", "Mitsubishi", "Subaru", "Suzuki", 
    "Isuzu", "Daihatsu", "Hino", "Lexus", "Mercedes-Benz", "BMW", "Volkswagen", 
    "Audi", "Peugeot", "Ford", "Volvo", "Land Rover", "Jaguar", "Jeep", 
    "Chevrolet", "Hyundai", "Kia", "Ssangyong", "Renault Samsung"
  ];

  const years = Array.from({ length: 46 }, (_, i) => 2024 - i);

  const categories = [
    { name: "Engine & Components", count: 102368 },
    { name: "Transmission & Drivetrain", count: 182936 },
    { name: "Suspension & Components", count: 122083 },
    { name: "Lightings", count: 580039 },
    { name: "Computers & Sensors", count: 127741 },
    { name: "Chassis", count: 65019 },
    { name: "Body Parts", count: 391105 },
    { name: "Door Parts", count: 271686 },
    { name: "Car Electronics", count: 38454 },
    { name: "Cooling Components", count: 267074 },
    { name: "Electrical Parts", count: 404808 },
    { name: "Exhaust & Components", count: 78686 },
    { name: "Exterior Parts", count: 33480 },
    { name: "Interior Parts", count: 114073 },
    { name: "Tires & Wheels", count: 46128 },
    { name: "Brake", count: 120804 },
    { name: "Mirrors & Windshields", count: 286638 },
    { name: "All Other Parts", count: 16304 }
  ];

  const sampleParts = [
    { id: 1, name: "Toyota Camry Engine Oil Filter", make: "Toyota", model: "Camry", year: "2018", category: "Engine & Components", price: "$15.99", stock: "In Stock", image: "/4.jpg" },
    { id: 2, name: "Honda Civic Brake Pads Set", make: "Honda", model: "Civic", year: "2020", category: "Brake", price: "$45.50", stock: "In Stock", image: "/5.jpeg" },
    { id: 3, name: "Nissan Altima Headlight Assembly", make: "Nissan", model: "Altima", year: "2019", category: "Lightings", price: "$89.99", stock: "Limited Stock", image: "/6.jpeg" }
  ];

  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handlePartInquiry = (part) => {
    const user = apiService.getCurrentUser();
    if (!user) {
      // open redirect modal to login/signup
      window.location.href = '/login';
      return;
    }
    setSelectedPart(part);
    setShowInquiryForm(true);
  };

  const submitPartInquiry = async (e) => {
    e.preventDefault();
    try {
      await inquiryService.submitInquiry({
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: '',
        subject: 'Product Inquiry',
        message: inquiryForm.message || '',
        actionType: 'price_quote',
        productTitle: selectedPart?.name,
        refNo: selectedPart?.refNo
      });
      setSuccessMsg('Your parts inquiry has been sent. We will contact you shortly.');
      setShowInquiryForm(false);
      setSelectedPart(null);
      setInquiryForm({ name: inquiryForm.name, email: inquiryForm.email, message: '' });
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setSuccessMsg('Failed to send inquiry. Please try again.');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const CategoryCard = ({ category }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-black">{category.name}</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
          {category.count.toLocaleString()}
        </span>
      </div>
    </div>
  );

  const PartCard = ({ part }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={part.image} 
          alt={part.name}
          className="w-full h-32 object-cover"
          onError={(e) => { e.target.src = '/images/placeholder-part.jpg'; }}
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
          part.stock === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {part.stock}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-black mb-2 line-clamp-2">{part.name}</h3>
        <div className="text-sm text-black mb-2">
          <div>{part.make} {part.model} {part.year && `(${part.year})`}</div>
          <div>{part.category}</div>
          <div className="mt-1 text-gray-600">Reference ID: <span className="font-medium text-gray-900">{part.refNo || '-'}</span></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-red-600">{part.price}</span>
          <button onClick={() => handlePartInquiry(part)} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm font-medium">INQUIRY</button>
        </div>
      </div>
    </div>
  );

  const list = parts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-black">Auto Parts</h1>
          <p className="text-black mt-2">Search for new and used auto parts by make, model, and category</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMsg && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-start">
            <span className="mr-2">✅</span>
            <div className="font-medium">{successMsg}</div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FunnelIcon className="h-6 w-6 text-black mr-2" />
                <h2 className="text-lg font-bold text-black">All Categories</h2>
              </div>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <CategoryCard key={index} category={category} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Search and Results */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <FunnelIcon className="h-6 w-6 text-black mr-2" />
                <h2 className="text-lg font-bold text-black">Parts Search Tool</h2>
              </div>
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Select Maker</label>
                  <select value={searchFilters.make} onChange={(e) => handleFilterChange('make', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                    <option value="" className="text-black">All Makes</option>
                    {makes.map((make) => (<option key={make} value={make} className="text-black">{make}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Select Model</label>
                  <input type="text" value={searchFilters.model} onChange={(e) => handleFilterChange('model', e.target.value)} placeholder="Enter model" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline_none focus:ring-2 focus:ring-blue-500 text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Select Year</label>
                  <select value={searchFilters.year} onChange={(e) => handleFilterChange('year', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                    <option value="" className="text-black">All Years</option>
                    {years.map((year) => (<option key={year} value={year} className="text-black">{year}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Model Code</label>
                  <input type="text" value={searchFilters.modelCode} onChange={(e) => handleFilterChange('modelCode', e.target.value)} placeholder="Enter model code" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black" />
                </div>
                <div className="md:col-span-2 lg:col-span-1 flex items-end">
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center">
                    <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry Modal */}
        {showInquiryForm && selectedPart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w_full max-w-lg">
              <h2 className="text-xl font-bold text-black mb-4">Parts Inquiry</h2>
              <form onSubmit={submitPartInquiry}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-black mb-1">Name</label>
                    <input type="text" value={inquiryForm.name} onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))} className="w-full p-2 border rounded text-black" required />
                  </div>
                  <div>
                    <label className="block text-sm text-black mb-1">Email</label>
                    <input type="email" value={inquiryForm.email} onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))} className="w-full p-2 border rounded text-black" required />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-black mb-1">Message</label>
                    <textarea value={inquiryForm.message} onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))} className="w-full p-2 border rounded text-black" rows="3" required />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowInquiryForm(false)} className="px-4 py-2 border rounded text-black">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send Inquiry</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsPage; 