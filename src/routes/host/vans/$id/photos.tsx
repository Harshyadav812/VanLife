import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/host/vans/$id/photos")({
  component: VanPhotos,
});

function VanPhotos() {
  const { van } = useLoaderData({ from: "/host/vans/$id" });
  return (
    <div>
      <img
        className="w-40 h-40 rounded-md"
        src={van.imageUrl}
        alt={van.name}
        loading="lazy"
        width="160"
        height="160"
      />
    </div>
  );
}
