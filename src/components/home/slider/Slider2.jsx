import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Slider2 = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/d4yLgt12/building1.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-[800px]">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="mb-6 text-6xl font-bold leading-tight"
          >
            Luxury Living
            <span className="text-gradient bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {" "}
              Redefined
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
            className="mb-8 text-xl leading-relaxed text-gray-100 max-w-2xl mx-auto"
          >
            Discover premium apartments with world-class amenities, smart home
            technology, and 24/7 concierge services. Your dream home awaits in
            our modern residential tower.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <Link to="/apartments">
              <button className="btn bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 border-none text-white px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                View Apartments
              </button>
            </Link>
            <Link to="/contact">
              <button className="btn btn-outline border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-10 py-4 text-lg font-semibold transition-all duration-300">
                Schedule Visit
              </button>
            </Link>
          </motion.div>

          {/* Amenities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-yellow-400 mb-3">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Swimming Pool</h4>
              <p className="text-sm text-gray-300">
                Infinity pool with city views
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-yellow-400 mb-3">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Fitness Center</h4>
              <p className="text-sm text-gray-300">
                24/7 premium gym facilities
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-yellow-400 mb-3">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Smart Security</h4>
              <p className="text-sm text-gray-300">Advanced access control</p>
            </div>

            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-yellow-400 mb-3">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Concierge</h4>
              <p className="text-sm text-gray-300">Premium resident services</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slider2;
