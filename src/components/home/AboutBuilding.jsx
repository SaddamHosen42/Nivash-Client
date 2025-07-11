import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const AboutBuilding = () => {
  // Building Stats Data
  const buildingStats = [
    { value: 25, label: "Total Floors", color: "text-blue-600" },
    { value: 250, label: "Luxury Units", color: "text-purple-600" },
    { value: 15, label: "Sq Ft Common Area", suffix: "K", color: "text-green-600" },
    { value: 24, label: "Concierge Service", suffix: "/7", color: "text-orange-600" }
  ];

  // Building Features Data
  const buildingFeatures = [
    {
      id: 1,
      title: "Rooftop Terrace",
      description: "Stunning 360° city views from our beautifully landscaped rooftop garden with BBQ areas and lounge spaces.",
      gradient: "from-blue-500 to-blue-600",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    },
    {
      id: 2,
      title: "Fitness Center",
      description: "State-of-the-art gym with premium equipment, yoga studio, and personal training services available.",
      gradient: "from-green-500 to-green-600",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      id: 3,
      title: "Smart Security",
      description: "Advanced biometric access control, 24/7 surveillance, and dedicated security personnel ensure your safety.",
      gradient: "from-purple-500 to-purple-600",
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
    },
    {
      id: 4,
      title: "Event Hall",
      description: "Elegant multi-purpose event space perfect for celebrations, meetings, and community gatherings.",
      gradient: "from-yellow-500 to-orange-500",
      icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
    },
    {
      id: 5,
      title: "Swimming Pool",
      description: "Resort-style infinity pool with poolside cabanas and a dedicated children's play area.",
      gradient: "from-red-500 to-pink-500",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    {
      id: 6,
      title: "Parking Garage",
      description: "Climate-controlled underground parking with EV charging stations and valet services available.",
      gradient: "from-indigo-500 to-indigo-600",
      icon: "M8 9l4-4 4 4m0 6l-4 4-4-4"
    }
  ];

  // Features Data
  const featuresData = [
    "Premium location in the heart of the city",
    "LEED Gold certified sustainable design",
    "Smart home technology in every unit"
  ];
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container w-[90%] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            ABOUT OUR BUILDING
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your New
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Home</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Step into a world of modern luxury and convenience. Our state-of-the-art building 
            combines contemporary design with smart technology to create the perfect living experience.
          </p>
        </div>

        {/* Building Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Modern Architecture Meets
              <span className="block text-blue-600">Smart Living</span>
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our building stands as a testament to modern architectural excellence, featuring 
              cutting-edge design principles that prioritize both aesthetics and functionality. 
              Every detail has been carefully crafted to enhance your daily living experience.
            </p>
            <div className="space-y-4">
              {featuresData.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Building Stats */}
          <div className="grid grid-cols-2 gap-6">
            {buildingStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  <CountUp 
                    end={stat.value} 
                    duration={2} 
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {stat.suffix && stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Building Features */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Premium Building 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Features</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buildingFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}/>
                  </svg>
                </motion.div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Call This Place Home?
          </h3>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Experience luxury living at its finest. Schedule a private tour today and discover 
            why our residents choose to call our building their home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105">
              Schedule Tour
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              View Floor Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
