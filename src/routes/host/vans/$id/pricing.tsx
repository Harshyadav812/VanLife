import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/host/vans/$id/pricing")({
  loader: ({ context }) => context,
  component: VanPricing,
});

function VanPricing() {
  const { van } = useLoaderData({ from: "/host/vans/$id" });
  return (
    <div className="space-y-6">
      {/* Current pricing display */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Current Price
          </h3>
          <span className="text-2xl sm:text-3xl font-bold text-green-600">
            ${van.price}
            <span className="text-green-600 font-medium">/day</span>
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-600">
          This pricing applies per day and includes basic amenities and
          insurance coverage.
        </p>
      </div>

      {/* Pricing breakdown */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">
          What's Included
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h5 className="font-medium text-slate-900">Basic Insurance</h5>
              <p className="text-sm text-slate-600">
                Standard coverage included
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h5 className="font-medium text-slate-900">24/7 Support</h5>
              <p className="text-sm text-slate-600">
                Roadside assistance available
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h5 className="font-medium text-slate-900">Mileage Included</h5>
              <p className="text-sm text-slate-600">200 miles per day</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h5 className="font-medium text-slate-900">Clean Vehicle</h5>
              <p className="text-sm text-slate-600">
                Thoroughly cleaned before rental
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional fees section */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-base sm:text-lg font-medium text-slate-900 mb-3">
          Additional Fees (if applicable)
        </h4>
        <div className="space-y-2 text-sm text-slate-600">
          <p>• Extra mileage: $0.25 per mile</p>
          <p>• Late return: $50 per hour</p>
          <p>• Cleaning fee: $50 (if returned excessively dirty)</p>
        </div>
      </div>
    </div>
  );
}
