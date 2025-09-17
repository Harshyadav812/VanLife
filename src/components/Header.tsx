import type { JSX, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export default function Header({
  children,
  ...rest
}: HeaderProps): JSX.Element {
  return (
    <header
      className={`flex items-center justify-between px-6 py-4 bg-primary h-24 ${rest?.className || ""}`}
    >
      {children}
    </header>
  );
}

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center">
      <Link to="/">
        <img src={src} alt={alt} className="h-8 w-8 mr-2" />
      </Link>
    </div>
  );
}

function Title({
  children,
  ...rest
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`text-3xl font-bold text-slate-800 ${rest?.className || ""}`}
    >
      <Link to="/">{children}</Link>
    </h1>
  );
}

function Nav({ children }: { children: ReactNode }) {
  return <nav className="flex gap-4">{children}</nav>;
}

Header.Logo = Logo;
Header.Title = Title;
Header.Nav = Nav;
