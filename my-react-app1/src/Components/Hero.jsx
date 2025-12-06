import React, { useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  return (
    // <div className="relative">
    //   {/* Hero Banner */}
    //   <div
    //     className="h-96 bg-gradient-to-r from-blue-1000 to-blue-1000 relative"
    //     style={{
    //       // backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop)',
    //       backgroundImage: 'url(/background_img.jpeg)',
    //        backgroundSize: 'cover',
    //       backgroundPosition: 'center',
          
    //     }}
    //   >
    //     <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
    //     {/* Hero Content */}
    //     <div className="relative h-full  flex flex-col justify-center items-center text-white px-4">
    //       <h1 className="text-4xl font-bold mb-4">Journey to Discover India</h1>
    //       <p className="text-xl">Book your travel with IRCTC - Your Journey, Just a Tap Away</p>
    //     </div>
    //   </div>

    //   {/* Services Section */}
    //   {/* <div className="bg-gradient-to-r from-indigo-900 to-blue-800 py-8">
    //     <div className="max-w-7xl mx-auto px-4">
    //       <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
    //         {services.map((service, index) => {
    //           const Icon = service.icon;
    //           return (
    //             <div key={index} className="flex flex-col items-center">
    //               <button className={`${service.color} p-4 rounded-full hover:scale-110 transition transform`}>
    //                 <Icon size={28} className="text-gray-800" />
    //               </button>
    //               <span className="text-white text-xs font-semibold mt-2 text-center">{service.label}</span>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div> */}

    //   {/* Search Section */}
    //   <div className="bg-gradient-to-r from-indigo-900 to-blue-800 pb-12">
    //     <div className="max-w-4xl mx-auto px-4">
    //       <div className="bg-white rounded-lg shadow-lg p-6 -mt-8 relative z-10">
    //         <div className="flex flex-col md:flex-row gap-4 items-end">
    //           <div className="flex-1">
    //             <label className="block text-gray-700 text-sm font-semibold mb-2">Origin City</label>
    //             <input
    //               type="text"
    //               placeholder="Enter Origin City"
    //               value={origin}
    //               onChange={(e) => setOrigin(e.target.value)}
    //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    //             />
    //           </div>

    //           <div className="flex-1">
    //             <label className="block text-gray-700 text-sm font-semibold mb-2">Destination City</label>
    //             <input
    //               type="text"
    //               placeholder="Enter Destination City"
    //               value={destination}
    //               onChange={(e) => setDestination(e.target.value)}
    //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    //             />
    //           </div>

    //           <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-8 rounded-lg transition">
    //             Search
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>



    <div className="hero-container">

  {/* HERO IMAGE SECTION */}
  <div
    className="hero-image-section"
    style={{
      backgroundImage: "url(/background_img.jpeg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Dark Overlay */}
    <div className="hero-overlay"></div>

    {/* Hero Text Content */}
    <div className="hero-content">
      <h1 className="hero-title">Journey to Discover India</h1>
      <p className="hero-subtitle">
        Book your travel with IRCTC - Your Journey, Just a Tap Away
      </p>
    </div>

    {/* Search Box - Positioned inside the Hero image */}
    <div className="hero-search-container">
      <div className="hero-search-box">
        <div className="hero-search-form">

          {/* Origin Input */}
          <div className="hero-search-field">
            <label className="hero-search-label">
              Origin City
            </label>
            <input
              type="text"
              placeholder="Enter Origin City"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="hero-search-input"
            />
          </div>

          {/* Destination Input */}
          <div className="hero-search-field">
            <label className="hero-search-label">
              Destination City
            </label>
            <input
              type="text"
              placeholder="Enter Destination City"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="hero-search-input"
            />
          </div>

          {/* Search Button */}
          <button className="hero-search-btn">
            Search
          </button>

        </div>
      </div>
    </div>
  </div>

      {/* Images Section */}
      <div className="hero-features-section">
        <div className="hero-features-container">
          <h2 className="hero-features-title">Our Features</h2>
          <div className="hero-features-grid">
            <div className="hero-feature-card">
              <img
                src="/checkPnr.jpeg"
                alt="Hotel Offer"
                className="hero-feature-img"
              />
              <div className="hero-feature-content">
                <h3 className="hero-feature-title">PNR status checking</h3>
                <p className="hero-feature-description">Check real-time PNR status, seat confirmation chances, and updates</p>
              </div>
            </div>

            <div className="hero-feature-card">
              <img
                src="/tatkal_img.jpeg"
                alt="Bus Tickets"
                className="hero-feature-img"
              />
              <div className="hero-feature-content">
                <h3 className="hero-feature-title">Train Ticket Cancellation</h3>
                <p className="hero-feature-description">Cancel your train tickets easily and receive instant refund and status updates.</p>
              </div>
            </div>

            <div className="hero-feature-card">
              <img
                src="/cancel.jpeg"
                alt="Bharat Gaurav"
                className="hero-feature-img"
              />
              <div className="hero-feature-content">
                <h3 className="hero-feature-title">Tatkal Ticket Booking</h3>
                <p className="hero-feature-description">Fast and secured Tatkal booking for emergency travel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
