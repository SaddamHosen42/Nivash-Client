import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import PageTitle from "../components/shared/PageTitle";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaDoorOpen,
  FaDollarSign,
  FaHourglassHalf,
  FaEdit,
  FaTimes,
  FaUpload,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useUserRole from "../hooks/useUserRole";
import Swal from "sweetalert2";
import axios from "axios";

const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isUser } = useUserRole();
  
  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "", // Still need to track for updates
  });

  // Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Prepare update data
      const updateData = {};
      if (formData.displayName !== user?.displayName) {
        updateData.displayName = formData.displayName;
      }
      if (formData.photoURL !== user?.photoURL) {
        updateData.photoURL = formData.photoURL;
      }

      // Update profile using Firebase updateProfile
      await updateUser(updateData);
      
      setIsEditModalOpen(false);
      
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Small delay to ensure Firebase auth state is updated
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile. Please try again.",
        icon: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal and reset form data
  const openEditModal = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditModalOpen(true);
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setImageUploading(true);

    const formDataImage = new FormData();
    formDataImage.append("image", image);

    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(imageUploadUrl, formDataImage);

      setFormData(prev => ({
        ...prev,
        photoURL: res.data.data.url
      }));
      
      Swal.fire({
        title: "Success!",
        text: "Image uploaded successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire({
        icon: "error",
        title: "Image upload failed",
        text: "Please try again with a different image.",
      });
    } finally {
      setImageUploading(false);
    }
  };


  // Fetch user's agreements
  const { data: agreements = [], isLoading } = useQuery({
    queryKey: ["agreements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Get user's agreement (since user can have only one agreement)
  const userAgreement = agreements[0];

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
      <PageTitle title="My Profile" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold  text-purple-600  mb-2">
            My Profile
          </h1>
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
                  onClick={openEditModal}
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
              {userAgreement ? (
                <>
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
                    {/* Agreement Request Date */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-blue-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Agreement Request Date
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {isUser ? 'None' : new Date(userAgreement?.requestDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </motion.div>

                    {/* Agreement Accept Date */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-green-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Agreement Accept Date
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {isUser ? 'None' : userAgreement?.acceptDate ? 
                            new Date(userAgreement.acceptDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 
                            userAgreement?.status === 'pending' ? 'Pending approval' : 'Not available'
                          }
                        </p>
                      </div>
                    </motion.div>

                    {/* Floor */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FaBuilding className="text-indigo-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Floor
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {isUser ? 'None' : `${userAgreement?.floor}th Floor`}
                        </p>
                      </div>
                    </motion.div>

                    {/* Block */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <HiLocationMarker className="text-cyan-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Block
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {isUser ? 'None' : `Block ${userAgreement?.block}`}
                        </p>
                      </div>
                    </motion.div>

                    {/* Apartment Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaDoorOpen className="text-orange-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Apartment No
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {isUser ? 'None' : userAgreement?.apartmentNo}
                        </p>
                      </div>
                    </motion.div>

                    {/* Rent */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FaDollarSign className="text-red-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Monthly Rent
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {isUser ? 'None' : `৳${userAgreement?.rent?.toLocaleString()}`}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </>
              ) : (
                /* No Agreement - Beautiful Empty State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mb-8"
                  >
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaBuilding className="w-16 h-16 text-emerald-500" />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">
                      No Apartment Agreement Yet
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto mb-8">
                      You haven't created any apartment agreement yet. Browse
                      available apartments and create an agreement to get
                      started.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="space-y-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Browse Apartments
                    </motion.button>
                    <p className="text-sm text-gray-400">
                      Create your first apartment agreement today
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <p className="text-blue-100 mt-2">Update your personal information</p>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateProfile} className="p-4 sm:p-6 space-y-6">
              {/* Profile Photo Preview */}
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-gray-200 shadow-lg mb-4">
                  {imageUploading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-1"></div>
                      <span className="text-xs text-white">Uploading...</span>
                    </div>
                  ) : (
                    <img
                      alt="Profile Preview"
                      src={formData.photoURL || user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500">Profile Picture Preview</p>
              </div>

              {/* Display Name Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <FaUser className="mr-2 text-blue-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Photo Upload Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <FaUpload className="mr-2 text-blue-600" />
                  Profile Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {imageUploading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Choose an image file from your device (JPG, PNG, GIF supported)
                </p>
              </div>

              {/* Email (Read-only) */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  placeholder="Email cannot be changed"
                  readOnly
                />
                <p className="text-xs text-gray-500">
                  Email address cannot be modified
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isUpdating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <FaEdit className="text-sm" />
                      <span>Update Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
