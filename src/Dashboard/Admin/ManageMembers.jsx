import React from "react";
import { FaUsers, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users with member role
  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users");
        // Filter members on frontend if backend doesn't support role query
        const allUsers = res.data;
        const memberUsers = allUsers.filter((user) => user.role === "member");
        console.log("All users:", allUsers);
        console.log("Member users:", memberUsers);
        return memberUsers;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
  });

  // Mutation for removing member status (changing role to user)
  const removeMemberMutation = useMutation({
    mutationFn: async (userEmail) => {
      try {
        console.log("Attempting to remove member:", userEmail);
        const res = await axiosSecure.patch(`/users/role/${userEmail}`, {
          role: "user",
        });
        console.log("Remove member response:", res.data);
        return res.data;
      } catch (error) {
        console.error("Error in removeMemberMutation:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Member removal successful:", data);
      queryClient.invalidateQueries(["members"]);
      Swal.fire({
        title: "Success!",
        text: "Member status removed successfully!",
        icon: "success",
        confirmButtonColor: "#10b981",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "rounded-lg",
        },
      });
    },
    onError: (error) => {
      console.error("Error removing member:", error);
      console.error("Error details:", error.response?.data);
      Swal.fire({
        title: "Error!",
        text: `Failed to remove member status: ${
          error.response?.data?.message || error.message
        }`,
        icon: "error",
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "rounded-lg",
        },
      });
    },
  });

  const handleRemoveMember = (userEmail, userName) => {
    console.log("handleRemoveMember called with:", { userEmail, userName });

    Swal.fire({
      title: "Remove Member?",
      html: `
        <p>Are you sure you want to remove <strong>${userName}</strong> from member status?</p>
        <p class="text-sm text-gray-600 mt-2">They will lose access to member dashboard and become a regular user.</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Remove Member!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Confirm button clicked for:", userEmail);
        removeMemberMutation.mutate(userEmail);
      } else {
        console.log("Cancel button clicked");
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
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <FaUsers className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manage Members
              </h1>
              <p className="text-gray-600 mt-2">
                View and manage all building members and their information
              </p>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Member List</h2>
            <p className="text-gray-600 text-sm mt-1">
              {members.length} member(s) currently active
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-600">
              <p>Error loading members. Please try again.</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaUsers className="mx-auto text-4xl mb-4 opacity-50" />
              <p>No members found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member, index) => (
                    <motion.tr
                      key={member._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={
                                member.photo ||
                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                              }
                              alt={member.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            handleRemoveMember(member.email, member.name)
                          }
                          disabled={removeMemberMutation.isPending}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <FaTrash className="w-4 h-4 mr-2" />
                          {removeMemberMutation.isPending
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </td>
                    </motion.tr>
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

export default ManageMembers;
