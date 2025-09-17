import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Van } from "../../vans/index.lazy";
import { Link } from "@tanstack/react-router";
import Card from "../../../components/ui/Card";
import "../../../server";

export const Route = createFileRoute("/host/vans/")({
  component: HostVanPage,
});

function HostVanPage() {
  const [hostVans, setHostVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((res) => res.json())
      .then((data) => {
        setHostVans(data.vans);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vans:", error);
        setLoading(false);
      });
  }, []); // Added dependency array

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-64">
        <div className="text-xl font-bold">Loading Vans...</div>
      </div>
    );
  }

  if (!hostVans || hostVans.length === 0) {
    return (
      <div className="w-full flex items-center justify-center min-h-64">
        <div className="text-xl">No vans available</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Vans</h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Add New Van
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {hostVans.map((van) => (
          <Card
            key={van.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <Link to="/host/vans/$id" params={{ id: van.id }}>
              <div className="flex flex-col">
                {/* Image Section */}
                <div className="w-full">
                  <img
                    src={van.imageUrl}
                    alt={van.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {van.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        ${van.price}/day
                      </p>
                    </div>

                    {/* Action buttons */}
                    {/* <div className="flex gap-2 mt-2">
                      <button
                        className="flex-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors border border-blue-200"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle edit action
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 px-3 py-2 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors border border-green-200"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle view details
                        }}
                      >
                        Details
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
