import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaShieldAlt, FaHome, FaArrowLeft, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden md:pt-30">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/10 rounded-full blur-2xl animate-ping"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg w-full text-center relative z-10"
      >
        {/* Animated Lock Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 animate-pulse"></div>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <FaShieldAlt className="w-16 h-16 text-red-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 relative overflow-hidden"
        >
          {/* Card Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-transparent rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Error Code */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-8xl font-black bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-6 drop-shadow-lg"
            >
              403
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3"
            >
              <MdSecurity className="text-red-500" />
              Access Forbidden
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-gray-600 mb-8 leading-relaxed text-lg"
            >
              Sorry, you don't have permission to access this page. This area is
              restricted to authorized users only.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 text-lg group"
                >
                  <FaHome className="group-hover:animate-bounce" />
                  Go to Home
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => window.history.back()}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg inline-flex items-center justify-center gap-3 text-lg group"
                >
                  <FaArrowLeft className="group-hover:animate-pulse" />
                  Go Back
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <p className="text-gray-600 text-lg mb-6 font-medium">
              Need help? Contact our support team
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:saddamhosen1433@gmail.com"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaEnvelope />
                Email Support
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+8801627482575"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaPhone />
                Call Support
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Floating Security Icons */}
        <div className="absolute top-10 left-10 text-red-300/30 animate-bounce delay-500">
          <MdSecurity className="w-6 h-6" />
        </div>
        <div className="absolute top-20 right-16 text-pink-300/30 animate-pulse delay-1000">
          <FaShieldAlt className="w-5 h-5" />
        </div>
        <div className="absolute bottom-20 left-16 text-orange-300/30 animate-bounce delay-700">
          <MdSecurity className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
};

export default Forbidden;