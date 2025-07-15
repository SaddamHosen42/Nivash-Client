import React from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaClipboardList,
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCreditCard,
  FaHistory,
  FaReceipt,
  FaDoorOpen,
} from "react-icons/fa";
import { MdAnnouncement, MdPayment } from "react-icons/md";
import { motion } from "framer-motion"; // eslint-disable-line
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CouponsCard from "../../components/CouponsCard";
import AnnouncementCard from "../../components/AnnouncementCard";

const MemberHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch member's agreement details
  const { data: agreement = null } = useQuery({
    queryKey: ["memberAgreement", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/agreements?email=${user?.email}`
      );
      return (
        response.data.find((agreement) => agreement.status === "checked") ||
        null
      );
    },
    enabled: !!user?.email,
  });

  // Fetch payment history
  const { data: recentPayments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["recentPayments", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments?email=${user?.email}`);
      return response.data.slice(0, 3); // Limit to 3 recent payments
    },
    enabled: !!user?.email,
  });


  // Quick actions for members
  const quickActions = [
    {
      title: "Make Payment",
      description: "Pay your monthly rent",
      icon: MdPayment,
      color: "from-green-500 to-green-600",
      link: "/dashboard/payment",
      urgent: true,
    },
    {
      title: "Payment History",
      description: "View your payment records",
      icon: FaHistory,
      color: "from-blue-500 to-blue-600",
      link: "/dashboard/paymentHistory",
      urgent: false,
    },
    {
      title: "My Profile",
      description: "View and edit your profile",
      icon: FaUser,
      color: "from-purple-500 to-purple-600",
      link: "/dashboard/myProfile",
      urgent: false,
    },
    {
      title: "Announcements",
      description: "Check important updates",
      icon: MdAnnouncement,
      color: "from-orange-500 to-orange-600",
      link: "/dashboard/announcements",
      urgent: false,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
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
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="Member Profile"
                    className="w-full h-full rounded-full object-cover bg-white"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
                    style={{ display: "none" }}
                  >
                    {user?.displayName?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "M"}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome, {user?.displayName?.split(" ")[0] || "Member"}!
                </h1>
                <p className="text-gray-600 mt-1">Building Member Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <FaCalendarAlt />
                <span>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Apartment Info Card */}
        {agreement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaBuilding className="mr-3 text-blue-600" />
                Your Apartment
              </h2>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Active Tenant
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <FaDoorOpen className="text-blue-600 text-2xl mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Apartment No</p>
                <p className="text-xl font-bold text-gray-900">
                  {agreement.apartmentNo}
                </p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <FaMapMarkerAlt className="text-purple-600 text-2xl mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Floor & Block</p>
                <p className="text-xl font-bold text-gray-900">
                  Floor {agreement.floor}, Block {agreement.block}
                </p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-xl">
                <FaDollarSign className="text-green-600 text-2xl mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Monthly Rent</p>
                <p className="text-xl font-bold text-gray-900">
                  ৳{agreement.rent?.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        )}

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
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <Link to={action.link}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 group-hover:border-blue-200 relative">
                    {action.urgent && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
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
            <AnnouncementCard />
          </motion.div>

          {/* Payment Summary */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaCreditCard className="mr-3 text-green-600" />
                Payment Summary
              </h3>
              <Link
                to="/dashboard/paymentHistory"
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                View History
              </Link>
            </div>

            {paymentsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : recentPayments.length > 0 ? (
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <motion.div
                    key={payment._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FaReceipt className="text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          ৳{payment.finalAmount?.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {payment.month} {payment.year}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600 font-semibold">
                        Paid
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-center py-8 text-gray-500">
                  <FaCreditCard className="mx-auto text-4xl mb-4 opacity-50" />
                  <p>No payment history</p>
                  <Link
                    to="/dashboard/payment"
                    className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Make Payment
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          {/* Available Coupons */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <CouponsCard />
          </motion.div>

          {/* Monthly Summary */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaCalendarAlt className="mr-3 text-purple-600" />
                This Month
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Monthly Rent</span>
                <span className="font-semibold text-gray-900">
                  ৳{agreement?.rent?.toLocaleString() || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Apartment</span>
                <span className="font-semibold text-blue-600">
                  {agreement?.apartmentNo || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Status</span>
                <span className="font-semibold text-green-600">
                  Active Member
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MemberHome;
