import React from "react";
import useAuth from "../hooks/useAuth";
import { FaBars, FaSignOutAlt, FaUser } from "react-icons/fa";
import NivashLogo from "../components/shared/NivashLogo";
import { NavLink, Outlet } from "react-router";
import { IoHomeSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TfiAnnouncement } from "react-icons/tfi";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();

  const navLinks = (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                    }
                  `}
        >
          <IoHomeSharp className="text-xl relative z-10" />
          <span className="font-semibold relative z-10">Dashboard Home</span>
        </NavLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <NavLink
          to="/dashboard/myProfile"
          className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                    }
                  `}
        >
          <CgProfile className="text-xl relative z-10" />
          <span className="font-semibold relative z-10">My Profile</span>
        </NavLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <NavLink
          to="/dashboard/announcements"
          className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                    }
                  `}
        >
          <TfiAnnouncement className="text-xl relative z-10" />
          <span className="font-semibold relative z-10">Announcements</span>
        </NavLink>
      </motion.div>
    </>
  );

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong during logout.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Modern Mobile Navbar */}
        <div className="navbar bg-white shadow-lg lg:hidden border-b">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-ghost btn-circle hover:bg-blue-50"
            >
              <FaBars className="h-5 w-5 text-gray-600" />
            </label>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h2>
          </div>
          <div className="flex-none flex items-center space-x-3">
            {/* User Profile in Mobile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                {user?.photoURL || user?.photo ? (
                  <img
                    src={user?.photoURL || user?.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.querySelector(
                        ".mobile-fallback-icon"
                      ).style.display = "block";
                    }}
                  />
                ) : null}
                <FaUser
                  className={`mobile-fallback-icon text-white text-sm ${
                    user?.photoURL || user?.photo ? "hidden" : "block"
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.displayName ||
                  user?.name ||
                  user?.email?.split("@")[0] ||
                  "User"}
              </span>
            </div>
            <button
              onClick={handleLogOut}
              className="btn btn-ghost btn-circle text-red-500 hover:bg-red-50 hover:scale-110 transition-all duration-300"
            >
              <FaSignOutAlt className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page content with better background */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Beautiful Modern Sidebar */}
        <div className="bg-white min-h-full w-80 shadow-2xl">
          {/* Sidebar Header */}
          <div className="p-6 bg-gradient-to-br from-slate-800 via-gray-900 to-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>
            
            {/* Floating elements for more beauty */}
            <div className="absolute top-8 right-12 w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
            <div className="absolute top-16 left-8 w-1 h-1 bg-purple-400/60 rounded-full animate-ping delay-1000"></div>
            <div className="absolute bottom-12 right-6 w-3 h-3 bg-cyan-400/40 rotate-45 animate-bounce delay-500"></div>

            <div className="relative z-10">
              <div className="mb-6">
                <NivashLogo />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-2 border-blue-400/30 shadow-xl backdrop-blur-sm ring-2 ring-purple-500/20 ring-offset-2 ring-offset-transparent">
                  {user?.photoURL || user?.photo ? (
                    <img
                      src={user?.photoURL || user?.photo}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.querySelector(
                          ".fallback-icon"
                        ).style.display = "block";
                      }}
                    />
                  ) : null}
                  <FaUser
                    className={`fallback-icon text-white text-2xl ${
                      user?.photoURL || user?.photo ? "hidden" : "block"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">
                  {user?.displayName ||
                    user?.name ||
                    user?.email?.split("@")[0] ||
                    "User"}
                </h3>
                <p className="text-blue-200 text-sm opacity-90 drop-shadow-sm">
                  Welcome to your dashboard!
                </p>
              </motion.div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-6">
            <nav className="space-y-3">{navLinks}</nav>

            {/* Logout Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
              <button
                onClick={handleLogOut}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 group"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
