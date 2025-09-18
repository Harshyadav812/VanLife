import { Link } from "@tanstack/react-router";
import { Route as hostRoute } from "../route";

export function HostNav() {
  const links = [
    { to: ".", label: "Dashboard", activeOptions: { exact: true } },
    { to: "income", label: "Income" },
    { to: "vans", label: "Vans", activeOptions: { exact: true } },
    { to: "reviews", label: "Reviews" },
  ];

  return (
    <nav className="flex space-x-6 border-b border-gray-200 pb-2 mb-4">
      {links.map((option) => (
        <Link
          from={hostRoute.fullPath}
          {...option}
          key={option.to}
          className="text-gray-600 hover:text-slate-900 hover:font-bold hover:underline transition-colors"
          activeProps={{
            className: "text-slate-900 font-bold",
          }}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
