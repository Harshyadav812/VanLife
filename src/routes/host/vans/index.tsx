import { createFileRoute, useLoaderData } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
import type { Van } from "../../vans";
import { Link } from "@tanstack/react-router";
import Card from "../../../components/ui/Card";
import "../../../server";

export const Route = createFileRoute("/host/vans/")({
  component: HostVanPage,
});

function HostVanPage() {
  const { hostVans } = useLoaderData({ from: "/host" });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Vans</h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Add New Van
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {hostVans.map((van: Van) => (
          <Card
            key={van.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <Link
              to="/host/vans/$id"
              params={{ id: van.id }}
              onMouseEnter={() => {
                // Preload image on hover
                const img = new Image();
                img.src = van.imageUrl;
              }}
            >
              <div className="flex flex-col">
                {/* Image Section */}
                <div className="w-full">
                  <img
                    src={van.imageUrl}
                    alt={van.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    loading="lazy"
                    height="192"
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
