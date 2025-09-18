import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/host/vans/$id/")({
  loader: ({ context }) => context,
  component: VanDetails,
});

function VanDetails() {
  const { van } = useLoaderData({ from: "/host/vans/$id" });

  return (
    <div className="space-y-3">
      <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed">
        <span className="text-slate-900 font-bold">Name: </span>
        {van.name}
      </p>
      <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed">
        <span className="text-slate-900 font-bold">Category: </span>
        {van.type}
      </p>
      <div className="pt-2">
        <p className="text-slate-900 text-base md:text-lg font-bold mb-2">
          Description:
        </p>
        <p className="text-gray-800 text-sm md:text-base leading-relaxed">
          {van.description}
        </p>
      </div>
      <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed pt-2">
        <span className="text-slate-900 font-bold">Visibility: </span> Public
      </p>
    </div>
  );
}
