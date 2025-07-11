import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Slider3 = () => {
  return (
    <div className="hero min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/LzV4N2sG/building3.jpg)",
          }}
        ></div>
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 bg-cyan-400/20 rotate-45"
          animate={{
            rotate: [45, 90, 45],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 right-32 w-16 h-16 bg-teal-300/30 rounded-lg"
          animate={{
            x: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      <div className="hero-content text-neutral-content relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: "easeOut",
              }}
            >
              <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-4 border border-emerald-400/30">
                🏢 PREMIUM BUILDING MANAGEMENT
              </span>
              <h1 className="text-6xl lg:text-7xl font-bold leading-none mb-6">
                Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300">
                  Future Home
                </span>
                <span className="block text-4xl lg:text-5xl text-gray-300 font-light">
                  Starts Here
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
              className="text-xl text-gray-200 leading-relaxed max-w-lg"
            >
              Join a community where innovation meets comfort. Experience
              intelligent living with our IoT-enabled apartments, sustainable
              design, and unmatched convenience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/register">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25">
                  <span className="relative z-10">Start Your Journey</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </Link>
              <Link to="/virtual-tour">
                <button className="px-8 py-4 border-2 border-emerald-400 text-emerald-400 font-semibold rounded-xl hover:bg-emerald-400 hover:text-emerald-900 transition-all duration-300">
                  Virtual Tour
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
            }}
            className="space-y-6"
          >
            {/* Main Feature Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-emerald-400 mb-2">
                    25
                  </div>
                  <div className="text-sm text-gray-300">Floors</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    350
                  </div>
                  <div className="text-sm text-gray-300">Smart Units</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-teal-400 mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-300">Satisfaction</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-emerald-300 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-300">Support</div>
                </motion.div>
              </div>
            </div>

            {/* Feature Icons Row */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                className="bg-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 text-center border border-emerald-400/30 hover:bg-emerald-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="text-emerald-400 mb-3">
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
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold">Smart Control</h4>
              </motion.div>

              <motion.div
                className="bg-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 text-center border border-cyan-400/30 hover:bg-cyan-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-cyan-400 mb-3">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold">Eco-Friendly</h4>
              </motion.div>

              <motion.div
                className="bg-teal-500/20 backdrop-blur-lg rounded-2xl p-6 text-center border border-teal-400/30 hover:bg-teal-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="text-teal-400 mb-3">
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
                <h4 className="text-sm font-semibold">High Speed</h4>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slider3;
