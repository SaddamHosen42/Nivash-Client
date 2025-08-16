import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./Payment";

const PaymentForm = ({ agreement }) => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [month, setMonth] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [finalRent, setFinalRent] = useState(agreement.rent);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      Swal.fire("Warning", "Please enter a coupon code", "warning");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosSecure.get(`/coupons/validate/${couponCode}`);

      if (res.data.valid && res.data.coupon) {
        const coupon = res.data.coupon;
        const discountAmount = (agreement.rent * coupon.discount) / 100;
        setFinalRent(agreement.rent - discountAmount);
        setAppliedCoupon(coupon);
        Swal.fire(
          "Coupon Applied",
          `You got ${coupon.discount}% off!`,
          "success"
        );
      } else {
        Swal.fire(
          "Invalid Coupon",
          res.data.message || "Coupon is not valid",
          "error"
        );
      }
    } catch (err) {
      console.error("Coupon validation error:", err);
      Swal.fire(
        "Invalid Coupon",
        err.response?.data?.message || "Try another one",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setFinalRent(agreement.rent);
    Swal.fire("Coupon Removed", "Coupon has been removed", "info");
  };

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <span className="text-white text-lg sm:text-2xl">💳</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
                  Rent Payment
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Complete your monthly rent payment securely
                </p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-auto">
              Secure Payment Portal
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column - Agreement Information and Payment */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Agreement Information Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center">
                  <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                    🏠
                  </span>
                  Agreement Information
                </h2>
                <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-auto">
                  Active Agreement
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Member Email
                  </label>
                  <div className="relative">
                    <input
                      value={user.email}
                      readOnly
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed text-gray-600 focus:outline-none text-sm sm:text-base"
                    />
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3">
                      <span className="text-gray-400 text-sm sm:text-base">📧</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Floor
                  </label>
                  <div className="relative">
                    <input
                      value={agreement.floor}
                      readOnly
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed text-gray-600 focus:outline-none text-sm sm:text-base"
                    />
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3">
                      <span className="text-gray-400 text-sm sm:text-base">🏢</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Block Name
                  </label>
                  <div className="relative">
                    <input
                      value={agreement.block}
                      readOnly
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed text-gray-600 focus:outline-none text-sm sm:text-base"
                    />
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3">
                      <span className="text-gray-400 text-sm sm:text-base">🏗️</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Apartment No/Room No
                  </label>
                  <div className="relative">
                    <input
                      value={agreement.apartmentNo}
                      readOnly
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed text-gray-600 focus:outline-none text-sm sm:text-base"
                    />
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3">
                      <span className="text-gray-400 text-sm sm:text-base">🏠</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Monthly Rent
                  </label>
                  <div className="relative">
                    <input
                      value={`৳${agreement.rent.toLocaleString()}`}
                      readOnly
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-green-50 border border-green-200 rounded-lg cursor-not-allowed font-bold text-base sm:text-lg text-green-700 focus:outline-none"
                    />
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3">
                      <span className="text-green-500 text-sm sm:text-base">💰</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Select Month *
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none cursor-pointer text-sm sm:text-base"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Choose the month to pay for
                      </option>
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((m, index) => (
                        <option key={m} value={m}>
                          {m} {new Date().getFullYear()}{" "}
                          {index <= new Date().getMonth()
                            ? "(Current Year)"
                            : "(Next Year)"}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3 pointer-events-none">
                      <span className="text-gray-400 text-sm sm:text-base">📅</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Action Section */}
            {month ? (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center">
                    <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                      💳
                    </span>
                    Complete Payment
                  </h3>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-gray-700 text-center text-sm sm:text-base">
                    You are about to pay <br />
                    <span className="text-lg sm:text-xl font-bold text-blue-600">
                      ৳{finalRent.toLocaleString()}
                    </span>{" "}
                    <br />
                    for{" "}
                    <span className="font-semibold">
                      {month} {new Date().getFullYear()}
                    </span>
                  </p>
                </div>

                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    agreement={agreement}
                    finalRent={finalRent}
                    couponCode={appliedCoupon?.code || null}
                    month={month}
                    appliedCoupon={appliedCoupon}
                  />
                </Elements>
              </div>
            ) : (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl">📅</span>
                </div>
                <p className="text-gray-500 text-base sm:text-lg mb-2">
                  Please select a month first
                </p>
                <p className="text-gray-400 text-sm sm:text-base">
                  Choose which month's rent you want to pay
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Coupon Application & Payment Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            {/* Coupon Application Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center">
                  <span className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                    🎫
                  </span>
                  Apply Coupon Code
                </h3>
                <div className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-auto">
                  Optional
                </div>
              </div>

              {!appliedCoupon ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg border-2 border-dashed border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 placeholder-gray-400"
                    />
                    <div className="absolute right-3 sm:right-4 top-2.5 sm:top-3">
                      <span className="text-gray-400 text-lg sm:text-xl">🏷️</span>
                    </div>
                  </div>

                  <button
                    onClick={handleApplyCoupon}
                    disabled={loading || !couponCode.trim()}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Checking...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Apply Coupon</span>
                        <span className="text-base sm:text-lg">✨</span>
                      </div>
                    )}
                  </button>

                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <span className="mr-2">💡</span>
                      Enter code for discount!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm sm:text-lg">✓</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-green-800 text-sm sm:text-base truncate">
                          {appliedCoupon.code}
                        </p>
                        <p className="text-green-700 text-xs sm:text-sm">
                          {appliedCoupon.discount}% off applied!
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-lg transition-colors duration-200 text-xs sm:text-sm flex-shrink-0 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-8 sticky top-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center">
                  <span className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                    📊
                  </span>
                  Payment Summary
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    Original Rent:
                  </span>
                  <span className="font-bold text-base sm:text-lg">
                    ৳{agreement.rent.toLocaleString()}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 bg-green-50 px-2 sm:px-3 rounded-lg">
                    <span className="text-green-700 font-medium text-sm sm:text-base">
                      Discount ({appliedCoupon.discount}%):
                    </span>
                    <span className="font-bold text-base sm:text-lg text-green-600">
                      -৳{(agreement.rent - finalRent).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-bold text-base sm:text-lg">
                      Final Amount:
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">
                      ৳{finalRent.toLocaleString()}
                    </span>
                  </div>
                </div>

                {appliedCoupon && (
                  <div className="text-center py-2 sm:py-3">
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                      <span className="mr-2">🎉</span>
                      <span>
                        You saved ৳{(agreement.rent - finalRent).toFixed(2)}!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
