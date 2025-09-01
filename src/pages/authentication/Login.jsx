import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion"; //eslint-disable-line
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import loginAnimation from "../../lottie-animation/Animation-login.json";
import Lottie from "lottie-react";
import SocialLogin from "./SocialLogin";
import PageTitle from "../../components/shared/PageTitle";
import NivashLogo from "../../components/shared/NivashLogo";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);

  // Demo credentials data
  const credentials = {
    admin: {
      email: "admin@gmail.com",
      password: "Admin12",
      role: "Admin",
      icon: "👨‍💼",
      color: "red",
    },
    member: {
      email: "member@gmail.com",
      password: "Member12",
      role: "Member",
      icon: "👤",
      color: "green",
    },
    user: {
      email: "hosen1433@gmail.com",
      password: "Password",
      role: "User",
      icon: "🏠",
      color: "blue",
    },
  };

  // Auto-fill credentials function
  const handleCredentialSelect = (credentialType) => {
    const credential = credentials[credentialType];
    if (credential) {
      // Clear any existing validation errors
      clearErrors(["email", "password"]);

      // Use React Hook Form's setValue to properly set values and trigger validation
      setValue("email", credential.email, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("password", credential.password, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      setSelectedCredential(credentialType);
    }
  };

  const onSubmit = (data) => {
    // Handle login logic here
    logIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // Check if there's a redirect location from state
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
        //console.log(user);
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: `Welcome, ${user.displayName}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset(); // Reset the form after successful login
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " Invalid email or password!",
        });
      });
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4">
      <PageTitle title="Login" />
      <NivashLogo className="mb-10" />
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
                Welcome Back to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  {" "}
                  Nivash
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Sign in to access your building management dashboard and
                continue your journey with us
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Lottie
                animationData={loginAnimation}
                loop={true}
                className="w-full h-80"
              ></Lottie>
            </motion.div>

            {/* Quick Access Features */}
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
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900">Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Monitor your apartment status
                </p>
              </motion.div>
              <motion.div
                className="bg-white rounded-2xl p-4 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl mb-2">💳</div>
                <h3 className="font-semibold text-gray-900">Quick Pay</h3>
                <p className="text-sm text-gray-600">Easy rent payments</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <motion.div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-indigo-100">Sign in to your account</p>
              </motion.div>
              {/* Form Body */}
              <div className="p-8">
                {errorMessage && (
                  <motion.div
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-red-600 text-center flex items-center justify-center gap-2">
                      <span>⚠️</span>
                      {errorMessage}
                    </p>
                  </motion.div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  {/* Demo Credentials Toggle */}
                  <motion.div
                    className="space-y-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Demo Credentials
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        Click any button to auto-fill credentials
                      </p>
                    </div>

                    {/* Credential Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {/* Admin Button */}
                      <motion.button
                        type="button"
                        onClick={() => handleCredentialSelect("admin")}
                        className={`
                          relative p-3 rounded-xl border-2 transition-all duration-300 text-center
                          ${
                            selectedCredential === "admin"
                              ? "border-red-500 bg-red-50 shadow-lg scale-105"
                              : "border-red-200 bg-red-25 hover:border-red-300 hover:bg-red-50"
                          }
                        `}
                        whileHover={{
                          scale: selectedCredential === "admin" ? 1.05 : 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-lg mb-1">👨‍💼</div>
                        <div className="text-xs font-bold text-red-700">
                          Admin
                        </div>
                        <div className="text-xs text-red-600 mt-1">
                          Full Access
                        </div>
                        {selectedCredential === "admin" && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </motion.button>

                      {/* Member Button */}
                      <motion.button
                        type="button"
                        onClick={() => handleCredentialSelect("member")}
                        className={`
                          relative p-3 rounded-xl border-2 transition-all duration-300 text-center
                          ${
                            selectedCredential === "member"
                              ? "border-green-500 bg-green-50 shadow-lg scale-105"
                              : "border-green-200 bg-green-25 hover:border-green-300 hover:bg-green-50"
                          }
                        `}
                        whileHover={{
                          scale: selectedCredential === "member" ? 1.05 : 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-lg mb-1">👤</div>
                        <div className="text-xs font-bold text-green-700">
                          Member
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          Tenant Access
                        </div>
                        {selectedCredential === "member" && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </motion.button>

                      {/* User Button */}
                      <motion.button
                        type="button"
                        onClick={() => handleCredentialSelect("user")}
                        className={`
                          relative p-3 rounded-xl border-2 transition-all duration-300 text-center
                          ${
                            selectedCredential === "user"
                              ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                              : "border-blue-200 bg-blue-25 hover:border-blue-300 hover:bg-blue-50"
                          }
                        `}
                        whileHover={{
                          scale: selectedCredential === "user" ? 1.05 : 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-lg mb-1">🏠</div>
                        <div className="text-xs font-bold text-blue-700">
                          User
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          Basic Access
                        </div>
                        {selectedCredential === "user" && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors pl-12"
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
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors pl-12 pr-12"
                        {...register("password", {
                          required: true,
                          minLength: 6,
                        })}
                        placeholder="Enter your password"
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

                  {/* Forgot Password */}
                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <Link className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                      Forgot your password?
                    </Link>
                  </motion.div>

                  {/* Login Button */}
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>

                  {/* Register Link */}
                  <motion.div
                    className="text-center pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-indigo-600 font-semibold hover:text-indigo-700"
                      >
                        Create Account
                      </Link>
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    className="relative my-6"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
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
                    transition={{ duration: 0.5, delay: 1.3 }}
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

export default Login;
