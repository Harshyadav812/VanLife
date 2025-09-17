import { Link } from "@tanstack/react-router";

export function HostNav() {
  const links = [
    { to: "/host", label: "Dashboard", activeOptions: { exact: true } },
    { to: "/host/income", label: "Income" },
    { to: "/host/vans", label: "Vans", activeOptions: { exact: true } },
    { to: "/host/reviews", label: "Reviews" },
  ];

  return (
    <nav className="flex space-x-6 border-b border-gray-200 pb-2 mb-4">
      {links.map((option) => (
        <Link
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
