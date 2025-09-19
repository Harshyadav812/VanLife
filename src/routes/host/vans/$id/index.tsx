import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/host/vans/$id/")({
  loader: ({ context }) => context,
  component: VanDetails,
});

function VanDetails() {
  const { van } = useLoaderData({ from: "/host/vans/$id" });

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">
              Van Name
            </label>
            <p className="text-base sm:text-lg font-semibold text-slate-900">
              {van.name}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">
              Category
            </label>
            <p className="text-base font-medium text-slate-900 capitalize">
              {van.type}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">
              Status
            </label>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Available
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">
              Visibility
            </label>
            <p className="text-base font-medium text-slate-900">Public</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-100 pt-6">
        <label className="text-sm font-medium text-slate-600 block mb-3">
          Description
        </label>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            {van.description}
          </p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">
          Additional Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="font-medium text-slate-900 mb-2">Location</h5>
            <p className="text-sm text-slate-600">
              Available for pickup at our main location
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h5 className="font-medium text-slate-900 mb-2">Features</h5>
            <p className="text-sm text-slate-600">
              Fully equipped with modern amenities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
