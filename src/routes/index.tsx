import { createFileRoute } from "@tanstack/react-router";
import Button from "../components/ui/Button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full flex-1 bg-center bg-cover bg-no-repeat flex items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.46),_rgba(0,0,0,0.46)),url('/src/assets/bg-image.png')]">
      <div className="text-white text-center max-w-2xl mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          You got the travel plans, we got the travel vans.
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-100 max-w-xl mx-auto">
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <Link to="/vans" className="inline-block">
          <Button
            size="lg"
            variant="simple"
            className="px-12 py-4 text-lg font-bold hover:transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Find your Van
          </Button>
        </Link>
      </div>
    </div>
  );
}
