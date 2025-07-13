import React, { useState } from 'react';
import { TfiAnnouncement } from 'react-icons/tfi';
import { FaPaperPlane, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !description) {
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
      text: 'Announcement has been posted successfully',
      icon: 'success',
      confirmButtonColor: '#3085d6',
    });

    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <TfiAnnouncement className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Make Announcement
              </h1>
              <p className="text-gray-600 mt-2">
                Create and share important announcements with all building members
              </p>
            </div>
          </div>
        </div>

        {/* Announcement Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Announcement</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Announcement Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter announcement title..."
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter announcement description..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaPaperPlane className="text-sm" />
                <span>Post Announcement</span>
              </button>
            </div>
          </form>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Announcements</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Sample announcement - replace with actual data */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Building Maintenance Notice
                  </h3>
                  <p className="text-gray-600 mb-3">
                    The building will undergo routine maintenance on Saturday from 9 AM to 5 PM. 
                    Water supply may be interrupted during this time.
                  </p>
                  <span className="text-sm text-gray-500">Posted on: January 15, 2024</span>
                </div>
                <div className="flex space-x-2 ml-4">
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
      </motion.div>
    </div>
  );
};

export default MakeAnnouncement;
