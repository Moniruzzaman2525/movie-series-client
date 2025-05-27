import { Skeleton, SkeletonShimmer } from "./skeleton"

export function AnalyticsSkeleton() {
  return (
    <div className="p-6 bg-[#0a1628] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Sales Card */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
          <Skeleton className="h-12 w-8 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Total Profit Card */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
          <Skeleton className="h-12 w-12 mb-2" />
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Product Mix Card */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-24" />
            <div className="flex space-x-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div>
              <Skeleton className="h-12 w-8 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="h-12 w-8 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales by Product Type Chart */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            <SkeletonShimmer className="h-64 w-full rounded" />
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Sales Distribution Chart */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
          <Skeleton className="h-6 w-36 mb-6" />
          <div className="space-y-4">
            <SkeletonShimmer className="h-64 w-full rounded" />
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded" />
                <div>
                  <Skeleton className="h-4 w-28 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
