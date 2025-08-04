"use client";
import { useState } from 'react';
import { 
  ChartBarIcon, 
  BuildingOfficeIcon, 
  GlobeAltIcon, 
  CurrencyDollarIcon,
  UsersIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const InvestmentPage = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const investmentOpportunities = [
    {
      id: 1,
      title: "Franchise Partnership",
      type: "Franchise",
      investment: "$50,000 - $200,000",
      roi: "15-25% annually",
      duration: "3-5 years",
      description: "Partner with us to establish AutoShop franchises in new markets. We provide comprehensive support including training, marketing, and operational guidance.",
      benefits: [
        "Proven business model",
        "Comprehensive training program",
        "Marketing and branding support",
        "Ongoing operational assistance",
        "Territory exclusivity"
      ],
      requirements: [
        "Minimum investment: $50,000",
        "Business experience preferred",
        "Strong local network",
        "Commitment to quality service"
      ]
    },
    {
      id: 2,
      title: "Technology Development",
      type: "Tech Investment",
      investment: "$100,000 - $500,000",
      roi: "20-35% annually",
      duration: "2-4 years",
      description: "Invest in our technology platform development, including AI-powered vehicle assessment tools, blockchain-based transaction systems, and mobile applications.",
      benefits: [
        "Cutting-edge technology exposure",
        "High growth potential",
        "Intellectual property rights",
        "Scalable business model",
        "Global market reach"
      ],
      requirements: [
        "Minimum investment: $100,000",
        "Technology background preferred",
        "Long-term vision",
        "Risk tolerance"
      ]
    },
    {
      id: 3,
      title: "Market Expansion",
      type: "Geographic",
      investment: "$200,000 - $1,000,000",
      roi: "18-30% annually",
      duration: "4-7 years",
      description: "Help us expand into new international markets. This includes setting up operations, establishing partnerships, and building local presence.",
      benefits: [
        "Diversified market exposure",
        "First-mover advantage",
        "Local market insights",
        "Strategic partnerships",
        "Brand recognition"
      ],
      requirements: [
        "Minimum investment: $200,000",
        "International business experience",
        "Local market knowledge",
        "Strong network in target market"
      ]
    },
    {
      id: 4,
      title: "Supply Chain Investment",
      type: "Infrastructure",
      investment: "$150,000 - $750,000",
      roi: "12-20% annually",
      duration: "5-8 years",
      description: "Invest in our supply chain infrastructure including warehouses, logistics centers, and distribution networks to improve efficiency and reduce costs.",
      benefits: [
        "Stable returns",
        "Asset-backed investment",
        "Operational efficiency gains",
        "Cost reduction opportunities",
        "Scalable infrastructure"
      ],
      requirements: [
        "Minimum investment: $150,000",
        "Logistics experience preferred",
        "Long-term commitment",
        "Infrastructure knowledge"
      ]
    }
  ];

  const stats = [
    { label: "Years in Business", value: "15+", icon: BuildingOfficeIcon },
    { label: "Countries Served", value: "25+", icon: GlobeAltIcon },
    { label: "Vehicles Sold", value: "50,000+", icon: CurrencyDollarIcon },
    { label: "Satisfied Customers", value: "10,000+", icon: UsersIcon }
  ];

  const handleContact = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowContactForm(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    alert('Thank you for your interest! Our investment team will contact you within 24 hours.');
    setShowContactForm(false);
    setSelectedOpportunity(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Investment Opportunities</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in revolutionizing the automotive industry. We offer diverse investment 
              opportunities with strong returns and growth potential.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Invest Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Invest With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Track Record</h3>
              <p className="text-gray-600">15+ years of successful operations with consistent growth and profitability</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk Management</h3>
              <p className="text-gray-600">Diversified portfolio and robust risk management strategies</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <LightBulbIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation Focus</h3>
              <p className="text-gray-600">Continuous investment in technology and process improvements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Opportunities */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Investment Opportunities</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investmentOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                    <p className="text-blue-600 font-medium">{opportunity.type}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {opportunity.roi}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Investment:</span>
                    <div className="font-medium text-gray-900">{opportunity.investment}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <div className="font-medium text-gray-900">{opportunity.duration}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {opportunity.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => handleContact(opportunity)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Process */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Investment Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Consultation</h3>
              <p className="text-gray-600">Schedule a meeting to discuss investment opportunities and your goals</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Due Diligence</h3>
              <p className="text-gray-600">Review detailed financials, business plans, and market analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agreement</h3>
              <p className="text-gray-600">Finalize terms and sign investment agreement</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Partnership</h3>
              <p className="text-gray-600">Begin partnership with ongoing support and regular updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedOpportunity ? `Learn More About ${selectedOpportunity.title}` : 'Investment Inquiry'}
                </h2>
                <button
                  onClick={() => {
                    setShowContactForm(false);
                    setSelectedOpportunity(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                <input
                  type="text"
                  placeholder="Company (Optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {selectedOpportunity && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Interest
                    </label>
                    <input
                      type="text"
                      value={selectedOpportunity.title}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount Range
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select range</option>
                    <option value="50k-200k">$50,000 - $200,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="200k-1m">$200,000 - $1,000,000</option>
                    <option value="1m+">$1,000,000+</option>
                  </select>
                </div>
                
                <textarea
                  placeholder="Tell us about your investment goals and experience"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Submit Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowContactForm(false);
                      setSelectedOpportunity(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPage; 