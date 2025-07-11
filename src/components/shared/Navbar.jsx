import React from "react";
import NivashLogo from "./NivashLogo";
import { NavLink } from "react-router";

const Navbar = () => {
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isActive
              ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }`
        }
      >
        Home
      </NavLink>
    </>
  );

  // Mobile nav links with icons and styling
  const mobileNavLinks = <></>;
  //console.log("user in navbar", user);

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-sm mx-auto">
          <div className="navbar-start">
            {/* Mobile hamburger menu */}
            <label
              htmlFor="mobile-drawer"
              className="btn btn-ghost lg:hidden drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <div className="">
              <NivashLogo />
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <div className="flex items-center space-x-2">{navLinks}</div>
          </div>
          <div className="navbar-end">
            <button className="btn">login</button>
          </div>
        </div>
      </div>

      {/* Drawer sidebar for mobile */}
      <div className="drawer-side z-50">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <div className="min-h-full w-80 bg-white p-4">
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-8">
            <NivashLogo />
            <label htmlFor="mobile-drawer" className="btn btn-circle btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>

          {/* Navigation links */}
          <ul className="menu space-y-2">{mobileNavLinks}</ul>

          {/* User section in drawer */}
       
        </div>
      </div>
    </div>
  );
};

export default Navbar;
