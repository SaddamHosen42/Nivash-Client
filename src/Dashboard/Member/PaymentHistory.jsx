import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"; //eslint-disable-line
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageTitle from "../../components/shared/PageTitle";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Fetch payment history for the logged-in user
  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments?email=${user?.email}`);
      return response.data;
    },
  });
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const tableRowVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading payment history: {error.message}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-3 sm:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PageTitle title="Payment History" />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8"
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white text-lg sm:text-2xl">📊</span>
              </motion.div>
              <div>
                <motion.h1
                  className="text-xl sm:text-3xl font-bold text-gray-800"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Payment History
                </motion.h1>
                <motion.p
                  className="text-sm sm:text-base text-gray-600"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  View all your rent payment records
                </motion.p>
              </div>
            </div>
            <motion.div
              className="bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              Total Payments: {payments.length}
            </motion.div>
          </div>
        </motion.div>

        {/* Payment Statistics */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6"
            variants={statsVariants}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-blue-600 text-lg sm:text-xl">💰</span>
              </motion.div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Paid</p>
                <motion.p
                  className="text-lg sm:text-2xl font-bold text-gray-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
                >
                  ৳
                  {payments
                    .reduce(
                      (sum, payment) => sum + (payment.finalAmount || 0),
                      0
                    )
                    .toLocaleString()}
                </motion.p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6"
            variants={statsVariants}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-green-600 text-lg sm:text-xl">✅</span>
              </motion.div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Successful Payments
                </p>
                <motion.p
                  className="text-lg sm:text-2xl font-bold text-gray-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.3, type: "spring" }}
                >
                  {
                    payments.filter((payment) => payment.status === "paid")
                      .length
                  }
                </motion.p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1"
            variants={statsVariants}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-purple-600 text-lg sm:text-xl">💸</span>
              </motion.div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Total Savings
                </p>
                <motion.p
                  className="text-lg sm:text-2xl font-bold text-gray-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.3, type: "spring" }}
                >
                  ৳
                  {payments
                    .reduce(
                      (sum, payment) => sum + (payment.discountAmount || 0),
                      0
                    )
                    .toLocaleString()}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Payment Table */}
        <motion.div
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-teal-600"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
              <motion.span
                className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                📋
              </motion.span>
              Payment Records
            </h2>
          </motion.div>

          {payments.length === 0 ? (
            <motion.div
              className="p-8 sm:p-12 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-3xl sm:text-4xl">📄</span>
              </motion.div>
              <motion.h3
                className="text-lg sm:text-xl font-semibold text-gray-700 mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                No Payment History
              </motion.h3>
              <motion.p
                className="text-gray-500 text-sm sm:text-base"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                You haven't made any rent payments yet.
              </motion.p>
            </motion.div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <motion.thead
                    className="bg-green-200"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Payment Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Month/Year
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Apartment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Original Rent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Final Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </motion.thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment, index) => (
                      <motion.tr
                        key={payment._id || index}
                        className="hover:bg-green-100 transition-colors duration-200"
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(
                              payment.createdAt || payment.date
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(
                              payment.createdAt || payment.date
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.month} {payment.year}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.apartmentNo}
                          </div>
                          <div className="text-sm text-gray-500">
                            Floor {payment.floor}, Block {payment.block}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ৳{payment.originalRent?.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment.discountAmount > 0 ? (
                            <div>
                              <div className="text-sm font-medium text-green-600">
                                -৳{payment.discountAmount?.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {payment.discountPercentage}% off
                              </div>
                              {payment.couponCode && (
                                <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full inline-block mt-1">
                                  {payment.couponCode}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              No discount
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-blue-600">
                            ৳{payment.finalAmount?.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs font-mono bg-gray-100 text-gray-800 px-2 py-1 rounded border max-w-32 truncate">
                            {payment.transactionId || payment.paymentIntentId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              payment.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payment.status === "paid" ? "✅ Paid" : "❌ Failed"}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4 p-4">
                {payments.map((payment, index) => (
                  <motion.div
                    key={payment._id || index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    {/* Payment Status Badge */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-700">
                          {payment.month} {payment.year}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status === "paid" ? "✅ Paid" : "❌ Failed"}
                      </span>
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Payment Date:</span>
                        <span className="text-xs font-medium text-gray-900">
                          {new Date(
                            payment.createdAt || payment.date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Apartment:</span>
                        <span className="text-xs font-medium text-gray-900">
                          {payment.apartmentNo} (Floor {payment.floor}, Block {payment.block})
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Original Rent:</span>
                        <span className="text-xs font-medium text-gray-900">
                          ৳{payment.originalRent?.toLocaleString()}
                        </span>
                      </div>

                      {payment.discountAmount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Discount:</span>
                          <div className="text-right">
                            <div className="text-xs font-medium text-green-600">
                              -৳{payment.discountAmount?.toLocaleString()} ({payment.discountPercentage}% off)
                            </div>
                            {payment.couponCode && (
                              <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full inline-block mt-1">
                                {payment.couponCode}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                        <span className="text-sm font-semibold text-gray-700">Final Amount:</span>
                        <span className="text-sm font-bold text-blue-600">
                          ৳{payment.finalAmount?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Transaction ID:</span>
                        <span className="text-xs font-mono bg-gray-200 text-gray-800 px-2 py-0.5 rounded border max-w-32 truncate">
                          {payment.transactionId || payment.paymentIntentId}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Footer Info */}
        {payments.length > 0 && (
          <motion.div
            className="mt-4 sm:mt-8 bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200"
            variants={itemVariants}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start space-x-2 sm:space-x-3">
              <motion.div
                className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white text-xs sm:text-sm">ℹ️</span>
              </motion.div>
              <div>
                <motion.h4
                  className="font-semibold text-gray-800 mb-2 text-sm sm:text-base"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  Payment Information
                </motion.h4>
                <motion.ul
                  className="text-xs sm:text-sm text-gray-600 space-y-1"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <motion.li
                    className="flex items-center"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <span className="text-blue-500 mr-2">•</span>
                    All payments are processed securely through Stripe
                  </motion.li>
                  <motion.li
                    className="flex items-center"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <span className="text-blue-500 mr-2">•</span>
                    Transaction IDs can be used for payment verification
                  </motion.li>
                  <motion.li
                    className="flex items-center"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <span className="text-blue-500 mr-2">•</span>
                    For any payment disputes, contact support with your
                    transaction ID
                  </motion.li>
                  <motion.li
                    className="flex items-center"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <span className="text-blue-500 mr-2">•</span>
                    Payment history is updated in real-time
                  </motion.li>
                </motion.ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentHistory;
