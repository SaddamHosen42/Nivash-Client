import React, { useState } from 'react';
import { TfiAnnouncement } from 'react-icons/tfi';
import { FaPaperPlane, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion'; 
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PageTitle from '../../components/shared/PageTitle';

const MakeAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all announcements
  const {
    data: announcements = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  // Mutation for creating announcement
  const createAnnouncementMutation = useMutation({
    mutationFn: async (announcementData) => {
      const res = await axiosSecure.post('/announcements', announcementData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      Swal.fire({
        title: 'Success!',
        text: 'Announcement has been posted successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
      });
      // Reset form
      setTitle('');
      setDescription('');
      setShowForm(false); // Hide form after successful submission
    },
    onError: (error) => {
      console.error('Error creating announcement:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to post announcement. Please try again.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !description) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
      });
      return;
    }

    const announcementData = {
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      author: {
        name: user?.displayName || 'Admin',
        email: user?.email,
      },
    };

    createAnnouncementMutation.mutate(announcementData);
  };

  // Mutation for deleting announcement
  const deleteAnnouncementMutation = useMutation({
    mutationFn: async (announcementId) => {
      const res = await axiosSecure.delete(`/announcements/${announcementId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      Swal.fire({
        title: 'Deleted!',
        text: 'Announcement has been deleted successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
      });
    },
    onError: (error) => {
      console.error('Error deleting announcement:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete announcement. Please try again.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
      });
    },
  });

  const handleDelete = (announcementId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAnnouncementMutation.mutate(announcementId);
      }
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <PageTitle title="Make Announcement" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <TfiAnnouncement className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Make Announcement
                </h1>
                <p className="text-gray-600 mt-2">
                  Create and share important announcements with all building members
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaPaperPlane className="text-sm" />
              <span>{showForm ? 'Cancel' : 'Create New Announcement'}</span>
            </button>
          </div>
        </div>

        {/* Announcement Form - Conditional */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Announcement</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Announcement Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter announcement title..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter announcement description..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createAnnouncementMutation.isPending}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {createAnnouncementMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      <span>Post Announcement</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Recent Announcements */}
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Announcements</h2>
            <p className="text-gray-600 text-sm mt-1">
              {announcements.length} announcement(s) published
            </p>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-3 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-12 text-red-600">
                <p>Error loading announcements. Please try again.</p>
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <TfiAnnouncement className="mx-auto text-4xl mb-4 opacity-50" />
                <p>No announcements found. Create your first announcement!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {announcement.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {announcement.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            Posted on: {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          {announcement.author && (
                            <span>
                              By: {announcement.author.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(announcement._id)}
                          disabled={deleteAnnouncementMutation.isPending}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MakeAnnouncement;
