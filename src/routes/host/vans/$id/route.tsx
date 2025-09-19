import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
  useLoaderData,
  notFound,
} from "@tanstack/react-router";
import type { Van } from "../../../vans";
import Button from "../../../../components/ui/Button";

// layout route
export const Route = createFileRoute("/host/vans/$id")({
  loader: async ({ params }) => {
    const res = await fetch(`/api/host/vans/${params.id}`);

    if (!res) throw new Error("Network Error");
    if (!res.ok) throw notFound();

    const data = await res.json();

    if (!data || !data.vans) throw notFound({ data: params.id });

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
    <div className="w-full flex-1 overflow-y-auto bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto">
        <Link to="/host/vans">
          <button className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer text-sm sm:text-base">
            ← Back to all vans
          </button>
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 max-w-3xl mx-auto">
          {/* Header: Image + Info */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-4 sm:gap-6 mb-4 sm:mb-6 items-start">
            <img
              src={van.imageUrl}
              alt={van.name}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md"
              loading="lazy"
              width="128"
              height="128"
            />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                <Button
                  variant={van.type as "luxury" | "simple" | "rugged"}
                  size="sm"
                  clickable={false}
                  className="!cursor-default"
                >
                  {van.type}
                </Button>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900">
                {van.name}
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-700">
                ${van.price}
                <span className="font-normal text-slate-500">/day</span>
              </p>
            </div>
          </div>

          {/* Tabs/Nav */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 mb-3 sm:mb-6 text-neutral-600 border-b border-gray-100">
            <Link
              to="."
              from={Route.fullPath}
              params={{ id }}
              className="px-1.5 sm:px-2 pb-2 -mb-px border-b-2 border-transparent hover:text-neutral-900 hover:border-neutral-300 cursor-pointer text-sm sm:text-base"
              activeProps={{
                className: "text-neutral-900 border-neutral-800 font-semibold",
              }}
              activeOptions={{ exact: true }}
            >
              Details
            </Link>
            <Link
              to="pricing"
              from={Route.fullPath}
              params={{ id }}
              className="px-1.5 sm:px-2 pb-2 -mb-px border-b-2 border-transparent hover:text-neutral-900 hover:border-neutral-300 cursor-pointer text-sm sm:text-base"
              activeProps={{
                className: "text-neutral-900 border-neutral-800 font-semibold",
              }}
            >
              Pricing
            </Link>
            <Link
              to="photos"
              from={Route.fullPath}
              params={{ id }}
              className="px-1.5 sm:px-2 pb-2 -mb-px border-b-2 border-transparent hover:text-neutral-900 hover:border-neutral-300 cursor-pointer text-sm sm:text-base"
              activeProps={{
                className: "text-neutral-900 border-neutral-800 font-semibold",
              }}
            >
              Photos
            </Link>
          </nav>

          <div className="pt-2 sm:pt-3 min-h-[320px] sm:min-h-[360px] md:min-h-[400px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
