import React from "react";
import { motion } from "framer-motion";//eslint-disable-line

const CouponsCard = ({ coupon, index }) => {
  return (
    <motion.div
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
  );
};

export default CouponsCard;
