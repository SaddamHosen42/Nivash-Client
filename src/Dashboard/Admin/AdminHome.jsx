import React from 'react';
import { FaHome, FaUsers, FaUserTie, FaCog, FaChartLine, FaBuilding, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { MdDashboard, MdAnnouncement, MdRequestPage, MdPayment } from 'react-icons/md';
import { RiCoupon3Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch dashboard statistics
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: async () => {
      const [apartmentRes, userRes, agreementRes, announcementRes, couponRes] = await Promise.all([
        axiosSecure.get('/apartments/stats'),
        axiosSecure.get('/users/stats'),
        axiosSecure.get('/agreements/stats'),
        axiosSecure.get('/announcements/stats'),
        axiosSecure.get('/coupons/stats')
      ]);

      return {
        apartments: apartmentRes.data,
        users: userRes.data,
        agreements: agreementRes.data,
        announcements: announcementRes.data,
        coupons: couponRes.data
      };
    }
  });

  // Quick stats data
  const quickStats = [
    {
      title: 'Total Apartments',
      value: stats.apartments?.total || 0,
      icon: FaBuilding,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+2.5%',
      changeType: 'positive'
    },
    {
      title: 'Available Units',
      value: stats.apartments?.available || 0,
      icon: FaHome,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '-1.2%',
      changeType: 'negative'
    },
    {
      title: 'Total Users',
      value: stats.users?.totalUsers || 0,
      icon: FaUsers,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+5.8%',
      changeType: 'positive'
    },
    {
      title: 'Active Members',
      value: stats.users?.totalMembers || 0,
      icon: FaUserTie,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      change: '+3.2%',
      changeType: 'positive'
    },
    {
      title: 'Pending Requests',
      value: stats.agreements?.pending || 0,
      icon: MdRequestPage,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Coupons',
      value: stats.coupons?.active || 0,
      icon: RiCoupon3Fill,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      change: '0%',
      changeType: 'neutral'
    }
  ];

  // Quick actions
  const quickActions = [
    {
      title: 'Manage Apartments',
      description: 'Add, edit, or remove apartments',
      icon: FaBuilding,
      color: 'from-blue-500 to-blue-600',
      link: '/dashboard',
      count: stats.apartments?.total || 0
    },
    {
      title: 'Agreement Requests',
      description: 'Review pending agreement requests',
      icon: MdRequestPage,
      color: 'from-green-500 to-green-600',
      link: '/dashboard/agreementRequests',
      count: stats.agreements?.pending || 0,
      urgent: (stats.agreements?.pending || 0) > 0
    },
    {
      title: 'Manage Members',
      description: 'View and manage building members',
      icon: FaUserTie,
      color: 'from-purple-500 to-purple-600',
      link: '/dashboard/manageMembers',
      count: stats.users?.totalMembers || 0
    },
    {
      title: 'Make Announcement',
      description: 'Create new announcements',
      icon: MdAnnouncement,
      color: 'from-indigo-500 to-indigo-600',
      link: '/dashboard/makeAnnouncement',
      count: stats.announcements?.total || 0
    },
    {
      title: 'Manage Coupons',
      description: 'Create and manage discount coupons',
      icon: RiCoupon3Fill,
      color: 'from-pink-500 to-pink-600',
      link: '/dashboard/manageCoupons',
      count: stats.coupons?.active || 0
    },
    {
      title: 'Admin Profile',
      description: 'View detailed admin statistics',
      icon: MdDashboard,
      color: 'from-gray-500 to-gray-600',
      link: '/dashboard/adminProfile',
      count: null
    }
  ];

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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <MdDashboard className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome back, {user?.displayName || 'Admin'}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Here's what's happening in your building today
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <FaCalendarAlt />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8"
        >
          {quickStats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`p-6 ${stat.bgColor}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.changeType === 'positive' ? 'text-green-600 bg-green-100' :
                    stat.changeType === 'negative' ? 'text-red-600 bg-red-100' :
                    'text-gray-600 bg-gray-100'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaClipboardList className="mr-3 text-blue-600" />
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <Link to={action.link}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 group-hover:border-blue-200 relative overflow-hidden">
                    {action.urgent && (
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {action.description}
                        </p>
                        {action.count !== null && (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Count:</span>
                            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                              action.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {action.count}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* System Health */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaChartLine className="mr-3 text-green-600" />
              System Health
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Database</span>
                </div>
                <span className="text-green-600 font-semibold">Operational</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">API Services</span>
                </div>
                <span className="text-green-600 font-semibold">Running</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">User Sessions</span>
                </div>
                <span className="text-blue-600 font-semibold">Active</span>
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaCog className="mr-3 text-purple-600" />
              Today's Summary
            </h3>
            
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex justify-between items-center p-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Apartments</span>
                    <span className="font-semibold text-blue-600">{stats.apartments?.total || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Available Units</span>
                    <span className="font-semibold text-green-600">{stats.apartments?.available || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Pending Requests</span>
                    <span className="font-semibold text-orange-600">{stats.agreements?.pending || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Active Members</span>
                    <span className="font-semibold text-purple-600">{stats.users?.totalMembers || 0}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminHome;