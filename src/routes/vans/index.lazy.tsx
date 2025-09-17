import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import "../../server";

export interface Van {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  type: string;
}

export const Route = createLazyFileRoute("/vans/")({
  component: VansPage,
});

function VansPage() {
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => {
        // Handle different response formats
        if (Array.isArray(data)) {
          setVans(data);
        } else if (data.vans && Array.isArray(data.vans)) {
          setVans(data.vans);
        } else if (data.models && Array.isArray(data.models)) {
          setVans(data.models);
        } else {
          console.log("Unexpected data format:", data);
          setVans([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vans:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-64">
        <div className="text-xl font-bold">Loading Vans...</div>
      </div>
    );
  }

  if (!vans || vans.length === 0) {
    return (
      <div className="w-full flex items-center justify-center min-h-64">
        <div className="text-xl">No vans available</div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Explore our Vans
        </h1>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <Link to="/vans">
            <Button variant="simple" size="sm">
              All
            </Button>
          </Link>
          <Link to="/vans/$type" params={{ type: "simple" }}>
            <Button variant="simple" size="sm">
              Simple
            </Button>
          </Link>
          <Link to="/vans/$type" params={{ type: "luxury" }}>
            <Button variant="luxury" size="sm">
              Luxury
            </Button>
          </Link>
          <Link to="/vans/$type" params={{ type: "rugged" }}>
            <Button variant="rugged" size="sm">
              Rugged
            </Button>
          </Link>
        </div>

        {/* Vans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vans.map((van) => (
            <Card
              key={van.id}
              className="hover:shadow-xl transition-shadow duration-300"
            >
              <Link to="/vans/$id" params={{ id: van.id }}>
                <Card.Image src={van.imageUrl} alt={van.name} />
                <Card.Content>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {van.name}
                    </h3>
                    <span className="text-lg font-bold text-green-600">
                      ${van.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {van.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant={van.type as "luxury" | "simple" | "rugged"}
                      size="sm"
                      clickable={false}
                      className="!cursor-default"
                    >
                      {van.type}
                    </Button>
                  </div>
                </Card.Content>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
