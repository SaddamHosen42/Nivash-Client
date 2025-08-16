import React, { useState, useEffect } from "react";
import NivashLogo from "./NivashLogo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  HiHome,
  HiOfficeBuilding,
  HiLogout,
  HiMenu,
  HiX,
  HiUser,
  HiInformationCircle,
} from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to close mobile drawer
  const closeMobileDrawer = () => {
    const drawerToggle = document.getElementById('mobile-drawer');
    if (drawerToggle) {
      drawerToggle.checked = false;
    }
  };
console.log(user);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Navigation links for desktop view
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full font-medium transition-all duration-300 relative ${
            isActive
              ? isScrolled
                ? "text-white bg-blue-600 shadow-lg"
                : "text-slate-900 bg-white shadow-lg"
              : isScrolled
              ? "text-gray-300 hover:text-white hover:bg-white/10"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/apartment"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full font-medium transition-all duration-300 relative ${
            isActive
              ? isScrolled
                ? "text-white bg-blue-600 shadow-lg"
                : "text-slate-900 bg-white shadow-lg"
              : isScrolled
              ? "text-gray-300 hover:text-white hover:bg-white/10"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`
        }
      >
        Apartments
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full font-medium transition-all duration-300 relative ${
            isActive
              ? isScrolled
                ? "text-white bg-blue-600 shadow-lg"
                : "text-slate-900 bg-white shadow-lg"
              : isScrolled
              ? "text-gray-300 hover:text-white hover:bg-white/10"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`
        }
      >
        About
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-full font-medium transition-all duration-300 relative ${
              isActive
                ? isScrolled
                  ? "text-white bg-blue-600 shadow-lg"
                  : "text-slate-900 bg-white shadow-lg"
                : isScrolled
                ? "text-gray-300 hover:text-white hover:bg-white/10"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  // Mobile nav links with icons and styling
  const mobileNavLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 mb-2 ${
              isActive
                ? "text-slate-900 bg-white shadow-lg"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`
          }
          onClick={closeMobileDrawer}
        >
          <HiHome className="h-5 w-5 mr-3" />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartment"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 mb-2 ${
              isActive
                ? "text-slate-900 bg-white shadow-lg"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`
          }
          onClick={closeMobileDrawer}
        >
          <HiOfficeBuilding className="h-5 w-5 mr-3" />
          Apartments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 mb-2 ${
              isActive
                ? "text-slate-900 bg-white shadow-lg"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`
          }
          onClick={closeMobileDrawer}
        >
          <HiInformationCircle className="h-5 w-5 mr-3" />
          About
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 mb-2 ${
                  isActive
                    ? "text-slate-900 bg-white shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`
              }
              onClick={closeMobileDrawer}
            >
              <MdDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                closeMobileDrawer();
                handleLogOut();
              }}
              className="w-full flex items-center px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 mb-2"
            >
              <HiLogout className="h-5 w-5 mr-3" />
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );
  //console.log("user in navbar", user);
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
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div
          className={`navbar transition-all duration-500 ${
            isScrolled
              ? "fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg shadow-2xl border-b border-slate-700/50"
              : "absolute top-4 left-0 right-0"
          } z-40`}
        >
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
            {/* Centered pill-shaped container */}
            <div className="w-full flex items-center justify-center">
              <div
                className={`flex items-center justify-between w-full transition-all duration-500 ${
                  isScrolled
                    ? "max-w-7xl px-6"
                    : "max-w-4xl bg-white/5 backdrop-blur-lg rounded-full px-8 p-2 border border-white/10 shadow-2xl"
                }`}
              >
                {/* Logo Section */}
                <div className="flex items-center">
                  <label
                    htmlFor="mobile-drawer"
                    className={`btn btn-ghost lg:hidden drawer-button mr-2 border-0 transition-all duration-300 min-h-[2.5rem] h-10 w-10 p-0 ${
                      isScrolled
                        ? "text-white hover:bg-white/10"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <HiMenu className="h-6 w-6" />
                  </label>
                  <div className="hidden md:flex text-white font-bold text-xl">
                    <NivashLogo />
                  </div>
                </div>

                {/* Center Navigation Links */}
                <div className="hidden lg:flex items-center space-x-2">
                  {navLinks}
                </div>

                {/* Right Section */}
                <div className="flex items-center">
                  {user ? (
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar hover:scale-110 transition-all duration-300"
                      >
                        <div className="w-9 h-9 rounded-full border-2 border-white/30 shadow-lg overflow-hidden hover:border-white/60">
                          <img
                            alt="Profile"
                            src={
                              user.photoURL ||
                              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-slate-900/95 backdrop-blur-xl rounded-2xl z-[1] mt-3 w-72 p-0 shadow-2xl border border-white/20 overflow-hidden"
                      >
                        {/* User Info Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                          <div className="flex items-center space-x-3">
                            <div className="w-14 h-14 rounded-full border-3 border-white shadow-lg overflow-hidden">
                              <img
                                alt="Profile"
                                src={
                                  user.photoURL ||
                                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-white truncate">
                                {user.displayName || "User"}
                              </h3>
                              <p className="text-sm text-blue-100 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <li>
                            <NavLink
                              to="/dashboard"
                              className="flex items-center px-4 py-3 text-sm text-white hover:bg-white/10 hover:text-blue-400 rounded-xl transition-all duration-200 m-1"
                            >
                              <MdDashboard className="w-5 h-5 mr-3 text-blue-400" />
                              <span className="font-medium">Dashboard</span>
                            </NavLink>
                          </li>
                          <li>
                            <button
                              onClick={handleLogOut}
                              className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-200 m-1"
                            >
                              <HiLogout className="w-5 h-5 mr-3 text-red-400" />
                              <span className="font-medium">Logout</span>
                            </button>
                          </li>
                        </div>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        isScrolled
                          ? "text-slate-900 bg-white hover:bg-gray-100"
                          : "text-slate-900 bg-white hover:bg-gray-100"
                      }`}
                    >
                      login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer sidebar for mobile */}
      <div className="drawer-side z-50">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <div className="min-h-full w-80 sm:w-80 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl">
          {/* Drawer header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10">
            <div className="text-white">
              <NivashLogo />
            </div>
            <label
              htmlFor="mobile-drawer"
              className="btn btn-circle btn-ghost text-white hover:bg-white/10 border-0 min-h-[2.5rem] h-10 w-10 p-0"
            >
              <HiX className="h-6 w-6" />
            </label>
          </div>

          {/* Navigation links */}
          <div className="p-4">
            <ul className="menu space-y-2">{mobileNavLinks}</ul>
          </div>

          {/* User section in drawer */}
          {user ? (
            <div className="mt-8 mx-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-14 h-14 rounded-full border-2 border-white/20 shadow-md"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                    <HiUser className="h-8 w-8 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-white text-lg">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-white/60">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-4 mt-8">
              <NavLink
                to="/login"
                className="flex items-center justify-center w-full px-6 py-4 text-slate-900 font-semibold bg-white rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={closeMobileDrawer}
              >
                <HiUser className="h-5 w-5 mr-2" />
                Early Access
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
