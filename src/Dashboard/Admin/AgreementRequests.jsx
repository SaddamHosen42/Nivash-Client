import React from "react";
import { MdRequestPage, MdCheck, MdClose } from "react-icons/md";
import { FaEye, FaCalendarAlt, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: agreements = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements");
      return res.data;
    },
  });
  // Mutation for updating status and user role
  const updateStatus = async ({ id, status, userEmail, action }) => {
    // Update agreement status with accept date
    const updateData = { 
      status,
      acceptDate: new Date().toISOString() // Add current date when admin takes action
    };
    
    await axiosSecure.patch(`/agreements/status/${id}`, updateData);
    
    // If approved, update user role to member
    if (action === "approve") {
      await axiosSecure.patch(`/users/role/${userEmail}`, { role: "member" });
    }
  };

  const mutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["agreements"]);
      
      // Show success message based on action
      if (variables.action === "approve") {
        Swal.fire({
          title: "Approved!",
          text: "Agreement request has been approved and user role updated to member.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
      } else {
        Swal.fire({
          title: "Rejected!",
          text: "Agreement request has been rejected.",
          icon: "success",
          confirmButtonColor: "#ef4444",
        });
      }
    },
    onError: (error) => {
      console.error("Error updating agreement:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update agreement status. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    },
  });
  const handleApprove = (agreement) => {
    Swal.fire({
      title: "Approve Request?",
      text: "Are you sure you want to approve this agreement request? The user will become a member.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ 
          id: agreement._id, 
          status: "checked",
          userEmail: agreement.userEmail,
          action: "approve"
        });
      }
    });
  };

  const handleReject = (agreement) => {
    Swal.fire({
      title: "Reject Request?",
      text: "Are you sure you want to reject this agreement request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ 
          id: agreement._id, 
          status: "checked",
          userEmail: agreement.userEmail,
          action: "reject"
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
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Pending Agreement Requests</h2>
            <p className="text-gray-600 text-sm mt-1">
              {agreements.filter(a => a.status === 'pending').length} pending requests
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-600">
              <p>Error loading agreements. Please try again.</p>
            </div>
          ) : agreements.filter(a => a.status === 'pending').length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MdRequestPage className="mx-auto text-4xl mb-4 opacity-50" />
              <p>No pending agreement requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-center">
                <thead className="bg-gray-100 text-sm">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">User Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Floor</th>
                    <th className="px-6 py-4">Block</th>
                    <th className="px-6 py-4">Room</th>
                    <th className="px-6 py-4">Rent (৳)</th>
                    <th className="px-6 py-4">Request Date</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agreements
                    .filter(a => a.status === 'pending')
                    .map((a, index) => (
                    <tr key={a._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium">{a.userName}</td>
                      <td className="px-6 py-4 text-blue-600">{a.userEmail}</td>
                      <td className="px-6 py-4">{a.floor}</td>
                      <td className="px-6 py-4 font-semibold">{a.block}</td>
                      <td className="px-6 py-4">{a.apartmentNo}</td>
                      <td className="px-6 py-4 font-semibold text-green-600">৳{a.rent}</td>
                      <td className="px-6 py-4">{new Date(a.requestDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApprove(a)}
                            disabled={mutation.isPending}
                            className="btn btn-sm bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
                          >
                            <MdCheck className="text-sm" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(a)}
                            disabled={mutation.isPending}
                            className="btn btn-sm bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
                          >
                            <MdClose className="text-sm" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AgreementRequests;
