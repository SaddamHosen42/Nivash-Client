import React, { useState } from 'react';
import { TfiAnnouncement } from 'react-icons/tfi';
import { FaCalendarAlt, FaUser, FaFilter, FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';// eslint-disable-line
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import PageTitle from '../components/shared/PageTitle';

const Announcements = () => {
  const [filterType, setFilterType] = useState('all');
  const axiosSecure = useAxiosSecure();

  // Fetch all announcements
  const {
    data: announcements = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  // Filter announcements based on filter
  const filteredAnnouncements = announcements.filter(announcement => {
    if (filterType === 'all') return true;
    if (filterType === 'recent') {
      const isRecent = new Date(announcement.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return isRecent;
    }
    return true;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <PageTitle title="Announcements" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <TfiAnnouncement className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Building Announcements
                </h1>
                <p className="text-gray-600 mt-2">
                  Stay updated with important building notifications and announcements
                </p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center">
                    <FaBell className="mr-1" />
                    {announcements.length} Total Announcements
                  </span>
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    Last updated: {announcements.length > 0 ? new Date(announcements[0]?.createdAt).toLocaleDateString() : 'No updates'}
                  </span>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex justify-end">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Announcements</option>
                <option value="recent">Recent (Last 7 days)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Announcements Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Content Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">All Announcements</h2>
                <p className="text-blue-100 text-sm mt-1">
                  {filteredAnnouncements.length} announcement(s) found
                </p>
              </div>
              <FaFilter className="text-2xl opacity-70" />
            </div>
          </div>

          {/* Announcements List */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="mt-4 text-center text-gray-600">Loading announcements...</div>
                </div>
              </div>
            ) : isError ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TfiAnnouncement className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Announcements</h3>
                <p className="text-red-600">Failed to load announcements. Please try again later.</p>
              </div>
            ) : filteredAnnouncements.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TfiAnnouncement className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {filterType !== 'all' ? 'No Matching Announcements' : 'No Announcements Found'}
                </h3>
                <p className="text-gray-600">
                  {filterType !== 'all' 
                    ? 'Try adjusting your filter criteria.' 
                    : 'There are currently no announcements available.'}
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {filteredAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={announcement._id}
                    variants={itemVariants}
                    className="group border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50/50"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Announcement Badge */}
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <TfiAnnouncement className="text-white text-sm" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                              Announcement #{announcements.length - index}
                            </span>
                            {new Date(announcement.createdAt) > new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) && (
                              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                          {announcement.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {announcement.description}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <span>
                              {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          {announcement.author && (
                            <div className="flex items-center space-x-2">
                              <FaUser className="text-purple-500" />
                              <span>By: {announcement.author.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        {announcements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TfiAnnouncement className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{announcements.length}</p>
                  <p className="text-gray-600 text-sm">Total Announcements</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaBell className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {announcements.filter(a => new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                  </p>
                  <p className="text-gray-600 text-sm">This Week</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaUser className="text-purple-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">Admin</p>
                  <p className="text-gray-600 text-sm">Posted By</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Announcements;