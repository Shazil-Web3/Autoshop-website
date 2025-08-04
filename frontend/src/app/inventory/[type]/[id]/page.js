"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HeartIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductProfile = () => {
  const params = useParams();
  const router = useRouter();
  const { type, id } = params;
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  // Sample data - in real app, this would come from API based on type and id
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulate API call to get product data
    const fetchProduct = () => {
      const sampleData = {
        cars: {
          id: 1,
          title: "2018 KIA STINGER / SMART KEY, BACK CAMERA",
          price: "$10,330",
          totalPrice: "$12,464",
          images: ["/images/cars/kia-stinger-1.jpg", "/images/cars/kia-stinger-2.jpg"],
          stockNo: "BW803567",
          mileage: "162,182 km",
          year: "2018",
          engine: "3,342cc",
          transmission: "AT",
          location: "Korea",
          color: "Gray",
          fuel: "Petrol",
          drive: "4WD",
          seats: "5",
          doors: "4",
          steering: "Left",
          chassisNo: "KNAJC123456789",
          engineCode: "-",
          modelCode: "0",
          registrationYear: "2018/03",
          manufactureYear: "2018/02",
          dimension: "4.83×1.87×1.40 m",
          weight: "1,840 kg",
          maxCap: "5 persons",
          features: {
            cdPlayer: true,
            sunRoof: true,
            leatherSeat: true,
            alloyWheels: true,
            powerSteering: true,
            powerWindow: true,
            ac: true,
            abs: true,
            airbag: true,
            radio: true,
            cdChanger: false,
            dvd: false,
            tv: false,
            powerSeat: true,
            backTire: false,
            grillGuard: false,
            rearSpoiler: false,
            centralLocking: true,
            jack: true,
            spareTire: true,
            wheelSpanner: true,
            fogLights: true,
            backCamera: true,
            pushStart: true,
            keylessEntry: true,
            esc: true,
            camera360: false,
            bodyKit: false,
            sideAirbag: true,
            powerMirror: true,
            sideSkirts: false,
            frontLipSpoiler: false,
            navigation: true,
            turbo: false,
            powerSlideDoor: false
          }
        },
        salvage: {
          id: 1,
          title: "2015 TOYOTA CAMRY SALVAGE",
          price: "$3,500",
          totalPrice: "$5,200",
          images: ["/images/salvage/toyota-camry-salvage.jpg"],
          stockNo: "SV001",
          mileage: "85,000 km",
          year: "2015",
          engine: "2,500cc",
          transmission: "AT",
          location: "Japan",
          color: "Silver",
          fuel: "Petrol",
          drive: "2WD",
          seats: "5",
          doors: "4",
          steering: "Left",
          chassisNo: "4T1BF1FK5CU123456",
          engineCode: "-",
          modelCode: "0",
          registrationYear: "2015/-",
          manufactureYear: "N/A",
          dimension: "3.59×1.59×1.48 m",
          weight: "870 kg",
          maxCap: "5 persons",
          condition: "Front end damage, engine intact. Good for parts or restoration project.",
          features: {
            cdPlayer: true,
            sunRoof: false,
            leatherSeat: false,
            alloyWheels: true,
            powerSteering: true,
            powerWindow: true,
            ac: true,
            abs: true,
            airbag: true,
            radio: true,
            cdChanger: false,
            dvd: false,
            tv: false,
            powerSeat: false,
            backTire: false,
            grillGuard: false,
            rearSpoiler: false,
            centralLocking: true,
            jack: true,
            spareTire: true,
            wheelSpanner: true,
            fogLights: false,
            backCamera: false,
            pushStart: false,
            keylessEntry: false,
            esc: true,
            camera360: false,
            bodyKit: false,
            sideAirbag: true,
            powerMirror: true,
            sideSkirts: false,
            frontLipSpoiler: false,
            navigation: false,
            turbo: false,
            powerSlideDoor: false
          }
        },
        machinery: {
          id: 1,
          title: "2019 CATERPILLAR EXCAVATOR 320",
          price: "$45,000",
          totalPrice: "$52,000",
          images: ["/images/machinery/cat-excavator.jpg"],
          stockNo: "CM001",
          mileage: "2,500 hours",
          year: "2019",
          engine: "6,000cc",
          transmission: "Hydraulic",
          location: "USA",
          color: "Yellow",
          fuel: "Diesel",
          drive: "4WD",
          seats: "1",
          doors: "1",
          steering: "Center",
          chassisNo: "CAT123456789",
          engineCode: "-",
          modelCode: "320",
          registrationYear: "2019/06",
          manufactureYear: "2019/05",
          dimension: "8.5×2.8×2.6 m",
          weight: "20,000 kg",
          maxCap: "20 tons",
          condition: "Excellent working condition. Well maintained with full service history.",
          features: {
            cdPlayer: false,
            sunRoof: false,
            leatherSeat: false,
            alloyWheels: false,
            powerSteering: true,
            powerWindow: false,
            ac: true,
            abs: true,
            airbag: false,
            radio: true,
            cdChanger: false,
            dvd: false,
            tv: false,
            powerSeat: true,
            backTire: false,
            grillGuard: true,
            rearSpoiler: false,
            centralLocking: true,
            jack: true,
            spareTire: false,
            wheelSpanner: true,
            fogLights: true,
            backCamera: true,
            pushStart: true,
            keylessEntry: false,
            esc: true,
            camera360: true,
            bodyKit: false,
            sideAirbag: false,
            powerMirror: false,
            sideSkirts: false,
            frontLipSpoiler: false,
            navigation: true,
            turbo: true,
            powerSlideDoor: false
          }
        },
        bikes: {
          id: 1,
          title: "2020 HONDA CBR1000RR",
          price: "$8,500",
          totalPrice: "$10,200",
          images: ["/images/bikes/honda-cbr1000rr.jpg"],
          stockNo: "BK001",
          mileage: "12,000 km",
          year: "2020",
          engine: "1,000cc",
          transmission: "6-speed",
          location: "Japan",
          color: "Red",
          fuel: "Petrol",
          drive: "2WD",
          seats: "2",
          doors: "0",
          steering: "Left",
          chassisNo: "HONDA123456789",
          engineCode: "-",
          modelCode: "CBR1000RR",
          registrationYear: "2020/04",
          manufactureYear: "2020/03",
          dimension: "2.1×0.7×1.1 m",
          weight: "201 kg",
          maxCap: "2 persons",
          features: {
            bremboBrakes: true,
            seatCowl: true,
            tintedScreen: true,
            abs: true,
            cruiseControl: true,
            modes: true,
            heatedGrips: false,
            tca: true,
            bsa: false,
            akrapovic: false,
            superCharged: false,
            radGuard: true,
            electricSuspension: false,
            leoVince: false,
            panniers: false,
            topBox: false,
            frameProtection: true,
            twinSeat: true,
            ohlins: false,
            singleSeat: false,
            tailTidy: true,
            sportsExhaust: true,
            ledHeadlight: true,
            keylessRide: true,
            drivingModesPro: true,
            comfortPackage: false,
            cruiseControlPro: false,
            absPro: true,
            showaForks: true,
            rgCarbon: false,
            financeAvailable: true,
            hpiClear: true,
            deliveryAvailable: true,
            partExchangeWelcome: true
          }
        }
      };

      setProduct(sampleData[type] || sampleData.cars);
    };

    fetchProduct();
  }, [type, id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    // Redirect to PayPal or payment gateway
    window.open('https://www.paypal.com', '_blank');
  };

  const handleShipmentInquiry = () => {
    setShowInquiryForm(true);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // Handle inquiry form submission
    alert('Inquiry submitted successfully!');
    setShowInquiryForm(false);
  };

  const FeatureItem = ({ name, label, value }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  const FeatureCheckbox = ({ name, label, checked }) => (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-sm text-gray-600">Stock No: {product.stockNo}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-vehicle.jpg';
                  }}
                />
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <button className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <ShareIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative overflow-hidden rounded-lg ${
                        activeImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Specifications */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
              
              <div className="space-y-1">
                <FeatureItem name="Stock No." label="Stock No." value={product.stockNo} />
                <FeatureItem name="Mileage" label="Mileage" value={product.mileage} />
                <FeatureItem name="Chassis No." label="Chassis No." value={product.chassisNo} />
                <FeatureItem name="Engine Code" label="Engine Code" value={product.engineCode} />
                <FeatureItem name="Model Code" label="Model Code" value={product.modelCode} />
                <FeatureItem name="Steering" label="Steering" value={product.steering} />
                <FeatureItem name="Engine Size" label="Engine Size" value={product.engine} />
                <FeatureItem name="Ext. Color" label="Ext. Color" value={product.color} />
                <FeatureItem name="Location" label="Location" value={product.location} />
                <FeatureItem name="Fuel" label="Fuel" value={product.fuel} />
                <FeatureItem name="Seats" label="Seats" value={product.seats} />
                <FeatureItem name="Drive" label="Drive" value={product.drive} />
                <FeatureItem name="Doors" label="Doors" value={product.doors} />
                <FeatureItem name="Transmission" label="Transmission" value={product.transmission} />
                <FeatureItem name="Registration Year/month" label="Registration Year/month" value={product.registrationYear} />
                <FeatureItem name="Manufacture Year/month" label="Manufacture Year/month" value={product.manufactureYear} />
                <FeatureItem name="Dimension" label="Dimension" value={product.dimension} />
                <FeatureItem name="Weight" label="Weight" value={product.weight} />
                <FeatureItem name="Max.Cap" label="Max.Cap" value={product.maxCap} />
              </div>

              {product.condition && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Condition</h3>
                  <p className="text-gray-600 text-sm">{product.condition}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Pricing & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-red-600 mb-2">{product.price}</div>
                <div className="text-sm text-gray-500">Total Price: {product.totalPrice}</div>
                <div className="text-xs text-gray-400 mt-1">CIF to Bahrain (RORO)</div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  BUY NOW
                </button>
                
                <button
                  onClick={handleShipmentInquiry}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  ASK SHIPMENT COST
                </button>
              </div>

              {/* Inquiry Form */}
              {showInquiryForm && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Shipment Inquiry</h3>
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Destination Port"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Country Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Person Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Mobile"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <textarea
                      placeholder="Address"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowInquiryForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
            
            {type === 'bikes' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <FeatureCheckbox name="bremboBrakes" label="Brembo Brakes" checked={product.features.bremboBrakes} />
                <FeatureCheckbox name="seatCowl" label="Seat Cowl" checked={product.features.seatCowl} />
                <FeatureCheckbox name="tintedScreen" label="Tinted Screen" checked={product.features.tintedScreen} />
                <FeatureCheckbox name="abs" label="ABS" checked={product.features.abs} />
                <FeatureCheckbox name="cruiseControl" label="Cruise Control" checked={product.features.cruiseControl} />
                <FeatureCheckbox name="modes" label="Modes" checked={product.features.modes} />
                <FeatureCheckbox name="heatedGrips" label="Heated Grips" checked={product.features.heatedGrips} />
                <FeatureCheckbox name="tca" label="TCA" checked={product.features.tca} />
                <FeatureCheckbox name="bsa" label="BSA" checked={product.features.bsa} />
                <FeatureCheckbox name="akrapovic" label="Akrapovic" checked={product.features.akrapovic} />
                <FeatureCheckbox name="superCharged" label="Super Charged" checked={product.features.superCharged} />
                <FeatureCheckbox name="radGuard" label="Rad Guard" checked={product.features.radGuard} />
                <FeatureCheckbox name="electricSuspension" label="Electric Suspension" checked={product.features.electricSuspension} />
                <FeatureCheckbox name="leoVince" label="Leo Vince" checked={product.features.leoVince} />
                <FeatureCheckbox name="panniers" label="Panniers" checked={product.features.panniers} />
                <FeatureCheckbox name="topBox" label="Top Box" checked={product.features.topBox} />
                <FeatureCheckbox name="frameProtection" label="Frame Protection" checked={product.features.frameProtection} />
                <FeatureCheckbox name="twinSeat" label="Twin Seat" checked={product.features.twinSeat} />
                <FeatureCheckbox name="ohlins" label="Ohlins" checked={product.features.ohlins} />
                <FeatureCheckbox name="singleSeat" label="Single Seat" checked={product.features.singleSeat} />
                <FeatureCheckbox name="tailTidy" label="Tail Tidy" checked={product.features.tailTidy} />
                <FeatureCheckbox name="sportsExhaust" label="Sports Exhaust" checked={product.features.sportsExhaust} />
                <FeatureCheckbox name="ledHeadlight" label="LED Headlight" checked={product.features.ledHeadlight} />
                <FeatureCheckbox name="keylessRide" label="Keyless Ride" checked={product.features.keylessRide} />
                <FeatureCheckbox name="drivingModesPro" label="Driving Modes Pro" checked={product.features.drivingModesPro} />
                <FeatureCheckbox name="comfortPackage" label="Comfort Package" checked={product.features.comfortPackage} />
                <FeatureCheckbox name="cruiseControlPro" label="Cruise Control Pro" checked={product.features.cruiseControlPro} />
                <FeatureCheckbox name="absPro" label="ABS Pro" checked={product.features.absPro} />
                <FeatureCheckbox name="showaForks" label="Showa Forks" checked={product.features.showaForks} />
                <FeatureCheckbox name="rgCarbon" label="R&G Carbon" checked={product.features.rgCarbon} />
                <FeatureCheckbox name="financeAvailable" label="Finance Available" checked={product.features.financeAvailable} />
                <FeatureCheckbox name="hpiClear" label="HPI Clear" checked={product.features.hpiClear} />
                <FeatureCheckbox name="deliveryAvailable" label="Delivery Available" checked={product.features.deliveryAvailable} />
                <FeatureCheckbox name="partExchangeWelcome" label="Part Exchange Welcome" checked={product.features.partExchangeWelcome} />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <FeatureCheckbox name="cdPlayer" label="CD Player" checked={product.features.cdPlayer} />
                <FeatureCheckbox name="sunRoof" label="Sun Roof" checked={product.features.sunRoof} />
                <FeatureCheckbox name="leatherSeat" label="Leather Seat" checked={product.features.leatherSeat} />
                <FeatureCheckbox name="alloyWheels" label="Alloy Wheels" checked={product.features.alloyWheels} />
                <FeatureCheckbox name="powerSteering" label="Power Steering" checked={product.features.powerSteering} />
                <FeatureCheckbox name="powerWindow" label="Power Window" checked={product.features.powerWindow} />
                <FeatureCheckbox name="ac" label="A/C" checked={product.features.ac} />
                <FeatureCheckbox name="abs" label="ABS" checked={product.features.abs} />
                <FeatureCheckbox name="airbag" label="Airbag" checked={product.features.airbag} />
                <FeatureCheckbox name="radio" label="Radio" checked={product.features.radio} />
                <FeatureCheckbox name="cdChanger" label="CD Changer" checked={product.features.cdChanger} />
                <FeatureCheckbox name="dvd" label="DVD" checked={product.features.dvd} />
                <FeatureCheckbox name="tv" label="TV" checked={product.features.tv} />
                <FeatureCheckbox name="powerSeat" label="Power Seat" checked={product.features.powerSeat} />
                <FeatureCheckbox name="backTire" label="Back Tire" checked={product.features.backTire} />
                <FeatureCheckbox name="grillGuard" label="Grill Guard" checked={product.features.grillGuard} />
                <FeatureCheckbox name="rearSpoiler" label="Rear Spoiler" checked={product.features.rearSpoiler} />
                <FeatureCheckbox name="centralLocking" label="Central Locking" checked={product.features.centralLocking} />
                <FeatureCheckbox name="jack" label="Jack" checked={product.features.jack} />
                <FeatureCheckbox name="spareTire" label="Spare Tire" checked={product.features.spareTire} />
                <FeatureCheckbox name="wheelSpanner" label="Wheel Spanner" checked={product.features.wheelSpanner} />
                <FeatureCheckbox name="fogLights" label="Fog Lights" checked={product.features.fogLights} />
                <FeatureCheckbox name="backCamera" label="Back Camera" checked={product.features.backCamera} />
                <FeatureCheckbox name="pushStart" label="Push Start" checked={product.features.pushStart} />
                <FeatureCheckbox name="keylessEntry" label="Keyless Entry" checked={product.features.keylessEntry} />
                <FeatureCheckbox name="esc" label="ESC" checked={product.features.esc} />
                <FeatureCheckbox name="camera360" label="360° Camera" checked={product.features.camera360} />
                <FeatureCheckbox name="bodyKit" label="Body Kit" checked={product.features.bodyKit} />
                <FeatureCheckbox name="sideAirbag" label="Side Airbag" checked={product.features.sideAirbag} />
                <FeatureCheckbox name="powerMirror" label="Power Mirror" checked={product.features.powerMirror} />
                <FeatureCheckbox name="sideSkirts" label="Side Skirts" checked={product.features.sideSkirts} />
                <FeatureCheckbox name="frontLipSpoiler" label="Front Lip Spoiler" checked={product.features.frontLipSpoiler} />
                <FeatureCheckbox name="navigation" label="Navigation" checked={product.features.navigation} />
                <FeatureCheckbox name="turbo" label="Turbo" checked={product.features.turbo} />
                <FeatureCheckbox name="powerSlideDoor" label="Power Slide Door" checked={product.features.powerSlideDoor} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductProfile; 