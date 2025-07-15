import React from 'react';
import { FaHome, FaUser, FaCalendarAlt, FaClipboardList, FaBell, FaBuilding, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { MdDashboard, MdAnnouncement, MdApartment } from 'react-icons/md';
import { RiCoupon3Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useUserRole from '../hooks/useUserRole';

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role: userRole } = useUserRole();


  // Fetch recent announcements
  const { data: announcements = [], isLoading: announcementsLoading } = useQuery({
    queryKey: ['recentAnnouncements'],
    queryFn: async () => {
      const response = await axiosSecure.get('/announcements');
      return response.data.slice(0, 3); // Limit to 3 announcements
    }
  });

  // Fetch available coupons
  const { data: availableCoupons = [], isLoading: couponsLoading } = useQuery({
    queryKey: ['availableCoupons'],
    queryFn: async () => {
      const response = await axiosSecure.get('/coupons');
      return response.data.filter(coupon => coupon.isAvailable).slice(0, 3);
    }
  });

  // Quick actions for users
  const quickActions = [
    {
      title: 'View Apartments',
      description: 'Browse available apartments',
      icon: MdApartment,
      color: 'from-blue-500 to-blue-600',
      link: '/apartment',
      available: true
    },
    {
      title: 'My Profile',
      description: 'View and edit your profile',
      icon: FaUser,
      color: 'from-green-500 to-green-600',
      link: '/dashboard/myProfile',
      available: true
    },
    {
      title: 'Announcements',
      description: 'Read latest announcements',
      icon: MdAnnouncement,
      color: 'from-purple-500 to-purple-600',
      link: '/dashboard/announcements',
      available: true
    },
    {
      title: 'Make Payment',
      description: 'Pay your monthly rent',
      icon: FaDollarSign,
      color: 'from-indigo-500 to-indigo-600',
      link: '/dashboard/payment',
      available: userRole === 'member'
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
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="User Profile"
                    className="w-full h-full rounded-full object-cover bg-white"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
                    style={{ display: 'none' }}
                  >
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome, {user?.displayName?.split(' ')[0] || 'User'}!
                </h1>
                <p className="text-gray-600 mt-1">
                  {userRole === 'member' ? 'Building Member Dashboard' : 'User Dashboard'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <FaCalendarAlt />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.filter(action => action.available).map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <Link to={action.link}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 group-hover:border-blue-200">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="text-white text-2xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Recent Announcements */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaBell className="mr-3 text-blue-600" />
                Recent Announcements
              </h3>
              <Link to="/dashboard/announcements" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            
            {announcementsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MdAnnouncement className="mx-auto text-4xl mb-4 opacity-50" />
                <p>No announcements available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement._id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-2">{announcement.title}</h4>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{announcement.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Available Coupons */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <RiCoupon3Fill className="mr-3 text-pink-600" />
                Available Coupons
              </h3>
            </div>
            
            {couponsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : availableCoupons.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <RiCoupon3Fill className="mx-auto text-4xl mb-4 opacity-50" />
                <p>No coupons available at the moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {availableCoupons.map((coupon) => (
                  <div key={coupon._id} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800">{coupon.code}</h4>
                        <p className="text-sm text-gray-600">{coupon.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-pink-600">{coupon.discount}%</div>
                        <div className="text-xs text-gray-500">OFF</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <Link to="/" className="text-pink-600 hover:text-pink-800 text-sm font-medium">
                    View All Coupons
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserHome;