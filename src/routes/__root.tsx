import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import MainLayout from "../layouts/MainLayout";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Button from "../components/ui/Button";

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

  notFoundComponent: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center font-extrabold text-2xl px-5 py-5">
      <p className="font-bold text-4xl mb-4">
        Sorry, the page you were looking for was not found.
      </p>
      <Link to="/">
        <Button variant="luxury" size="lg" className="!w-full sm:!w-80">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
