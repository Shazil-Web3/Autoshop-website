import React from 'react';

const BuyFromStockPage = () => {
  const stockSteps = [
    {
      step: "01",
      title: "Registration",
      description: "Register on our website and contact us via WhatsApp. Our agents will provide real-time personalized support with translations, price estimates, additional photos/videos, and place bids for you.",
      icon: "📝"
    },
    {
      step: "02",
      title: "Refundable Deposit",
      description: "A security deposit is required to participate in the auction/bidding process. The deposit is 100% refundable in case of an unsuccessful bid but can be reused for further bidding until we secure a vehicle. Deposits can be made via Paypal or a bank transfer.",
      icon: "💰"
    },
    {
      step: "03",
      title: "Start Bidding",
      description: "You and the agent will work closely to pick vehicles that will suit you. The agent will also provide you with condition sheet, price estimates, inspections with photos/videos, and place the bids on your behalf.",
      icon: "🎯"
    },
    {
      step: "04",
      title: "Successful Bid",
      description: "After a successful bid, the invoice will be sent. You will be able to pay us through our available payment options within the time frame specified on the invoice. The total price will be calculated based on the price of the car + FOB and/or CIF.",
      icon: "✅"
    },
    {
      step: "05",
      title: "Shipping",
      description: "Shipping will be arranged after confirmation of payment to the preferred port of destination. Digital copies of documents will be sent before shipping whilst the original documents will be dispatched through courier services after the vehicle has been shipped.",
      icon: "🚢"
    },
    {
      step: "06",
      title: "Pickup",
      description: "You will be contacted when the vehicle is about to reach the destination port. Please take the required documents to release the vehicle.",
      icon: "🚗"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Buy from Stock</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Purchase Vehicles Directly from Our Extensive Inventory
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              <span className="inline-block mr-3">📋</span>
              How to Buy from Stock
            </h2>
            
            <div className="space-y-8">
              {stockSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              <span className="inline-block mr-3">🎁</span>
              Benefits of Buying from Stock
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Immediate Availability</h3>
                <p className="text-gray-600">
                  Vehicles are already in stock and ready for immediate purchase and shipping.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Verified Condition</h3>
                <p className="text-gray-600">
                  All stock vehicles have been inspected and verified for quality and condition.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Fixed Pricing</h3>
                <p className="text-gray-600">
                  No bidding required - clear, fixed prices for all stock vehicles.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Detailed Photos</h3>
                <p className="text-gray-600">
                  Comprehensive photo and video documentation of each vehicle.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Personal Support</h3>
                <p className="text-gray-600">
                  Dedicated agents provide personalized assistance throughout the process.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Refundable Deposit</h3>
                <p className="text-gray-600">
                  100% refundable deposits that can be reused for multiple purchases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deposit Information */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              <span className="inline-block mr-3">💳</span>
              Deposit Information
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Security Deposit</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Required to participate in the bidding process</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>100% refundable if bid is unsuccessful</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Can be reused for further bidding attempts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Accepted via PayPal or bank transfer</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Payment Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl mr-3">💳</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">PayPal</h4>
                        <p className="text-gray-600 text-sm">Fast and secure online payments</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl mr-3">🏦</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Bank Transfer</h4>
                        <p className="text-gray-600 text-sm">Direct transfer to our verified accounts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Buy from Stock?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our extensive inventory and find the perfect vehicle for your needs.
          </p>
          <div className="flex justify-center">
            <a 
              href="/inquiry" 
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-green-600 transition duration-300"
            >
              Contact Agent
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyFromStockPage; 