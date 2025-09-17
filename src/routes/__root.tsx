import { Outlet, createRootRoute } from "@tanstack/react-router";

import MainLayout from "../layouts/MainLayout";

export const Route = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  errorComponent: ({ error }) => (
    <div>Something went wrong: {error.message}</div>
  ),

  notFoundComponent: NotFoundComponent,
});

function NotFoundComponent() {
  return (
    <div className="w-full flex flex-col justify-center items-center font-extrabold text-2xl">
      <h2>Oops..!</h2>
      <p>The Page you're looking for was not found</p>
    </div>
  );
}
