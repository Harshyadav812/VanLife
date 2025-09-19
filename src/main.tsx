import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter, Link } from "@tanstack/react-router";
import "./index.css";
import Button from "./components/ui/Button";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => {
    return (
      <div className="w-full flex flex-col justify-center items-center font-extrabold text-2xl px-5 py-5">
        <p className="font-bold text-4xl mb-4">
          Sorry, the page you were looking for was not found.
        </p>
        <Link to="..">
          <Button variant="simple" size="lg" className="!w-full sm:!w-80">
            Go Back
          </Button>
        </Link>
      </div>
    );
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
