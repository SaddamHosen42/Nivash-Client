import React, { useState } from 'react';
import { RiCoupon3Fill } from 'react-icons/ri';
import { FaPlus, FaEdit, FaTrash, FaPercentage } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const ManageCoupons = () => {
  const [showForm, setShowForm] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!couponCode || !discount || !description) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Here you would typically send the data to your backend
    Swal.fire({
      title: 'Success!',
      text: 'Coupon has been created successfully',
      icon: 'success',
      confirmButtonColor: '#3085d6',
    });

    // Reset form
    setCouponCode('');
    setDiscount('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <RiCoupon3Fill className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Manage Coupons
                </h1>
                <p className="text-gray-600 mt-2">
                  Create and manage discount coupons for building residents
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaPlus className="text-sm" />
              <span>Add New Coupon</span>
            </button>
          </div>
        </div>

        {/* Add Coupon Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Coupon</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., SAVE20"
                />
              </div>

              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
                    placeholder="10"
                    min="1"
                    max="100"
                  />
                  <FaPercentage className="absolute right-4 top-3.5 text-gray-400" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe when and how this coupon can be used..."
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <RiCoupon3Fill className="text-sm" />
                  <span>Create Coupon</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Existing Coupons */}
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Active Coupons</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample coupon - replace with actual data */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <div className="absolute top-2 right-2 text-white text-xs font-bold transform rotate-45">
                  SAVE
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">WELCOME20</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaPercentage className="text-purple-500" />
                    <span className="text-2xl font-bold text-purple-600">20% OFF</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Welcome discount for new members on their first month rent
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-all duration-200">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add more sample coupons or map through actual data */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <div className="absolute top-2 right-2 text-white text-xs font-bold transform rotate-45">
                  DEAL
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">MONTHLY15</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaPercentage className="text-blue-500" />
                    <span className="text-2xl font-bold text-blue-600">15% OFF</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Monthly special discount for all residents
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-all duration-200">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageCoupons;
