import { Skeleton } from "./skeleton"

export function UserTableSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <Skeleton className="h-6 w-16" />
      </div>

      {/* Table Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-6 gap-4 px-6 py-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 px-6 py-4 items-center">
            {/* Number */}
            <Skeleton className="h-4 w-4" />

            {/* Name with Avatar */}
            <div className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Role */}
            <Skeleton className="h-6 w-16 rounded-full" />

            {/* Status */}
            <Skeleton className="h-6 w-16 rounded-full" />

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
