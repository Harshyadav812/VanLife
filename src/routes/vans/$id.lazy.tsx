import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Van } from "./index.lazy";
import Button from "../../components/ui/Button";
import { Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/vans/$id")({
  component: VanDetail,
});

export default function VanDetail() {
  const { id } = Route.useParams();
  const [van, setVan] = useState<Van | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVan(data.vans);
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {van.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ${van.price}/day
                </span>
                <Button
                  variant={van.type as "luxury" | "simple" | "rugged"}
                  size="sm"
                  clickable={false}
                >
                  {van.type}
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {van.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-4">
              <Button className="w-full" size="lg" variant="simple">
                Rent this van
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
