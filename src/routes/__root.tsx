import { Outlet, createRootRoute } from "@tanstack/react-router";
import MainLayout from "../layouts/MainLayout";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </MainLayout>
  ),
  errorComponent: ({ error }) => (
    <div>Something went wrong: {error.message}</div>
  ),
});
