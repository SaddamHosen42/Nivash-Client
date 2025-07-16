import React from "react";
import { motion } from "framer-motion";

const LocationMap = () => {
  const locationInfo = {
    address: "123 Building Management Street, Dhaka 1000, Bangladesh",
    phone: "+880 1234-567890",
    email: "info@buildingmanagement.com",
    coordinates: { lat: 23.8103, lng: 90.4125 },
  };

  const transportOptions = [
    {
      icon: "🚗",
      title: "By Car",
      description: "15 minutes from Dhaka Airport",
      time: "15 min",
    },
    {
      icon: "🚌",
      title: "By Bus",
      description: "Direct bus service available",
      time: "25 min",
    },
    {
      icon: "🚇",
      title: "By Metro",
      description: "Nearest metro station: 5 min walk",
      time: "20 min",
    },
    {
      icon: "🚕",
      title: "By Taxi",
      description: "Available 24/7 from any location",
      time: "Variable",
    },
  ];

  const nearbyPlaces = [
    { name: "Shopping Mall", distance: "0.5 km", icon: "🛍️" },
    { name: "Hospital", distance: "1.2 km", icon: "🏥" },
    { name: "School", distance: "0.8 km", icon: "🏫" },
    { name: "Bank", distance: "0.3 km", icon: "🏦" },
    { name: "Restaurant", distance: "0.2 km", icon: "🍽️" },
    { name: "Park", distance: "0.6 km", icon: "🌳" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-purple-400/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200/50"
          >
            <span className="text-lg">📍</span>
            <span>PRIME LOCATION</span>
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Find Us &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
              {" "}
              Get Directions
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full opacity-30"></div>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Located in the heart of Dhaka with excellent connectivity and
            surrounded by essential amenities for your convenience.
          </motion.p>
        </motion.div>

        {/* Full Width Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Google Maps Embed - Full Width */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9076956469344!2d${locationInfo.coordinates.lng}!3d${locationInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM3LjEiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1641234567890!5m2!1sen!2sbd`}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Building Location Map"
              className="rounded-3xl relative z-10"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Location</span>
              </div>
            </div>
          </div>

          {/* Directions Button - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <motion.a
              href={`https://www.google.com/maps/dir/?api=1&destination=${locationInfo.coordinates.lat},${locationInfo.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.span 
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🗺️
              </motion.span>
              <span className="relative z-10">Get Directions on Google Maps</span>
              <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Transportation & Nearby Places */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Transportation Options */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                How to Get Here
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {transportOptions.map((transport, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{transport.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {transport.title}
                        </h4>
                        <span className="text-sm text-blue-600 font-medium">
                          {transport.time}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {transport.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Nearby Places */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Nearby Amenities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {nearbyPlaces.map((place, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">{place.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {place.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {place.distance}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
