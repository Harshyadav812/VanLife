import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/host/vans/$id/photos")({
  component: VanPhotos,
});

function VanPhotos() {
  const { van } = useLoaderData({ from: "/host/vans/$id" });
  return (
    <div className="space-y-6">
      {/* Main photo display */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <img
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-md shadow-sm"
          src={van.imageUrl}
          alt={van.name}
          loading="lazy"
          width="192"
          height="192"
        />
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
            Cover Photo
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            This is the main photo that appears in the van listings and helps
            customers identify your van.
          </p>
        </div>
      </div>

      {/* Additional photo management info */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-base sm:text-lg font-medium text-slate-900 mb-3">
          Photo Management
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-slate-900 mb-2">
              Upload New Photos
            </h5>
            <p className="text-sm text-slate-600">
              Add more photos to showcase different angles and features of your
              van.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-slate-900 mb-2">
              Photo Guidelines
            </h5>
            <p className="text-sm text-slate-600">
              Use high-quality, well-lit photos that clearly show your van's
              condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
