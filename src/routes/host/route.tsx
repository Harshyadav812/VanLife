import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HostNav } from "./-components/HostNav";

export const Route = createFileRoute("/host")({
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
