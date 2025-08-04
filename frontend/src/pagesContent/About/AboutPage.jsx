import React from 'react';

const AboutPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      company: "Auto Parts Plus",
      country: "UAE",
      text: "Autexline has been our trusted partner for over 3 years. Their quality assurance and reliable delivery have helped us expand our business significantly.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Global Motors",
      country: "Canada",
      text: "The team at Autexline is exceptional. They understand our needs and always deliver high-quality vehicles at competitive prices.",
      rating: 5
    },
    {
      id: 3,
      name: "Carlos Rodriguez",
      company: "Latin Auto Imports",
      country: "Mexico",
      text: "Professional service, transparent pricing, and excellent communication. Autexline has exceeded our expectations in every transaction.",
      rating: 5
    },
    {
      id: 4,
      name: "Yuki Tanaka",
      company: "Tokyo Auto Solutions",
      country: "Japan",
      text: "We've been working with Autexline for motorcycle parts and they consistently provide the best quality products with fast shipping.",
      rating: 5
    },
    {
      id: 5,
      name: "Michael O'Connor",
      company: "Irish Auto Traders",
      country: "Ireland",
      text: "Autexline's global reach and expertise in salvage vehicles have been invaluable to our restoration business. Highly recommended!",
      rating: 5
    },
    {
      id: 6,
      name: "Fatima Al-Zahra",
      company: "Desert Motors",
      country: "Saudi Arabia",
      text: "Outstanding service and quality. Autexline has become our go-to partner for all automotive sourcing needs in the Middle East.",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Autexline</h1>
          <p className="text-xl max-w-3xl">
            Leading the Future of Automotive Sourcing, Sales, and Export
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              <span className="inline-block mr-3">🚗</span>
              Company Overview
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Autexline is a global automotive trading company committed to sourcing and supplying high-quality vehicles and parts to international buyers. Based on a strong foundation of trust, expertise, and global reach, we specialize in delivering new and used vehicles, machinery, motorcycle parts, and salvage vehicles to customers around the world.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Simple but Powerful Approach:</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🔍</span>
                    <span className="font-medium">We source it.</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">💰</span>
                    <span className="font-medium">We sell it.</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🚢</span>
                    <span className="font-medium">We export it.</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-800">What We Do</h3>
              <p className="text-gray-700 mb-6">
                At Autexline, we have built a robust network of international dealers and auction houses, enabling us to source vehicles and parts directly from some of the most trusted and competitive markets.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">Our Sourcing Channels:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Licensed dealers
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Authorized vehicle auctions
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Private listings and trusted partners
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">Our Inventory Includes:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">🚗</span>
                      New and Used Cars
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">🏍️</span>
                      Motorcycles and Motorcycle Parts
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">🚛</span>
                      Heavy Machinery and Equipment
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">🔧</span>
                      Salvage and Repairable Vehicles
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Profile Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              <span className="inline-block mr-3">🏢</span>
              Company Profile
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Office Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3 text-blue-600">📍</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">123 Business District<br />Automotive Plaza, Suite 456<br />Global Trade Center</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3 text-blue-600">👥</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Team</h4>
                      <p className="text-gray-600">Professional automotive experts<br />International trade specialists<br />Customer service representatives</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3 text-blue-600">📞</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Contact</h4>
                      <p className="text-gray-600">Phone: +1 (555) 123-4567<br />Email: info@autexline.com<br />Website: www.autexline.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Our Mission & Vision</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Our Vision</h4>
                    <p className="text-gray-700 text-sm">
                      To be the leading global provider of high-quality automotive products, building lasting relationships with our partners and customers through excellence in sourcing, sales, and export.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Our Mission</h4>
                    <p className="text-gray-700 text-sm">
                      To provide superior vehicles, parts, and machinery solutions to our customers by adhering to high standards of quality and efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              <span className="inline-block mr-3">⭐</span>
              Why Choose Autexline?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Global Reach</h3>
                <p className="text-gray-600">
                  With a strong network of suppliers and customers worldwide, we serve various markets, ensuring our products reach where they are needed most.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Quality Assurance</h3>
                <p className="text-gray-600">
                  Every item in our inventory undergoes rigorous inspection and testing, guaranteeing that it meets international quality standards.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Competitive Pricing</h3>
                <p className="text-gray-600">
                  We understand the importance of cost-efficiency in the automotive industry and provide competitive pricing without compromising quality.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Reliable Service</h3>
                <p className="text-gray-600">
                  Our team is dedicated to providing top-notch service with seamless experience from sourcing and sales to delivery and support.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to sustainability by offering salvage vehicles and quality used parts, helping reduce waste and contribute to environmental conservation.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Exclusive Access</h3>
                <p className="text-gray-600">
                  Access to exclusive auction and dealer inventory with transparent pricing and reliable sourcing channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Information Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              <span className="inline-block mr-3">🏦</span>
              Bank Information
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Bank Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span className="font-semibold text-gray-700">Bank Name:</span>
                      <span className="text-gray-600">Global Commerce Bank</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span className="font-semibold text-gray-700">Account Name:</span>
                      <span className="text-gray-600">Autexline International Ltd.</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span className="font-semibold text-gray-700">Account Number:</span>
                      <span className="text-gray-600">1234567890</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span className="font-semibold text-gray-700">Routing Number:</span>
                      <span className="text-gray-600">987654321</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span className="font-semibold text-gray-700">IBAN:</span>
                      <span className="text-gray-600">GB29 NWBK 6016 1331 9268 19</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span className="font-semibold text-gray-700">Swift Code:</span>
                      <span className="text-gray-600">GCBKUS33</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">PayPal Account</h3>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">💳</span>
                      <span className="text-xl font-semibold text-blue-800">PayPal</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="text-gray-600">autexline@paypal.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Account Type:</span>
                        <span className="text-gray-600">Business</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span className="text-green-600 font-semibold">Verified</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> For security reasons, please contact us directly for the most current banking information and payment instructions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              <span className="inline-block mr-3">💬</span>
              Client Feedback
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                      <p className="text-xs text-gray-500">{testimonial.country}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-yellow-400 text-lg">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 italic">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ready to Experience Autexline?</h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of satisfied customers worldwide who trust Autexline for their automotive needs.
                </p>
                <a 
                  href="/" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 inline-block"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 