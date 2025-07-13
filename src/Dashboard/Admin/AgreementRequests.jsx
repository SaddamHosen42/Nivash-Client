import React from 'react';
import { MdRequestPage, MdCheck, MdClose } from 'react-icons/md';
import { FaEye, FaCalendarAlt, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const AgreementRequests = () => {
  const handleApprove = (requestId) => {
    Swal.fire({
      title: 'Approve Request?',
      text: 'Are you sure you want to approve this agreement request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Approved!',
          text: 'Agreement request has been approved.',
          icon: 'success',
          confirmButtonColor: '#10b981',
        });
      }
    });
  };

  const handleReject = (requestId) => {
    Swal.fire({
      title: 'Reject Request?',
      text: 'Are you sure you want to reject this agreement request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Rejected!',
          text: 'Agreement request has been rejected.',
          icon: 'success',
          confirmButtonColor: '#ef4444',
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <MdRequestPage className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Agreement Requests
              </h1>
              <p className="text-gray-600 mt-2">
                Review and manage pending apartment agreement requests
              </p>
            </div>
          </div>
        </div>

        {/*all Requests here */}
    
      </motion.div>
    </div>
  );
};

export default AgreementRequests;
