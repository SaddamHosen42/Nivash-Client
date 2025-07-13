import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiSearch,
  HiHome,
  HiOfficeBuilding,
  HiCurrencyDollar,
} from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";

const Apartment = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  

  // search state
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [rentFilter, setRentFilter] = useState({ min: 0, max: Infinity });

  const limit = 6;

  const {
    data = { apartments: [], total: 0 },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["apartments", page, rentFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/apartments?page=${page}&limit=${limit}&min=${rentFilter.min}&max=${rentFilter.max}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleAgreement = async (apt) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please log in",
        text: "You need to be logged in to create an agreement.",
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#6b7280"
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to login with current location state for redirect back
          navigate("/login", { 
            state: { 
              from: location.pathname + location.search, // Include query parameters
              message: "Please login to create an apartment agreement"
            }
          });
        }
      });
      return;
    }

    // Show confirmation dialog before creating agreement
    const confirmResult = await Swal.fire({
      title: 'Confirm Agreement',
      text: `Do you want to create an agreement for Apartment ${apt.apartmentNo}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Create Agreement',
      cancelButtonText: 'Cancel'
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    // Handle agreement logic here
    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floor: apt.floor,
      block: apt.block,
      apartmentNo: apt.apartmentNo,
      rent: apt.rent,
      requestDate: new Date().toISOString(),
      status: "pending", // Default status
   };

    try {
      const res = await axiosSecure.post("/agreements", agreementData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Agreement Created Successfully!",
          text: `Agreement for Apartment ${apt.apartmentNo} has been created successfully!`,
          confirmButtonColor: '#10b981'
        });
      }
    } catch (err) {
      console.error("Agreement creation error:", err);
      Swal.fire({
        icon: "error",
        title: "Agreement Failed",
        text: err.response?.data?.message || "Failed to create agreement. Please try again.",
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const totalPages = Math.ceil(data.total / limit);

  const handleSearch = () => {
    const min = parseInt(minRent) || 0;
    const max = parseInt(maxRent) || Infinity;
    setPage(1); // Reset to page 1 when filtering
    setRentFilter({ min, max });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover luxury apartments with modern amenities and breathtaking
            views
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 backdrop-blur-sm border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative">
              <HiCurrencyDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="number"
                placeholder="Min Rent (৳)"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
                className="input input-bordered pl-10 w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <HiCurrencyDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="number"
                placeholder="Max Rent (৳)"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
                className="input input-bordered pl-10 w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              className="btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={handleSearch}
            >
              <HiSearch className="h-5 w-5 mr-2" />
              Search Apartments
            </button>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="loading loading-spinner loading-lg text-blue-600"></div>
              <p className="text-gray-600 text-lg">
                Loading amazing apartments...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-600 text-lg font-medium">
                {error.message}
              </p>
            </div>
          </motion.div>
        )}

        {/* Apartments Grid */}
        {!isLoading && !isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {data.apartments.map((apt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-blue-200">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={apt.image}
                      alt={`Apartment ${apt.apartmentNo}`}
                      className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {apt.status === "available" ? "Available" : "Occupied"}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ৳{apt.rent.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      Apartment {apt.apartmentNo}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <HiOfficeBuilding className="h-5 w-5 mr-3 text-blue-500" />
                        <span className="font-medium">
                          Floor {apt.floor} • Block {apt.block}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <HiHome className="h-5 w-5 mr-3 text-purple-500" />
                        <span>Modern amenities included</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAgreement(apt)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      Agreement
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && data.apartments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 max-w-md mx-auto">
              <HiHome className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No apartments found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-16"
          >
            <div className="join bg-white rounded-2xl shadow-lg p-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`join-item btn btn-lg ${
                    page === i + 1
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none"
                      : "btn-ghost hover:bg-gray-100"
                  } transition-all duration-300`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Apartment;
