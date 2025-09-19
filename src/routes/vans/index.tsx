import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Link, useLoaderData, createFileRoute } from "@tanstack/react-router";
import "../../server";
import { getVans } from "../../api";

export interface Van {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  type: string;
}

export type VanTypeOptions = "luxury" | "rugged" | "simple";

export type VanSearch = {
  type: VanTypeOptions | undefined;
};

export const Route = createFileRoute("/vans/")({
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

  loader: async () => {
    const vans = await getVans();
    return vans;
  },
  staleTime: 10 * 60 * 1000,
  component: VansPage,
  pendingComponent: LoadingComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="w-full flex flex-col justify-center items-center font-extrabold text-2xl px-5 py-5">
      <p className="font-bold text-4xl mb-4">Invalid Van Type</p>
      <p className="text-lg text-gray-600 mb-6 text-center">{error.message}</p>
      <div className="flex gap-4">
        <Link to="/vans" search={{ type: undefined }}>
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
  return (
    <div className="w-full flex flex-col justify-center items-center font-extrabold text-2xl px-5 py-5">
      <p className="font-bold text-4xl mb-4">
        Sorry, the page you were looking for was not found.
      </p>
      <Link to="..">
        <Button variant="luxury" size="lg" className="!w-full sm:!w-80">
          Go Back
        </Button>
      </Link>
    </div>
  );
}

function LoadingComponent() {
  return (
    <div className="w-full flex justify-center items-center font-extrabold text-2xl">
      Loading vans...
    </div>
  );
}

function VansPage() {
  const vans = useLoaderData({ from: "/vans/" });
  const { type } = Route.useSearch();

  const filteredVans = vans.filter((van: Van) =>
    type ? van.type === type : true
  );

  if (!vans || vans.length === 0) {
    return (
      <div className="w-full flex items-center justify-center min-h-64">
        <div className="text-xl">No vans available</div>
      </div>
    );
  }

  if (filteredVans.length === 0 && type) {
    return (
      <div className="w-full flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {type.charAt(0).toUpperCase() + type.slice(1) + " Vans"}
          </h1>
          <div className="text-center">
            <div className="font-bold">No {type} Vans available</div>
            <Link to="/vans" search={{ type: undefined }}>
              <Button variant="simple">View All Vans</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          {type
            ? `${type.charAt(0).toUpperCase() + type.slice(1)} Vans`
            : "Explore our Vans"}
        </h1>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
          <Link
            from={Route.fullPath}
            search={{ type: undefined }}
            activeOptions={{ exact: true }}
            className="bg-[#FFEAD0] px-3 sm:px-4 py-2 rounded-md border-0 font-bold hover:bg-slate-700 hover:text-white text-sm sm:text-base"
            activeProps={{
              className: "bg-slate-700 text-white",
            }}
          >
            All
          </Link>
          <Link
            to="/vans"
            search={{ type: "simple" }}
            activeOptions={{ includeSearch: true }}
            className="bg-[#FFEAD0] px-3 sm:px-4 py-2 rounded-md border-0 font-bold hover:bg-orange-500 hover:text-white text-sm sm:text-base"
            activeProps={{
              className: "bg-orange-500 text-white",
            }}
          >
            Simple
          </Link>
          <Link
            to="/vans"
            search={{ type: "luxury" }}
            activeOptions={{ includeSearch: true }}
            className="bg-[#FFEAD0] px-3 sm:px-4 py-2 rounded-md border-0 font-bold hover:bg-neutral-900 hover:text-white text-sm sm:text-base"
            activeProps={{
              className: "bg-neutral-900 text-white",
            }}
          >
            Luxury
          </Link>
          <Link
            to="/vans"
            search={{ type: "rugged" }}
            activeOptions={{ includeSearch: true }}
            className="bg-[#FFEAD0] px-3 sm:px-4 py-2 rounded-md border-0 font-bold hover:bg-teal-800 hover:text-white text-sm sm:text-base"
            activeProps={{
              className: "bg-teal-800 text-white",
            }}
          >
            Rugged
          </Link>
        </div>

        {/* Vans grid */}
        <div className="grid gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredVans.map((van: Van) => (
            <Card
              key={van.id}
              className="hover:shadow-xl transition-shadow duration-300 w-full min-w-[250px] max-w-[320px]"
            >
              <Link
                to="/vans/$id"
                params={{ id: van.id }}
                search={{ type }}
                preload="intent"
              >
                <Card.Image src={van.imageUrl} alt={van.name} />
                <Card.Content>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate mr-2">
                      {van.name}
                    </h3>
                    <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                      ${van.price}
                      <span className="text-green-600 m-0 font-medium">
                        /day
                      </span>
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
