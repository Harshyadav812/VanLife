import { createFileRoute } from "@tanstack/react-router";
import Button from "../components/ui/Button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="p-4 grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
        <img
          src="/src/assets/about-section.png"
          alt=""
          className="w-full h-60 object-cover rounded-lg md:order-2"
        />

        <div className="flex flex-col gap-4 md:order-1">
          <h1 className="text-3xl font-bold">
            Don't squeeze in a sedan when you could relax in a van.
          </h1>

          <p className="font-medium text-nav-text-hover text-lg/7">
            Our mission is to enliven your road trip with the perfect travel van
            rental. Our vans are recertified before each trip to ensure your
            travel plans can go off without a hitch. (Hitch costs extra 😉) Our
            team is full of vanlife enthusiasts who know firsthand the magic of
            touring the world on 4 wheels.
          </p>
        </div>

        <div className="md:col-span-1 py-8 px-8 bg-[#FFCC8D] rounded-md text-left md:order-3">
          <p className="text-2xl font-bold">Your destination is waiting.</p>
          <p className="text-2xl font-bold">Your van is ready.</p>
          <Link to="/vans" search={{ type: undefined }}>
            <Button size="md" variant="luxury">
              Explore our Vans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
