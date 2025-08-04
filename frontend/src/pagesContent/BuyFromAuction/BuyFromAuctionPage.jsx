import React from 'react';

const BuyFromAuctionPage = () => {
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
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Buy from Auction</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Participate in Live Auctions and Win Premium Vehicles at Competitive Prices
          </p>
        </div>
      </section>

      {/* Process Section */}
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
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
              Why Choose Auction Buying?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Best Prices</h3>
                <p className="text-gray-600">
                  Get vehicles at auction prices, often significantly below market value.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Exclusive Access</h3>
                <p className="text-gray-600">
                  Access to exclusive auction inventory not available through regular channels.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Transparent Process</h3>
                <p className="text-gray-600">
                  Complete transparency in bidding process with detailed vehicle information.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Full Documentation</h3>
                <p className="text-gray-600">
                  All necessary documents provided for smooth import and registration.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🚢</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Global Shipping</h3>
                <p className="text-gray-600">
                  We handle all shipping arrangements to your preferred destination.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Expert Guidance</h3>
                <p className="text-gray-600">
                  Professional support throughout the entire auction and purchase process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Tips */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              <span className="inline-block mr-3">💡</span>
              Auction Tips for Success
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Before Bidding</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Research vehicle market values thoroughly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Review all photos and condition reports</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Set your maximum bid limit in advance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Understand all additional costs (shipping, taxes)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">During Auction</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Stay focused and don't get caught in bidding wars</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Monitor auction progress closely</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Have payment method ready for immediate use</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Contact our team for real-time assistance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Bidding?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our next auction and discover amazing deals on premium vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              View Auctions
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-purple-600 transition duration-300">
              Register Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyFromAuctionPage; 