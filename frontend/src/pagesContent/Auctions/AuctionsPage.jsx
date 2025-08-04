import React from 'react';

const AuctionsPage = () => {
  const auctionSteps = [
    {
      step: "01",
      title: "ORDER",
      description: "Select the car you want to purchase through our inventory. This operation can be done using our vehicle search engine. Also, you can customize your search.",
      icon: "🔍"
    },
    {
      step: "02",
      title: "CONFIRM ORDER",
      description: "Select your vehicle and review its details, including photos/videos, to check the condition and final price. Then, enter the final destination, port name, and your contact details. Submit for a quote or contact us via WhatsApp.",
      icon: "✅"
    },
    {
      step: "03",
      title: "PROFORMA INVOICE",
      description: "Receive Proforma Invoice for the selected vehicle please note that all payments should be sent ONLY to AUTEXLINE beneficiary account.",
      icon: "📄"
    },
    {
      step: "04",
      title: "CONFIRM PAYMENT",
      description: "Effect the payment for the selected vehicle as per the proforma invoice terms and conditions. As soon as money reflects in our account, you will be notified by email.",
      icon: "💳"
    },
    {
      step: "05",
      title: "SHIPMENT & DOCUMENTS",
      description: "AUTEXLINE will arrange the earliest shipment available. All necessary documents will be couriered directly to you or to your agent a week after departure.",
      icon: "🚢"
    },
    {
      step: "06",
      title: "CUSTOM CLEARANCE",
      description: "Contact your local clearing agent to complete all import procedures. If you need assistance about these procedures, feel free to contact AUTEXLINE head office.",
      icon: "🏛️"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Auctions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover Premium Vehicles Through Our Exclusive Auction Platform
          </p>
        </div>
      </section>

      {/* Auction Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              <span className="inline-block mr-3">🏁</span>
              Auction Process
            </h2>
            
            <div className="space-y-8">
              {auctionSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{step.icon}</span>
                        <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Auction Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              <span className="inline-block mr-3">⭐</span>
              Why Choose Our Auctions?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Wide Selection</h3>
                <p className="text-gray-600">
                  Access to thousands of vehicles from trusted sources and auctions worldwide.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Competitive Prices</h3>
                <p className="text-gray-600">
                  Get the best deals through our competitive auction process and bulk purchasing power.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Transactions</h3>
                <p className="text-gray-600">
                  All payments are processed securely through our verified beneficiary accounts.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Complete Documentation</h3>
                <p className="text-gray-600">
                  All necessary documents are provided and shipped directly to you or your agent.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🚢</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Global Shipping</h3>
                <p className="text-gray-600">
                  We arrange shipping to any destination worldwide with full logistics support.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Expert Support</h3>
                <p className="text-gray-600">
                  Our team provides personalized support throughout the entire process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Bidding?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have successfully purchased vehicles through our auction platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Browse Inventory
            </a>
            <a 
              href="/inquiry" 
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuctionsPage; 