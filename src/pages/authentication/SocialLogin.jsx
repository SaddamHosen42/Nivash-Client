import React from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { logInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    logInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        //save user data to database here

        navigate(location.state || "/");
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: `Welcome, ${user.displayName}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.message,
        });
      });
  };
  return (
    <div className="w-full space-y-4">
      <motion.button
        onClick={handleGoogleSignIn}
        className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          aria-label="Google logo"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        <span className="text-lg">Continue with Google</span>
      </motion.button>
    </div>
  );
};

export default SocialLogin;
