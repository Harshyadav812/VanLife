import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
  useLoaderData,
} from "@tanstack/react-router";
import type { Van } from "../../../vans";
import Button from "../../../../components/ui/Button";

// layout route
export const Route = createFileRoute("/host/vans/$id")({
  loader: async ({ params }) => {
    const res = await fetch(`/api/host/vans/${params.id}`);
    const data = await res.json();
    return {
      van: data.vans[0] as Van,
    };
  },
  component: VanDetailLayout,
});

function VanDetailLayout() {
  const { id } = useParams({ from: "/host/vans/$id" });
  const { van } = useLoaderData({ from: `/host/vans/$id` });

  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <Link to="/host/vans">
          <button className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer">
            ← Back to all vans
          </button>
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex items-start gap-4 md:gap-6 mb-4 md:mb-6">
            <img
              src={van.imageUrl}
              alt={van.name}
              className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-md"
              loading="lazy"
              width="96"
              height="96"
            />

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Button
                  variant={van.type as "luxury" | "simple" | "rugged"}
                  size="sm"
                  clickable={false}
                  className="!cursor-default"
                >
                  {van.type}
                </Button>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
                {van.name}
              </h1>
              <p className="text-base md:text-lg font-semibold text-slate-700">
                ${van.price}
                <span className="font-normal text-slate-500">/day</span>
              </p>
            </div>
          </div>

          <nav className="flex gap-6 mb-4 md:mb-6 text-neutral-600">
            <Link
              to="."
              from={Route.fullPath}
              params={{ id }}
              className="hover:text-neutral-900 hover:underline hover:font-bold cursor-pointer"
              activeProps={{
                className: "text-neutral-900 font-bold underline",
              }}
              activeOptions={{ exact: true }}
            >
              Details
            </Link>
            <Link
              to="pricing"
              from={Route.fullPath}
              params={{ id }}
              className="hover:text-neutral-900 hover:underline hover:font-bold cursor-pointer"
              activeProps={{
                className: "text-neutral-900 font-bold underline",
              }}
            >
              Pricing
            </Link>
            <Link
              to="photos"
              from={Route.fullPath}
              params={{ id }}
              onMouseEnter={() => {
                // Preload image on hover
                const img = new Image();
                img.src = van.imageUrl;
              }}
              className="hover:text-neutral-900 hover:underline hover:font-bold cursor-pointer"
              activeProps={{
                className: "text-neutral-900 font-bold underline",
              }}
            >
              Photos
            </Link>
          </nav>

          <div className="pt-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
