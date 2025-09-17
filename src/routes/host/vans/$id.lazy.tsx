import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Van } from "../../vans/index.lazy";
import Button from "../../../components/ui/Button";
import { Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/host/vans/$id")({
  component: VanDetail,
});

export default function VanDetail() {
  const { id } = Route.useParams();
  const [van, setVan] = useState<Van | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVan(data.vans[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vans:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading || !van) {
    return (
      <div className="w-full flex items-center justify-center text-xl font-bold">
        <div>Loading Van...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Back button */}
        <Link to="..">
          <button className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer">
            ← Back to vans
          </button>
        </Link>

        {/* Main content */}
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Image side */}
          <div className="w-full">
            <img
              src={van.imageUrl}
              alt={van.name}
              className="w-full h-80 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Content side */}
          <div className="space-y-6">
            <div>
              <Button
                variant={van.type as "luxury" | "simple" | "rugged"}
                size="sm"
                clickable={false}
                className="mb-4"
              >
                {van.type}
              </Button>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                {van.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-slate-700">
                  ${van.price}/day
                </span>
              </div>
            </div>

            <div className="flex gap-4 mb-2 font-medium text-lg text-neutral-600 ">
              <Link to="/host/vans/$id/details">
                <span className="hover:text-neutral-900 hover:underline hover:font-bold cursor-pointer">
                  Details
                </span>
              </Link>
              <span className="hover:text-neutral-900 hover:underline hover:font-bold cursor-pointer">
                Pricing
              </span>
              <span className="hover:text-neutral-900 hover:underline hover:font-bold cursor-pointer">
                Photos
              </span>
            </div>

            <div>
              <p className="text-gray-800 text-md font-medium leading-relaxed py-2">
                <span className="text-slate-900 font-bold">Name:</span>{" "}
                {van.name}
              </p>
              <p className="text-gray-800 text-md font-medium leading-relaxed py-2">
                <span className="text-slate-900 font-bold">Category:</span>{" "}
                {van.type}
              </p>

              <p className="text-gray-800 text-md font-medium leading-relaxed py-2">
                <span className="text-slate-900 text-lg font-bold">
                  Description:
                </span>{" "}
                {van.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
