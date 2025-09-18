import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/host/vans/$id/pricing")({
  loader: ({ context }) => context,
  component: VanPricing,
});

function VanPricing() {
  const { van } = useLoaderData({ from: "/host/vans/$id" });
  return (
    <div>
      <h3 className="text-xl font-bold">${van.price}/day</h3>
    </div>
  );
}
