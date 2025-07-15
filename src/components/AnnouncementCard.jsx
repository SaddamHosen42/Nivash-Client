import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaBell, FaCalendarAlt } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdAnnouncement } from "react-icons/md";
import { Link } from "react-router";

const AnnouncementCard = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch recent announcements
  const { data: announcements = [], isLoading: announcementsLoading } =
    useQuery({
      queryKey: ["recentAnnouncements"],
      queryFn: async () => {
        const response = await axiosSecure.get("/announcements");
        return response.data.slice(0, 3); // Limit to 3 announcements
      },
    });
  if (announcementsLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  if (announcements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MdAnnouncement className="mx-auto text-4xl mb-4 opacity-50" />
        <p>No announcements available</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <FaBell className="mr-3 text-blue-600" />
          Recent Announcements
        </h3>
        <Link
          to="/dashboard/announcements"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All
        </Link>
      </div>
      {announcements.map((announcement) => (
        <div
          key={announcement._id}
          className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <h4 className="font-semibold text-gray-800 mb-2">
            {announcement.title}
          </h4>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {announcement.description}
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <FaCalendarAlt className="mr-1" />
            {new Date(announcement.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementCard;
