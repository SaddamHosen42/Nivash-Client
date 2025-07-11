import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Slider1 = () => {
  return (
    <div className="hero min-h-screen relative overflow-hidden bg-gradient-to-tr from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url(https://i.ibb.co/d4yLgt12/building1.jpg)",
          }}
        ></div>
        {/* Different floating shapes */}
        <motion.div
          className="absolute top-32 left-16 w-20 h-20 bg-blue-500/30 rounded-xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-40 right-20 w-36 h-36 bg-indigo-400/20 rounded-full border-2 border-indigo-300/30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-1/3 right-10 w-12 h-40 bg-slate-400/25 rounded-full"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      <div className="hero-content text-neutral-content relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Single Column Center Layout */}
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: "easeOut",
              }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-200 rounded-2xl text-base font-bold mb-8 border border-blue-400/40 backdrop-blur-sm">
                <span className="mr-3">�️</span>
                INTELLIGENT BUILDING SOLUTIONS
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-8">
                <span className="block text-white">Next-Gen</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400">
                  Building
                </span>
                <span className="block text-3xl lg:text-4xl text-slate-300 font-medium">
                  Management System
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.7,
              }}
              className="text-xl text-slate-200 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Transform your residential complex with cutting-edge technology.
              Streamline operations, enhance tenant experience, and maximize
              efficiency with our all-in-one smart building platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 1,
              }}
              className="flex flex-col lg:flex-row gap-6 justify-center items-center"
            >
              <Link >
                <button className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-lg font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105">
                  <span className="relative z-10 flex items-center">
                    <span>Get Started</span>
                    <svg
                      className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </Link>
              <Link >
                <button className="px-12 py-5 border-3 border-slate-300 text-slate-300 text-lg font-bold rounded-2xl hover:bg-slate-300 hover:text-slate-900 transition-all duration-500 backdrop-blur-sm">
                  Watch Demo
                </button>
              </Link>
            </motion.div>

            {/* Stats Row - Horizontal Layout */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1.3,
              }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="text-5xl font-black text-blue-400 mb-3">
                  500+
                </div>
                <div className="text-base text-slate-300 font-medium">
                  Smart Units
                </div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="text-4xl font-black text-indigo-400 mb-3">
                  95%
                </div>
                <div className="text-base text-slate-300 font-medium">
                  Automation
                </div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="text-4xl font-black text-purple-400 mb-3">
                  24/7
                </div>
                <div className="text-base text-slate-300 font-medium">
                  AI Support
                </div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="text-4xl font-black text-cyan-400 mb-3">
                  10+
                </div>
                <div className="text-base text-slate-300 font-medium">
                  Years Exp
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider1;
