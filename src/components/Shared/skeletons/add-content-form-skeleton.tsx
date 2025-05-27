import { Skeleton, SkeletonShimmer } from "./skeleton"

export function AddContentFormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <SkeletonShimmer className="h-32 w-full bg-gradient-to-r from-red-500 to-purple-600">
        <div className="p-6 text-white">
          <Skeleton className="h-8 w-64 mb-2 bg-white/20" />
          <Skeleton className="h-5 w-80 bg-white/20" />
        </div>
      </SkeletonShimmer>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* Cover Image */}
        <div>
          <Skeleton className="h-5 w-24 mb-3" />
          <div className="flex items-center space-x-4">
            <SkeletonShimmer className="h-24 w-24 rounded-lg" />
            <div>
              <Skeleton className="h-10 w-32 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <Skeleton className="h-5 w-12 mb-3" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Category and Genre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-5 w-20 mb-3" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="h-5 w-16 mb-3" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>

        {/* Director and Release Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-5 w-18 mb-3" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="h-5 w-24 mb-3" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>

        {/* Cast */}
        <div>
          <Skeleton className="h-5 w-12 mb-3" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Streaming Platform */}
        <div>
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Description */}
        <div>
          <Skeleton className="h-5 w-24 mb-3" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <Skeleton className="h-12 w-24 rounded-md" />
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>
      </div>
    </div>
  )
}
