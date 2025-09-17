import { Link } from "@tanstack/react-router";
import type { JSX, ReactNode } from "react";


interface linkProps {
  to: string
  children: ReactNode
}

function Navbar({children}:{children: ReactNode}): JSX.Element{

  return (
    <ul className="flex gap-6 text-nav-text font-semibold text-base hover:text-nav-text-hover ">{children}</ul>
  )
}

function Item({to, children}: linkProps){
  return (
    <li>
      <Link to={to} className= "no-underline hover:underline">{children}</Link>
    </li>
  )
}

Navbar.Item = Item

export default Navbar