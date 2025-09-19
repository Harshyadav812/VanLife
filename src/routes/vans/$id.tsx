import {
  useLoaderData,
  createFileRoute,
  notFound,
  retainSearchParams,
} from "@tanstack/react-router";
import Button from "../../components/ui/Button";
import { Link } from "@tanstack/react-router";
import type { VanSearch, VanTypeOptions } from ".";

export const Route = createFileRoute("/vans/$id")({
  loader: async ({ params }) => {
    const res = await fetch(`/api/vans/${params.id}`);

    if (!res) throw new Error("Network error");
    if (!res.ok) throw notFound();

    const data = await res.json();

    if (!data) throw notFound({ data: params.id });

    return data.vans;
  },

  validateSearch: (search: Record<string, unknown>): VanSearch => {
    const validTypes: VanTypeOptions[] = ["luxury", "rugged", "simple"];
    if (search.type) {
      const type = search.type as string;
      if (!validTypes.includes(type as VanTypeOptions)) {
        throw new Error(`Invalid van type: ${type}`);
      }
      return { type: type as VanTypeOptions };
    }
    return {
      type: undefined,
    };
  },

  search: {
    middlewares: [retainSearchParams(["type"])],
  },
  component: VanDetail,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
});

function ErrorComponent() {
  return (
    <div className="w-full flex flex-col justify-center items-center font-extrabold text-2xl px-5 py-5">
      <p className="font-bold text-4xl mb-4">Van Not Found</p>
      <p className="text-lg text-gray-600 mb-6">
        The van you're looking for doesn't exist or has been removed.
      </p>
      <div className="flex gap-4">
        <Link to="..">
          <Button variant="simple" size="lg">
            Browse All Vans
          </Button>
        </Link>
        <Link to="/">
          <Button variant="luxury" size="lg">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  const { id } = Route.useParams();
  return (
    <div className="w-full flex flex-col justify-center items-center font-extrabold text-2xl px-5 py-5">
      <p className="font-bold text-4xl mb-4">
        Van with <span className="text-red-500">id: {id}</span> doesn't exist or
        has been removed.
      </p>
      <Link to="..">
        <Button variant="simple" size="lg">
          Return to Vans
        </Button>
      </Link>
    </div>
  );
}

function VanDetail() {
  const type = Route.useSearch();
  const van = useLoaderData({ from: "/vans/$id" });

  if (!van) {
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
        <Link to=".." search={type}>
          <button className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer">
            ← Back to {type.type || "all"} vans
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
              loading="lazy"
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
