"use client";
import { useState, useEffect } from 'react';
import { inquiryService } from '../services/inquiryService';
import apiService from '../services/api';

const InquiryForm = ({ productInfo = null, onClose = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    address: '',
    country: '',
    city: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const user = apiService.getCurrentUser();
    if (user) {
      const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
      setFormData(prev => ({
        ...prev,
        name: name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitInquiry = async (actionType) => {
    setSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.tel,
        subject: actionType === 'buy_now' ? 'Buy Now Request' : 'Price Quote Request',
        message: `Address: ${formData.address}\nCountry: ${formData.country}\nCity: ${formData.city}`,
        actionType,
        productId: productInfo?.id || productInfo?._id,
        productTitle: productInfo?.model || productInfo?.title,
        productCategory: productInfo?.categorySlug || 'stock-cars',
        productImage: productInfo?.image,
        refNo: productInfo?.refNo
      };
      await inquiryService.submitInquiry(payload);
      setSuccessMsg('Email sent successfully');
      // Reset editable fields while preserving prefilled name/email
      setFormData(prev => ({
        ...prev,
        tel: '',
        address: '',
        country: '',
        city: ''
      }));
      // Do not auto-close to let user see confirmation message
    } catch (err) {
      setErrorMsg(err?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      {/* Status Messages */}
      {successMsg && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-start transition-all duration-300 ease-out">
          <span className="mr-2">✅</span>
          <div className="font-medium">{successMsg}</div>
        </div>
      )}
      {errorMsg && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start">
          <span className="mr-2">⚠️</span>
          <div className="font-medium">{errorMsg}</div>
        </div>
      )}

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
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Your Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black" placeholder="Full Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Your Country *</label>
            <select name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black">
              <option value="">Select</option>
              {countries.map((c) => (<option key={c} value={c} className="text-black">{c}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black" placeholder="Email Address" />
          </div>
          <div>
            <label className="block text_sm font-medium text-black mb-2">Address *</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black" placeholder="Street, Town, Province" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Tel *</label>
            <input type="tel" name="tel" value={formData.tel} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black" placeholder="Cell Phone or Telephone No." />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">City *</label>
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black" placeholder="City" />
          </div>
        </div>
 
        {/* Submit Buttons */}
        <div className="space-y-4 pt-2">
          <button
            type="button"
            disabled={submitting}
            onClick={() => submitInquiry('price_quote')}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>GET A PRICE QUOTE NOW</span>
          </button>
          
          <div className="text-center text-gray-500 font-medium">OR</div>
          
          <button
            type="button"
            disabled={submitting}
            onClick={() => submitInquiry('buy_now')}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
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