import React, { useState } from "react";
import { RiCoupon3Fill } from "react-icons/ri";
import {
  FaPlus,
  FaTrash,
  FaPercentage,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageCoupons = () => {
  const [showModal, setShowModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch coupons from database
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await axiosSecure.get("/coupons");
      return response.data;
    },
  });

  // Add coupon mutation
  const addCouponMutation = useMutation({
    mutationFn: async (couponData) => {
      const response = await axiosSecure.post("/coupons", couponData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setShowModal(false);
      resetForm();
      Swal.fire({
        title: "Success!",
        text: "Coupon has been created successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to create coupon",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    },
  });

  // Update coupon availability mutation
  const toggleAvailabilityMutation = useMutation({
    mutationFn: async ({ id, isAvailable }) => {
      const response = await axiosSecure.patch(`/coupons/${id}/availability`, {
        isAvailable,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      Swal.fire({
        title: "Success!",
        text: "Coupon availability updated successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to update coupon availability",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    },
  });

  // Delete coupon mutation
  const deleteCouponMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/coupons/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      Swal.fire({
        title: "Deleted!",
        text: "Coupon has been deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete coupon",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    },
  });

  const resetForm = () => {
    setCouponCode("");
    setDiscount("");
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!couponCode || !discount || !description) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (discount < 1 || discount > 100) {
      Swal.fire({
        title: "Error!",
        text: "Discount percentage must be between 1 and 100",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const couponData = {
      code: couponCode.toUpperCase(),
      discount: parseInt(discount),
      description,
      isAvailable: true,
    };

    addCouponMutation.mutate(couponData);
  };

  const handleToggleAvailability = (coupon) => {
    toggleAvailabilityMutation.mutate({
      id: coupon._id,
      isAvailable: !coupon.isAvailable,
    });
  };

  const handleDeleteCoupon = (couponId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCouponMutation.mutate(couponId);
      }
    });
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
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaPlus className="text-sm" />
              <span>Add New Coupon</span>
            </button>
          </div>
        </div>

        {/* Add Coupon Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Create New Coupon
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="couponCode"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    id="couponCode"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., SAVE20"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                      required
                    />
                    <FaPercentage className="absolute right-4 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Describe when and how this coupon can be used..."
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addCouponMutation.isPending}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <RiCoupon3Fill className="text-sm" />
                    <span>
                      {addCouponMutation.isPending
                        ? "Creating..."
                        : "Create Coupon"}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Coupons Table */}
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">All Coupons</h2>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : coupons.length === 0 ? (
              <div className="text-center py-12">
                <RiCoupon3Fill className="mx-auto text-gray-400 text-6xl mb-4" />
                <p className="text-gray-500 text-lg">No coupons found</p>
                <p className="text-gray-400">
                  Click the "Add New Coupon" button to create your first coupon
                </p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coupon Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coupons.map((coupon) => (
                    <tr key={coupon._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                            <RiCoupon3Fill className="text-white text-lg" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {coupon.code}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaPercentage className="text-purple-500 mr-1" />
                          <span className="text-lg font-bold text-purple-600">
                            {coupon.discount}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {coupon.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            coupon.isAvailable
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {coupon.isAvailable ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(coupon.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleToggleAvailability(coupon)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              coupon.isAvailable
                                ? "text-red-600 hover:text-red-900 hover:bg-red-50"
                                : "text-green-600 hover:text-green-900 hover:bg-green-50"
                            }`}
                            title={
                              coupon.isAvailable
                                ? "Disable coupon"
                                : "Enable coupon"
                            }
                          >
                            {coupon.isAvailable ? (
                              <FaToggleOn className="text-xl" />
                            ) : (
                              <FaToggleOff className="text-xl" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteCoupon(coupon._id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                            title="Delete coupon"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageCoupons;
