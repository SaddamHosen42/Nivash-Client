import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaDoorOpen,
  FaDollarSign,
  FaHourglassHalf,
  FaEdit,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user's agreements
  const { data: agreements = [], isLoading } = useQuery({
    queryKey: ["agreements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Get the latest agreement (assuming user can have only one active agreement)
  const userAgreement = agreements[0] || null;

  const formatDate = (dateString) => {
    if (!dateString) return "None";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //console.log(userAgreement?.status);

  // Check if status is pending to show null values

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold  text-purple-600  mb-2">My Profile</h1>
          <p className="text-gray-600 text-lg">
            Manage your personal information and apartment details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="text-blue-100">Your account details</p>
            </div>

            <div className="p-8">
              {/* Profile Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center mb-8"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg mb-4">
                  <img
                    alt="Profile"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>

              {/* User Details */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaUser className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {user?.displayName || user?.name || "Not provided"}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-green-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      Email Address
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {user?.email || "Not provided"}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Edit Profile Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FaEdit className="text-lg" />
                  <span>Edit Profile</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Apartment Information Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Apartment Information</h2>
              <p className="text-emerald-100">Your rental details</p>
            </div>

            <div className="p-8">
              {/* Agreement Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8 text-center"
              >
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <FaHourglassHalf className="text-2xl text-gray-400" />
                  <span className="text-lg font-medium text-gray-700">
                    Agreement Status
                  </span>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    userAgreement?.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {userAgreement?.status}
                </span>
              </motion.div>

              <div className="space-y-6">
                {/* Agreement Accept Date */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-purple-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      Agreement Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">demo</p>
                  </div>
                </motion.div>

                {/* Floor */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FaBuilding className="text-indigo-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Floor</p>
                    <p className="text-lg font-semibold text-gray-900">demo</p>
                  </div>
                </motion.div>

                {/* Block */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <HiLocationMarker className="text-cyan-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Block</p>
                    <p className="text-lg font-semibold text-gray-900">demo</p>
                  </div>
                </motion.div>

                {/* Apartment Number */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaDoorOpen className="text-orange-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      Apartment No
                    </p>
                    <p className="text-lg font-semibold text-gray-900">demo</p>
                  </div>
                </motion.div>

                {/* Rent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaDollarSign className="text-red-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      Monthly Rent
                    </p>
                    <p className="text-lg font-semibold text-gray-900">demo</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
