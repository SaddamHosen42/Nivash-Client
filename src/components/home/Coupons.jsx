import React from 'react';
import { RiCoupon3Fill } from 'react-icons/ri';
import { FaPercentage, FaGift, FaCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';

const Coupons = () => {
  const [copiedCode, setCopiedCode] = useState('');
  const axiosSecure = useAxiosSecure();

  // Fetch available coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['availableCoupons'],
    queryFn: async () => {
      const response = await axiosSecure.get('/coupons');
      // Filter only available coupons
      return response.data.filter(coupon => coupon.isAvailable);
    }
  });

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaGift className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Exclusive Offers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't miss out on our amazing discount coupons! Save money on your rent and building services with these limited-time offers.
          </p>
        </motion.div>

        {/* Coupons Grid */}
        {coupons.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-12 max-w-md mx-auto shadow-xl">
              <RiCoupon3Fill className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                No Active Coupons
              </h3>
              <p className="text-gray-500 text-lg">
                Check back soon for exciting discount offers!
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coupons.map((coupon) => (
              <motion.div
                key={coupon._id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 group-hover:border-purple-200">
                  {/* Coupon Header */}
                  <div className="relative p-8 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <RiCoupon3Fill className="text-white text-3xl" />
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                          LIMITED TIME
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {coupon.code}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <FaPercentage className="text-white text-lg" />
                        <span className="text-4xl font-bold text-white">
                          {coupon.discount}% OFF
                        </span>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full transform -translate-x-8 translate-y-8"></div>
                  </div>

                  {/* Coupon Body */}
                  <div className="p-8">
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {coupon.description}
                    </p>
                    
                    {/* Copy Code Button */}
                    <button
                      onClick={() => handleCopyCode(coupon.code)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <FaCheck className="text-lg" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy className="text-lg" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Decorative Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        {coupons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Save Money?
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                Use these coupon codes during your next payment and enjoy instant discounts on your rent and building services.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <FaPercentage className="text-purple-500" />
                  <span>Instant Discount</span>
                </span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="flex items-center space-x-1">
                  <RiCoupon3Fill className="text-pink-500" />
                  <span>Easy to Use</span>
                </span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="flex items-center space-x-1">
                  <FaGift className="text-blue-500" />
                  <span>Limited Time</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Coupons;