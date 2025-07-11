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
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            📍 PRIME LOCATION
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Find Us &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}
              Get Directions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Located in the heart of Dhaka with excellent connectivity and
            surrounded by essential amenities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Google Maps Embed */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9076956469344!2d${locationInfo.coordinates.lng}!3d${locationInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM3LjEiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1641234567890!5m2!1sen!2sbd`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Building Location Map"
                className="rounded-2xl"
              ></iframe>
            </div>

            {/* Directions Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${locationInfo.coordinates.lat},${locationInfo.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <span>🗺️</span>
                  Get Directions on Google Maps
                </span>
              </a>
            </motion.div>
            
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">📍</span>
                  <span className="text-gray-700">{locationInfo.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">📞</span>
                  <a
                    href={`tel:${locationInfo.phone}`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {locationInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-600">✉️</span>
                  <a
                    href={`mailto:${locationInfo.email}`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {locationInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transportation & Nearby Places */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
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

            {/* Nearby Places */}
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
