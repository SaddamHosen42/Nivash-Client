import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Apartment = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data = { apartments: [], total: 0 },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["apartments", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartments?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(data.total / limit);

  if (isLoading) return <p className="text-center mt-10">Loading apartments...</p>;
  if (isError) return <p className="text-red-500 text-center mt-10">Error: {error.message}</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">All Apartments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.apartments.map((apt, idx) => (
          <div
            key={idx}
            className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden"
          >
            <figure>
              <img
                src={apt.image}
                alt={`Apartment ${apt.apartmentNo}`}
                className="h-52 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Apartment {apt.apartmentNo}</h2>
              <p>🏢 Floor: {apt.floor}</p>
              <p>📦 Block: {apt.block}</p>
              <p>💰 Rent: ৳{apt.rent}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Agreement</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Apartment;
