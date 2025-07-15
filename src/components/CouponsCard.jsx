import React from "react";
import { motion } from "framer-motion"; //eslint-disable-line
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiCoupon3Fill } from "react-icons/ri";

const CouponsCard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch available coupons
  const { data: availableCoupons = [], isLoading: couponsLoading } = useQuery({
    queryKey: ["availableCoupons"],
    queryFn: async () => {
      const response = await axiosSecure.get("/coupons");
      return response.data.filter((coupon) => coupon.isAvailable).slice(0, 3);
    },
  });

  if (couponsLoading) {
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-20 bg-gray-200 rounded-xl"></div>
        </div>
      ))}
    </div>;
  }
  if (availableCoupons.length === 0) {
    <div className="text-center py-8 text-gray-500">
      <RiCoupon3Fill className="mx-auto text-4xl mb-4 opacity-50" />
      <p>No coupons available at the moment</p>
    </div>;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <RiCoupon3Fill className="mr-3 text-pink-600" />
          Available Coupons
        </h3>
        <div className="text-center">
          <button
            onClick={() => {
              // Navigate to home page with hash
              window.location.href = "/#coupons";
            }}
            className="text-pink-600 hover:text-pink-800 text-sm font-medium cursor-pointer"
          >
            View All Coupons
          </button>
        </div>
      </div>
      {/* Coupons List */}
      {availableCoupons.map((coupon, index) => (
        <motion.div
          key={coupon._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 border-2 border-dashed border-pink-300 rounded-lg bg-pink-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-pink-800">{coupon.code}</h4>
              <p className="text-sm text-pink-600">{coupon.description}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-pink-700">
                {coupon.discount}% OFF
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CouponsCard;
