import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/host/reviews")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/host/reviews"!</div>;
}
