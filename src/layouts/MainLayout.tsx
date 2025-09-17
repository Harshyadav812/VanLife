import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import type { JSX } from "react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface MainLayoutProps {
  children: ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col font-family-sans">
      <Header>
        <Header.Title className="font-extrabold">#VANLIFE</Header.Title>
        <Header.Nav>
          <Navbar>
            <Navbar.Item to="/host">Host</Navbar.Item>
            <Navbar.Item to="/about">About</Navbar.Item>
            <Navbar.Item to="/vans">Vans</Navbar.Item>
          </Navbar>
        </Header.Nav>
      </Header>

      <main className="flex-1 flex">{children}</main>

      <Footer>
        <Footer.Section>
          <span>Made by Harsh</span>
        </Footer.Section>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <Footer.Nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/vans">Vans</Link>
          </Footer.Nav>
          <Footer.Legal />
        </div>
      </Footer>
    </div>
  );
}
