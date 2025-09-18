import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HostNav } from "./-components/HostNav";
import type { Van } from "../vans/index.lazy";

export const Route = createFileRoute("/host")({
  loader: async () => {
    const res = await fetch(`/api/host/vans`);
    const data = await res.json();
    return { hostVans: data.vans as Van[] };
  },
  component: HostLayout,
});

function HostLayout() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <HostNav />
      <Outlet />
    </div>
  );
}
