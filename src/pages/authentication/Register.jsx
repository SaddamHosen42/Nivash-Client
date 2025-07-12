import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import Lottie from "lottie-react";
import registerAnimation from "../../lottie-animation/Animation-register.json";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, setUser, updateUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onSubmit = (data) => {
    console.log(data);
    // Handle registration logic here

    createUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        // update userinfo in the database here
        const userInfo = {
          email: data.email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        //update user in firebase
        updateUser({ displayName: data.name, photoURL: profilePic })
          .then(() => {
            setUser({
              ...user,
              displayName: data.name,
              photoURL: profilePic,
            });
            const redirectTo = location.state?.from || "/";
            navigate(redirectTo);
            Swal.fire({
              icon: "success",
              title: "Your account is created.",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
            setErrorMessage(error.message);
            Swal.fire({
              icon: "error",
              title: "Failed to update profile",
              text: error.message,
            });
            setUser(user);
          });
        reset(); // Reset the form after successful registration
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setErrorMessage(error.message);
        // Show an error message to the user
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: error.message,
        });
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setImageUploading(true);
    // console.log(image)

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(imagUploadUrl, formData);

      setProfilePic(res.data.data.url);
      //console.log(res.data.data.url);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Animation & Welcome */}
          <motion.div
            className="hidden lg:block space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Welcome to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}
                  Nivash
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Join thousands of satisfied residents in our modern building
                management system
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Lottie
                animationData={registerAnimation}
                loop={true}
                className="w-full h-80"
              ></Lottie>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-4 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl mb-2">🏠</div>
                <h3 className="font-semibold text-gray-900">Smart Building</h3>
                <p className="text-sm text-gray-600">
                  Modern amenities & facilities
                </p>
              </motion.div>
              <motion.div
                className="bg-white rounded-2xl p-4 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold text-gray-900">Secure Access</h3>
                <p className="text-sm text-gray-600">
                  24/7 security & monitoring
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-blue-100">Join our community today</p>
              </motion.div>
              {/* Form Body */}
              <div className="p-8">
                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-center flex items-center justify-center gap-2">
                      <span>⚠️</span>
                      {errorMessage}
                    </p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  {/* Profile Photo Upload */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700">
                      Profile Photo
                    </label>
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        {imageUploading ? (
                          <div className="w-24 h-24 rounded-full border-4 border-blue-200 flex items-center justify-center bg-blue-50">
                            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : profilePic ? (
                          <motion.div
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
                              <img
                                src={profilePic}
                                alt="Profile Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs">Change</span>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            className="w-24 h-24 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:border-blue-400 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-center">
                              <svg
                                className="w-8 h-8 text-gray-400 mx-auto mb-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                              <span className="text-xs text-gray-500">
                                Upload
                              </span>
                            </div>
                          </motion.div>
                        )}

                        <input
                          type="file"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                          disabled={imageUploading}
                        />
                      </div>
                    </div>

                    {imageUploading && (
                      <motion.p
                        className="text-sm text-blue-600 text-center flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>📤</span> Uploading image...
                      </motion.p>
                    )}
                    {profilePic && !imageUploading && (
                      <motion.p
                        className="text-sm text-green-600 text-center flex items-center justify-center gap-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>✓</span> Photo uploaded successfully!
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Name Field */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors pl-12"
                        {...register("name", { required: true })}
                        placeholder="Enter your full name"
                        required
                      />
                      <span className="absolute left-4 top-3.5 text-gray-400">
                        👤
                      </span>
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors pl-12"
                        {...register("email", { required: true })}
                        placeholder="Enter your email"
                        required
                      />
                      <span className="absolute left-4 top-3.5 text-gray-400">
                        📧
                      </span>
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors pl-12 pr-12"
                        {...register("password", {
                          required: true,
                          minLength: 6,
                        })}
                        placeholder="Create a password"
                        required
                      />
                      <span className="absolute left-4 top-3.5 text-gray-400">
                        🔒
                      </span>
                      <button
                        type="button"
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        className="text-red-500 text-sm flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>⚠️</span>
                        Password must be at least 6 characters long
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Register Button */}
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Account
                  </motion.button>

                  {/* Login Link */}
                  <motion.div
                    className="text-center pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:text-blue-700"
                      >
                        Sign In
                      </Link>
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    className="relative my-6"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-6 bg-white text-gray-500 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </motion.div>

                  {/* Social Login */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  >
                    <SocialLogin />
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
