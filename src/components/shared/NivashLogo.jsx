import React from "react";
import logo from "../../assets/Nivash-logo.png";
import { Link } from "react-router";
const NivashLogo = () => {
  return (
    <div className="w-16 h-16">
      <Link to="/">
    <div className="flex items-center">
            <img src={logo} alt="logo" />
        <span className="text-2xl font-bold text-blue-400">Nivash</span>
    </div>

      </Link>
    </div>
  );
};

export default NivashLogo;
