import React from "react";
import PageTitle from "../../components/shared/PageTitle";
import {
  FaUser,
  FaHome,
  FaUsers,
  FaUserTie,
  FaChartPie,
  FaBuilding,
} from "react-icons/fa";
import { MdEmail, MdDashboard } from "react-icons/md";
import { motion } from "framer-motion";//eslint-disable-line
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch apartment statistics
  const { data: apartmentStats = {}, isLoading: apartmentLoading } = useQuery({
    queryKey: ["apartmentStats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/apartments/stats");
      return response.data;
    },
  });

  // Fetch user statistics
  const { data: userStats = {}, isLoading: userLoading } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users/stats");
      return response.data;
    },
  });

  // Calculate percentages
  const totalApartments = apartmentStats.total || 0;
  const availableApartments = apartmentStats.available || 0;
  const unavailableApartments = apartmentStats.unavailable || 0;

  const availablePercentage =
    totalApartments > 0
      ? ((availableApartments / totalApartments) * 100).toFixed(1)
      : 0;
  const unavailablePercentage =
    totalApartments > 0
      ? ((unavailableApartments / totalApartments) * 100).toFixed(1)
      : 0;

  const isLoading = apartmentLoading || userLoading;

  const statsCards = [
    {
      title: "Total Apartments",
      value: totalApartments,
      icon: FaBuilding,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Available Apartments",
      value: `${availableApartments} (${availablePercentage}%)`,
      icon: FaHome,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Rented Apartments",
      value: `${unavailableApartments} (${unavailablePercentage}%)`,
      icon: FaChartPie,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Total Users",
      value: userStats.totalUsers || 0,
      icon: FaUsers,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Active Members",
      value: userStats.totalMembers || 0,
      icon: FaUserTie,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
     <PageTitle title="Admin Profile" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <MdDashboard className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Overview of building management system
              </p>
            </div>
          </div>
        </div>

        {/* Admin Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="Admin Profile"
                  className="w-full h-full rounded-full object-cover bg-white"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold"
                  style={{ display: "none" }}
                >
                  {user?.displayName?.charAt(0) ||
                    user?.email?.charAt(0) ||
                    "A"}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {user?.displayName || "Admin User"}
              </h2>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MdEmail className="text-lg" />
                  <span className="text-lg">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <FaUserTie className="text-lg" />
                  <span className="text-lg font-semibold">Administrator</span>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold">
                <FaUser className="mr-2" />
                System Administrator
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div
                className={`p-6 ${stat.bgColor} group-hover:scale-105 transition-transform duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon className="text-white text-xl" />
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm font-medium mb-1">
                    {stat.title}
                  </div>
                  <div className={`text-2xl font-bold ${stat.textColor}`}>
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                    ) : (
                      stat.value
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Apartment Distribution */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaChartPie className="mr-3 text-blue-600" />
              Apartment Distribution
            </h3>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex justify-between mb-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Available Apartments */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Available</span>
                    <span className="text-green-600 font-bold">
                      {availableApartments} ({availablePercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${availablePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Rented Apartments */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">
                      Rented/Unavailable
                    </span>
                    <span className="text-orange-600 font-bold">
                      {unavailableApartments} ({unavailablePercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${unavailablePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-semibold text-lg">
                      Total Apartments
                    </span>
                    <span className="text-blue-600 font-bold text-xl">
                      {totalApartments}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Statistics */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaUsers className="mr-3 text-purple-600" />
              User Statistics
            </h3>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Total Users */}
                <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <FaUsers className="text-white text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {userStats.totalUsers || 0}
                    </p>
                  </div>
                </div>

                {/* Active Members */}
                <div className="flex items-center p-4 bg-indigo-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <FaUserTie className="text-white text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 font-medium">Active Members</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {userStats.totalMembers || 0}
                    </p>
                  </div>
                </div>

                {/* Regular Users */}
                <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 font-medium">Regular Users</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {(userStats.totalUsers || 0) -
                        (userStats.totalMembers || 0)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
